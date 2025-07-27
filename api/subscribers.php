import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'subscribers.json');

// ודא שהתיקייה קיימת
async function ensureDataDir() {
    const dataDir = path.dirname(dataFilePath);
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
}

// טען מנויים
async function loadSubscribers() {
    try {
        await ensureDataDir();
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // אם הקובץ לא קיים, החזר מערך ריק
        return [];
    }
}

// שמור מנויים
async function saveSubscribers(subscribers) {
    try {
        await ensureDataDir();
        await fs.writeFile(dataFilePath, JSON.stringify(subscribers, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('שגיאה בשמירת מנויים:', error);
        return false;
    }
}

// API Handler
export default async function handler(req, res) {
    // הגדרת CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        if (req.method === 'GET') {
            // קבלת כל המנויים
            const subscribers = await loadSubscribers();
            res.status(200).json({
                success: true,
                subscribers: subscribers,
                count: subscribers.length
            });

        } else if (req.method === 'POST') {
            const subscribers = await loadSubscribers();

            if (req.body.subscribers) {
                // שמירת כל המנויים (מפאנל ניהול)
                const success = await saveSubscribers(req.body.subscribers);
                res.status(200).json({
                    success: success,
                    message: success ? 'כל המנויים נשמרו' : 'שגיאה בשמירה'
                });

            } else if (req.body.subscriber) {
                // הוספת מנוי חדש (מהאתר)
                const newSubscriber = req.body.subscriber;
                
                // הוספת נתונים אוטומטיים
                newSubscriber.id = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                newSubscriber.registrationDate = new Date().toISOString();
                newSubscriber.active = true;
                newSubscriber.source = 'website';

                // בדיקה שהמספר לא קיים
                const phoneExists = subscribers.some(sub => sub.phone === newSubscriber.phone);

                if (!phoneExists) {
                    subscribers.push(newSubscriber);
                    const success = await saveSubscribers(subscribers);
                    
                    res.status(200).json({
                        success: success,
                        message: success ? 'נרשמת בהצלחה להתראות!' : 'שגיאה בהרשמה'
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'מספר הטלפון כבר רשום במערכת'
                    });
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'נתונים לא תקינים'
                });
            }

        } else if (req.method === 'DELETE') {
            // הסרת מנוי
            const { phone } = req.body;
            if (phone) {
                const subscribers = await loadSubscribers();
                const beforeCount = subscribers.length;
                
                const filteredSubscribers = subscribers.filter(sub => sub.phone !== phone);
                const afterCount = filteredSubscribers.length;
                
                const success = await saveSubscribers(filteredSubscribers);
                
                res.status(200).json({
                    success: success && (beforeCount > afterCount),
                    message: success ? 'מנוי הוסר בהצלחה' : 'שגיאה בהסרת מנוי'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'מספר טלפון נדרש'
                });
            }

        } else {
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).json({
                success: false,
                error: 'Method not allowed'
            });
        }

    } catch (error) {
        console.error('שגיאה ב-API:', error);
        res.status(500).json({
            success: false,
            error: 'שגיאה בשרת'
        });
    }
}
