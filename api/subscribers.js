// API for WhatsApp subscribers - Updated
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

// טען מנויים מהקובץ
async function loadSubscribers() {
    try {
        await ensureDataDir();
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log('📁 יוצר קובץ מנויים חדש...');
        // אם הקובץ לא קיים, יצור מערך ריק
        await saveSubscribers([]);
        return [];
    }
}

// שמור מנויים לקובץ
async function saveSubscribers(subscribers) {
    try {
        await ensureDataDir();
        await fs.writeFile(dataFilePath, JSON.stringify(subscribers, null, 2), 'utf8');
        console.log(`💾 נשמרו ${subscribers.length} מנויים לקובץ JSON`);
        return true;
    } catch (error) {
        console.error('❌ שגיאה בשמירת מנויים:', error);
        return false;
    }
}

// ולידציה של נתוני מנוי
function validateSubscriber(subscriber) {
    const errors = [];
    
    if (!subscriber.name || subscriber.name.trim().length < 2) {
        errors.push('שם חייב להכיל לפחות 2 תווים');
    }
    
    if (!subscriber.phone || !/^(\+972|0)[0-9]{8,9}$/.test(subscriber.phone.replace(/[-\s]/g, ''))) {
        errors.push('מספר טלפון לא תקין');
    }
    
    if (!subscriber.categories || !Array.isArray(subscriber.categories) || subscriber.categories.length === 0) {
        errors.push('חובה לבחור לפחות קטגוריה אחת');
    }
    
    if (!subscriber.areas || !Array.isArray(subscriber.areas) || subscriber.areas.length === 0) {
        errors.push('חובה לבחור לפחות אזור אחד');
    }
    
    return errors;
}

// ניקוי מספר טלפון
function cleanPhoneNumber(phone) {
    // הסרת רווחים ותווים מיוחדים
    let cleaned = phone.replace(/[^\d+]/g, '');
    
    // אם מתחיל ב-0, החלף ל-+972
    if (cleaned.startsWith('0')) {
        cleaned = '+972' + cleaned.substring(1);
    }
    
    // אם לא מתחיל ב-+, הוסף +972
    if (!cleaned.startsWith('+')) {
        cleaned = '+972' + cleaned;
    }
    
    return cleaned;
}

// פונקציה ראשית של API
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
        console.log(`📥 ${req.method} בקשה ל-API מנויים`);

        if (req.method === 'GET') {
            // קבלת כל המנויים
            const subscribers = await loadSubscribers();
            res.status(200).json({
                success: true,
                subscribers: subscribers,
                count: subscribers.length,
                timestamp: new Date().toISOString()
            });

        } else if (req.method === 'POST') {
            const subscribers = await loadSubscribers();

            if (req.body.subscribers) {
                // שמירת כל המנויים (מפאנל ניהול)
                console.log('📊 מעדכן את כל רשימת המנויים מפאנל ניהול...');
                
                if (!Array.isArray(req.body.subscribers)) {
                    return res.status(400).json({
                        success: false,
                        message: 'נתוני מנויים חייבים להיות מערך'
                    });
                }

                const success = await saveSubscribers(req.body.subscribers);
                res.status(200).json({
                    success: success,
                    message: success ? `כל ${req.body.subscribers.length} המנויים נשמרו בהצלחה` : 'שגיאה בשמירה',
                    count: req.body.subscribers.length
                });

            } else if (req.body.subscriber) {
                // הוספת מנוי חדש (מהאתר)
                console.log('👤 מוסיף מנוי חדש מהאתר...');
                
                const newSubscriber = req.body.subscriber;
                
                // ולידציה
                const validationErrors = validateSubscriber(newSubscriber);
                if (validationErrors.length > 0) {
                    return res.status(400).json({
                        success: false,
                        message: 'שגיאות בנתונים: ' + validationErrors.join(', ')
                    });
                }

                // ניקוי וטיפול בנתונים
                newSubscriber.phone = cleanPhoneNumber(newSubscriber.phone);
                newSubscriber.name = newSubscriber.name.trim();
                
                // הוספת נתונים אוטומטיים
                newSubscriber.id = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                newSubscriber.registrationDate = new Date().toISOString();
                newSubscriber.active = true;
                newSubscriber.source = 'website_vercel';
                newSubscriber.lastUpdated = new Date().toISOString();

                // בדיקה שהמספר לא קיים כבר
                const phoneExists = subscribers.some(sub => sub.phone === newSubscriber.phone);

                if (!phoneExists) {
                    subscribers.push(newSubscriber);
                    const success = await saveSubscribers(subscribers);
                    
                    if (success) {
                        console.log(`✅ מנוי חדש נוסף: ${newSubscriber.name} (${newSubscriber.phone})`);
                        res.status(200).json({
                            success: true,
                            message: `🎉 מעולה ${newSubscriber.name}! נרשמת בהצלחה להתראות משרות.`,
                            subscriberId: newSubscriber.id
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            message: 'שגיאה בשמירת המנוי לקובץ'
                        });
                    }
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'מספר הטלפון כבר רשום במערכת התראות'
                    });
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'נתונים לא תקינים - חסר מידע על מנוי'
                });
            }

        } else if (req.method === 'DELETE') {
            // הסרת מנוי
            console.log('🗑️ מסיר מנוי...');
            
            const { phone, id } = req.body;
            
            if (!phone && !id) {
                return res.status(400).json({
                    success: false,
                    message: 'נדרש מספר טלפון או ID לביטול'
                });
            }

            const subscribers = await loadSubscribers();
            const beforeCount = subscribers.length;
            
            // הסרה לפי טלפון או ID
            const filteredSubscribers = subscribers.filter(sub => {
                if (phone) return sub.phone !== phone;
                if (id) return sub.id !== id;
                return true;
            });
            
            const afterCount = filteredSubscribers.length;
            const removed = beforeCount > afterCount;
            
            if (removed) {
                const success = await saveSubscribers(filteredSubscribers);
                console.log(`✅ מנוי הוסר בהצלחה (${beforeCount} → ${afterCount})`);
                
                res.status(200).json({
                    success: success,
                    message: success ? 'מנוי הוסר בהצלחה מרשימת ההתראות' : 'שגיאה בהסרת המנוי',
                    removedCount: 1
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'מנוי לא נמצא ברשימה'
                });
            }

        } else {
            // שיטת HTTP לא נתמכת
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).json({
                success: false,
                message: `שיטת ${req.method} לא נתמכת`,
                allowedMethods: ['GET', 'POST', 'DELETE']
            });
        }

    } catch (error) {
        console.error('❌ שגיאה כללית ב-API:', error);
        res.status(500).json({
            success: false,
            message: 'שגיאה פנימית בשרת',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}
