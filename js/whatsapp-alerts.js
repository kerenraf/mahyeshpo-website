/**
 * קומפוננטת התראות WhatsApp - מעודכן עם Vercel API
 * @author מה יש פה?
 * @version 3.0.0 - Vercel Edition
 */
class WhatsAppAlerts {
    constructor(options = {}) {
        this.options = {
            buttonText: 'התראות משרות',
            position: 'bottom-left',
            autoShow: true,
            categories: [
                'לוגיסטיקה, מחסנים, שילוח ורכש', 'פיתוח ותוכנה', 'מכירות ושיווק', 
                'חינוך והוראה', 'מזון ומסעדנות', 'בריאות ורפואה', 'בנייה והנדסה',
                'עיצוב ויצירה', 'אבטחה ושמירה', 'ניהול וכספים', 'שירות לקוחות', 
                'משאבי אנוש', 'מדע הנדסה מחקר ופיתוח', 'פיננסים וכלכלה', 
                'סחר וקמעונאות', 'תיירות ופנאי', 'תקשורת ומדיא', 'חקלאות וסביבה', 
                'תחבורה ונהיגה', 'אחר'
            ],
            areas: [
                'מרכז', 'צפון', 'דרום', 'ירושלים והסביבה',
                'חיפה קריות והצפון', 'שרון', 'שפלה', 'גליל',
                'נגב', 'כל הארץ', 'עבודה מהבית', 'אחר'
            ],
            ...options
        };

        // הגדרות Vercel API
        this.apiUrl = '/api/subscribers';
        this.useServerSync = true;
        this.subscribers = [];
        this.isModalOpen = false;
        
        if (this.options.autoShow) {
            this.init();
        }
    }

    // אתחול המערכת
    async init() {
        console.log('🚀 מאתחל מערכת התראות WhatsApp עם Vercel...');
        
        // טעינת מנויים מהשרת קודם
        const serverLoaded = await this.loadSubscribersFromServer();
        
        if (!serverLoaded) {
            // גיבוי: טעינה מקומית
            this.loadSubscribers();
            console.log('📱 נטענו נתונים מקומיים כגיבוי');
        }
        
        this.createButton();
        this.createModal();
        this.attachEvents();
        console.log('✅ קומפוננטת התראות WhatsApp אותחלה (מצב Vercel)');
    }

    // טעינת מנויים מהשרת
    async loadSubscribersFromServer() {
        if (!this.useServerSync) return false;
        
        try {
            console.log('📥 טוען מנויים מ-Vercel API...');
            const response = await fetch(this.apiUrl + '?t=' + Date.now());
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.success && Array.isArray(data.subscribers)) {
                this.subscribers = data.subscribers;
                this.saveSubscribers(); // גיבוי מקומי
                console.log(`✅ נטענו ${data.count} מנויים מ-Vercel API`);
                return true;
            } else {
                console.warn('⚠️ תגובה לא תקינה מהשרת:', data);
                return false;
            }
        } catch (error) {
            console.warn('⚠️ שגיאה בטעינה מ-Vercel, טוען מקומית:', error.message);
            return false;
        }
    }

    // הוספת מנוי חדש עם Vercel API
    async addSubscriber(subscriber) {
        // ולידציה
        if (!subscriber.phone || !subscriber.name) {
            this.showMessage('אנא מלא את כל הפרטים הנדרשים', 'error');
            return false;
        }

        // ניקוי מספר טלפון
        subscriber.phone = this.cleanPhoneNumber(subscriber.phone);

        if (this.useServerSync) {
            try {
                console.log('📤 שולח מנוי חדש ל-Vercel API...');
                
                const response = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ subscriber: subscriber })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // הצלחה - עדכון מקומי
                    subscriber.id = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                    subscriber.registrationDate = new Date().toISOString();
                    subscriber.active = true;
                    subscriber.source = 'website_vercel';
                    
                    this.subscribers.push(subscriber);
                    this.saveSubscribers();
                    this.showMessage(result.message || 'נרשמת בהצלחה להתראות!', 'success');
                    return true;
                } else {
                    // כשלון - הצגת שגיאה
                    this.showMessage(result.message || 'שגיאה בהרשמה', 'error');
                    return false;
                }
            } catch (error) {
                console.error('❌ שגיאה בהוספת מנוי ל-Vercel:', error);
                // גיבוי - שמירה מקומית
                this.fallbackToLocal(subscriber);
                return true;
            }
        } else {
            // שמירה מקומית בלבד
            this.fallbackToLocal(subscriber);
            return true;
        }
    }

    // פונקציית גיבוי - שמירה מקומית
    fallbackToLocal(subscriber) {
        console.log('💾 עובר למצב גיבוי מקומי...');
        
        const exists = this.subscribers.find(sub => sub.phone === subscriber.phone);
        
        if (!exists) {
            subscriber.id = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            subscriber.registrationDate = new Date().toISOString();
            subscriber.active = true;
            subscriber.source = 'website_local';
            
            this.subscribers.push(subscriber);
            this.saveSubscribers();
            this.showMessage(`🎉 מעולה ${subscriber.name}! נרשמת בהצלחה להתראות משרות.`, 'success');
        } else {
            this.showMessage('מספר הטלפון כבר רשום במערכת', 'error');
        }
    }

    // ניקוי מספר טלפון
    cleanPhoneNumber(phone) {
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

    // שמירת מנויים (גיבוי מקומי)
    saveSubscribers() {
        try {
            localStorage.setItem('whatsapp_alerts_subscribers', JSON.stringify(this.subscribers));
            console.log(`💾 נשמרו ${this.subscribers.length} מנויים מקומית`);
        } catch (error) {
            console.error('❌ שגיאה בשמירת מנויים:', error);
        }
    }

    // טעינת מנויים (גיבוי מקומי)
    loadSubscribers() {
        try {
            const saved = localStorage.getItem('whatsapp_alerts_subscribers');
            this.subscribers = saved ? JSON.parse(saved) : [];
            console.log(`📱 נטענו ${this.subscribers.length} מנויים מקומית`);
            return this.subscribers;
        } catch (error) {
            console.error('❌ שגיאה בטעינת מנויים:', error);
            this.subscribers = [];
            return [];
        }
    }

    // יצירת כפתור התראות
    createButton() {
        if (document.getElementById('whatsapp-alerts-btn')) return;

        const button = document.createElement('div');
        button.id = 'whatsapp-alerts-btn';
        button.innerHTML = `
            <div style="
                position: fixed;
                ${this.options.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
                ${this.options.position.includes('left') ? 'left: 20px;' : 'right: 20px;'}
                background: linear-gradient(135deg, #25D366, #128C7E);
                color: white;
                padding: 12px 20px;
                border-radius: 30px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                animation: pulse 2s infinite;
            " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 6px 20px rgba(37, 211, 102, 0.4)';" 
               onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 15px rgba(37, 211, 102, 0.3)';">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.588z"/>
                </svg>
                ${this.options.buttonText}
            </div>
            <style>
                @keyframes pulse {
                    0% { box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3); }
                    50% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5); }
                    100% { box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3); }
                }
            </style>
        `;

        document.body.appendChild(button);
    }

    // יצירת מודל רישום
    createModal() {
        if (document.getElementById('whatsapp-alerts-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'whatsapp-alerts-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                box-sizing: border-box;
            ">
                <div style="
                    background: white;
                    border-radius: 15px;
                    max-width: 500px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                    position: relative;
                ">
                    <!-- כפתור סגירה -->
                    <button id="whatsapp-close-btn" style="
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: #666;
                        z-index: 1;
                    ">×</button>

                    <!-- כותרת -->
                    <div style="
                        background: linear-gradient(135deg, #25D366, #128C7E);
                        color: white;
                        padding: 25px;
                        border-radius: 15px 15px 0 0;
                        text-align: center;
                    ">
                        <h2 style="margin: 0; font-size: 24px; font-weight: bold;">
                            🔔 התראות משרות לווטסאפ
                        </h2>
                        <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">
                            קבל התראות על משרות חדשות ישירות לווטסאפ
                        </p>
                    </div>

                    <!-- תוכן הטופס -->
                    <div style="padding: 30px;">
                        <form id="whatsapp-alerts-form">
                            <!-- שם -->
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">
                                    👤 שם מלא *
                                </label>
                                <input type="text" id="subscriber-name" required style="
                                    width: 100%;
                                    padding: 12px;
                                    border: 2px solid #e0e0e0;
                                    border-radius: 8px;
                                    font-size: 16px;
                                    box-sizing: border-box;
                                    transition: border-color 0.3s;
                                " placeholder="הכנס את שמך המלא">
                            </div>

                            <!-- טלפון -->
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">
                                    📱 מספר וטסאפ *
                                </label>
                                <input type="tel" id="subscriber-phone" required style="
                                    width: 100%;
                                    padding: 12px;
                                    border: 2px solid #e0e0e0;
                                    border-radius: 8px;
                                    font-size: 16px;
                                    box-sizing: border-box;
                                    transition: border-color 0.3s;
                                " placeholder="050-1234567">
                            </div>

                            <!-- קטגוריות -->
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">
                                    💼 תחומי עניין (בחר עד 3)
                                </label>
                                <div id="categories-container" style="
                                    max-height: 200px;
                                    overflow-y: auto;
                                    border: 2px solid #e0e0e0;
                                    border-radius: 8px;
                                    padding: 10px;
                                ">
                                    ${this.options.categories.map(cat => `
                                        <label style="
                                            display: block;
                                            margin-bottom: 8px;
                                            cursor: pointer;
                                            padding: 5px;
                                            border-radius: 5px;
                                            transition: background-color 0.2s;
                                        " onmouseover="this.style.backgroundColor='#f5f5f5';" onmouseout="this.style.backgroundColor='transparent';">
                                            <input type="checkbox" name="categories" value="${cat}" style="margin-left: 8px;">
                                            ${cat}
                                        </label>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- אזורים -->
                            <div style="margin-bottom: 25px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">
                                    📍 אזורי עניין (בחר עד 3)
                                </label>
                                <div id="areas-container" style="
                                    max-height: 150px;
                                    overflow-y: auto;
                                    border: 2px solid #e0e0e0;
                                    border-radius: 8px;
                                    padding: 10px;
                                ">
                                    ${this.options.areas.map(area => `
                                        <label style="
                                            display: block;
                                            margin-bottom: 8px;
                                            cursor: pointer;
                                            padding: 5px;
                                            border-radius: 5px;
                                            transition: background-color 0.2s;
                                        " onmouseover="this.style.backgroundColor='#f5f5f5';" onmouseout="this.style.backgroundColor='transparent';">
                                            <input type="checkbox" name="areas" value="${area}" style="margin-left: 8px;">
                                            ${area}
                                        </label>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- כפתור הרשמה -->
                            <button type="submit" style="
                                width: 100%;
                                background: linear-gradient(135deg, #25D366, #128C7E);
                                color: white;
                                border: none;
                                padding: 15px;
                                border-radius: 8px;
                                font-size: 18px;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s;
                            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(37, 211, 102, 0.3)';" 
                               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                                🚀 הירשם להתראות
                            </button>

                            <!-- הודעת הצהרה -->
                            <p style="
                                text-align: center;
                                font-size: 12px;
                                color: #666;
                                margin-top: 15px;
                                line-height: 1.4;
                            ">
                                📞 נשלח רק עדכונים על משרות רלוונטיות<br>
                                🔒 הפרטים שלך מוגנים ולא יועברו לצד שלישי<br>
                                ✋ ניתן לבטל בכל עת
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // חיבור אירועים
    attachEvents() {
        // כפתור פתיחת מודל
        const button = document.getElementById('whatsapp-alerts-btn');
        if (button) {
            button.addEventListener('click', () => this.openModal());
        }

        // כפתור סגירת מודל
        const closeBtn = document.getElementById('whatsapp-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // סגירה בלחיצה על הרקע
        const modal = document.getElementById('whatsapp-alerts-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // טופס רישום
        const form = document.getElementById('whatsapp-alerts-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // הגבלת בחירת קטגוריות
        this.limitCheckboxes('categories', 3);
        this.limitCheckboxes('areas', 3);
    }

    // הגבלת בחירת צ'קבוקסים
    limitCheckboxes(name, max) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]`);
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
                if (checked.length >= max) {
                    checkboxes.forEach(cb => {
                        if (!cb.checked) cb.disabled = true;
                    });
                } else {
                    checkboxes.forEach(cb => cb.disabled = false);
                }
            });
        });
    }

    // פתיחת מודל
    openModal() {
        const modal = document.getElementById('whatsapp-alerts-modal');
        if (modal) {
            modal.style.display = 'flex';
            this.isModalOpen = true;
            document.body.style.overflow = 'hidden';
        }
    }

    // סגירת מודל
    closeModal() {
        const modal = document.getElementById('whatsapp-alerts-modal');
        if (modal) {
            modal.style.display = 'none';
            this.isModalOpen = false;
            document.body.style.overflow = '';
            this.resetForm();
        }
    }

    // איפוס טופס
    resetForm() {
        const form = document.getElementById('whatsapp-alerts-form');
        if (form) {
            form.reset();
            // איפוס מגבלות צ'קבוקסים
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.disabled = false);
        }
    }

    // טיפול בשליחת טופס
    async handleSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('subscriber-name').value.trim();
        const phone = document.getElementById('subscriber-phone').value.trim();
        const categories = Array.from(document.querySelectorAll('input[name="categories"]:checked')).map(cb => cb.value);
        const areas = Array.from(document.querySelectorAll('input[name="areas"]:checked')).map(cb => cb.value);

        // ולידציה
        if (!name || !phone) {
            this.showMessage('אנא מלא את כל הפרטים הנדרשים', 'error');
            return;
        }

        if (categories.length === 0) {
            this.showMessage('אנא בחר לפחות תחום עניין אחד', 'error');
            return;
        }

        if (areas.length === 0) {
            this.showMessage('אנא בחר לפחות אזור אחד', 'error');
            return;
        }

        // יצירת אובייקט מנוי
        const subscriber = {
            name,
            phone,
            categories,
            areas,
            preferences: {
                categories,
                areas
            }
        };

        // שליחה למערכת
        const success = await this.addSubscriber(subscriber);
        
        if (success) {
            setTimeout(() => {
                this.closeModal();
            }, 2000);
        }
    }

    // הצגת הודעות למשתמש
    showMessage(message, type = 'info') {
        // הסרת הודעות קודמות
        const existing = document.getElementById('whatsapp-message');
        if (existing) existing.remove();

        const messageDiv = document.createElement('div');
        messageDiv.id = 'whatsapp-message';
        
        const bgColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3';
        
        messageDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${bgColor};
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10001;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                font-size: 14px;
                max-width: 300px;
                animation: slideIn 0.3s ease;
            ">
                ${message}
            </div>
            <style>
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            </style>
        `;

        document.body.appendChild(messageDiv);

        // הסרה אוטומטית אחרי 5 שניות
        setTimeout(() => {
            if (messageDiv) messageDiv.remove();
        }, 5000);
    }

    // API נוסף לשימוש חיצוני
    getSubscribers() {
        return this.subscribers;
    }

    getSubscribersByCategory(category) {
        return this.subscribers.filter(sub => 
            sub.categories && sub.categories.includes(category)
        );
    }

    getSubscribersByArea(area) {
        return this.subscribers.filter(sub => 
            sub.areas && sub.areas.includes(area)
        );
    }
}

// ייצוא לשימוש גלובלי
if (typeof window !== 'undefined') {
    window.WhatsAppAlerts = WhatsAppAlerts;
    
    // אתחול אוטומטי
    if (!window.whatsappAlerts) {
        window.whatsappAlerts = new WhatsAppAlerts();
    }
}

// תמיכה ב-Node.js (אם נדרש)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppAlerts;
}
