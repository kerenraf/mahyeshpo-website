<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$dataFile = '../data/subscribers.json';

function loadSubscribers() {
    global $dataFile;
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        $data = json_decode($content, true);
        return $data ?: [];
    }
    return [];
}

function saveSubscribers($subscribers) {
    global $dataFile;
    
    // וידוא שהתיקייה קיימת
    $dir = dirname($dataFile);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    
    $json = json_encode($subscribers, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return file_put_contents($dataFile, $json) !== false;
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // קבלת כל המנויים
        echo json_encode([
            'success' => true,
            'subscribers' => loadSubscribers(),
            'count' => count(loadSubscribers())
        ]);
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (isset($input['subscribers'])) {
            // שמירת כל המנויים (מפאנל ניהול)
            $success = saveSubscribers($input['subscribers']);
            echo json_encode([
                'success' => $success,
                'message' => $success ? 'כל המנויים נשמרו' : 'שגיאה בשמירה'
            ]);
            
        } elseif (isset($input['subscriber'])) {
            // הוספת מנוי חדש (מהאתר)
            $subscribers = loadSubscribers();
            $newSubscriber = $input['subscriber'];
            
            // הוספת נתונים אוטומטיים
            $newSubscriber['id'] = time() . '_' . rand(1000, 9999);
            $newSubscriber['registrationDate'] = date('c');
            $newSubscriber['active'] = true;
            $newSubscriber['source'] = 'website';
            
            // בדיקה שהמספר לא קיים
            $phoneExists = false;
            foreach ($subscribers as $sub) {
                if ($sub['phone'] === $newSubscriber['phone']) {
                    $phoneExists = true;
                    break;
                }
            }
            
            if (!$phoneExists) {
                $subscribers[] = $newSubscriber;
                $success = saveSubscribers($subscribers);
                echo json_encode([
                    'success' => $success,
                    'message' => $success ? 'נרשמת בהצלחה להתראות!' : 'שגיאה בהרשמה'
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'מספר הטלפון כבר רשום במערכת'
                ]);
            }
        }
        break;
        
    case 'DELETE':
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['phone'])) {
            $subscribers = loadSubscribers();
            $beforeCount = count($subscribers);
            
            $subscribers = array_filter($subscribers, function($sub) use ($input) {
                return $sub['phone'] !== $input['phone'];
            });
            
            $afterCount = count($subscribers);
            $success = saveSubscribers(array_values($subscribers));
            
            echo json_encode([
                'success' => $success && ($beforeCount > $afterCount),
                'message' => $success ? 'מנוי הוסר בהצלחה' : 'שגיאה בהסרת מנוי'
            ]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
?>
