/**
 * קומפוננטת התראות WhatsApp - משולבת עם מערכת הניהול הקיימת
 * @author מה יש פה?
 * @version 7.0.0 - גרסה משולבת ומשופרת
 */
class WhatsAppAlerts {
    constructor(options = {}) {
        this.options = {
            buttonText: 'התראות משרות',
            position: 'bottom-left',
            autoShow: true,
            // מספר הטלפון שלך - עדכני למספר הנכון
ownerPhone: '972555504633', // המספר הנכון שלך
            // כתובת מייל לקבלת העתק - אופציונלי
            ownerEmail: 'kcs@kerencs.com',
            // ברירת מחדל - יתעדכן דינמית מקובץ המשרות
            categories: ['טוען קטגוריות...'],
            areas: ['טוען אזורים...'],
            ...options
        };

        this.isModalOpen = false;
        this.jobsData = [];
        this.subscribers = [];
        
        // טעינת מנויים קיימים מLocalStorage
        this.loadSubscribers();
        
        if (this.options.autoShow) {
            this.init();
        }
    }

    // אתחול המערכת
    async init() {
        console.log('🚀 מאתחל מערכת התראות WhatsApp משולבת...');
        
        // טעינת נתוני משרות לקטגוריות ואזורים דינמיים
        await this.loadJobsData();
        
        this.createButton();
        this.createModal();
        this.attachEvents();
        
        console.log('✅ קומפוננטת התראות WhatsApp אותחלה (גרסה משולבת)');
    }

    // טעינת מנויים מקומיים
    loadSubscribers() {
        try {
            const storedData = localStorage.getItem('whatsapp_alerts_subscribers');
            if (storedData) {
                this.subscribers = JSON.parse(storedData);
                console.log(`✅ נטענו ${this.subscribers.length} מנויים מקומיים`);
            } else {
                console.log('ℹ️ לא נמצאו מנויים מקומיים');
                this.subscribers = [];
            }
        } catch (error) {
            console.error('❌ שגיאה בטעינת מנויים:', error);
            this.subscribers = [];
        }
    }

    // שמירת מנויים
    saveSubscribers() {
        try {
            localStorage.setItem('whatsapp_alerts_subscribers', JSON.stringify(this.subscribers));
            console.log(`✅ נשמרו ${this.subscribers.length} מנויים`);
            return true;
        } catch (error) {
            console.error('❌ שגיאה בשמירת מנויים:', error);
            return false;
        }
    }

    // קבלת כל המנויים
    getSubscribers() {
        return this.subscribers || [];
    }

    // הוספת מנוי חדש
    addSubscriber(subscriber) {
        // הוספת מזהה ייחודי ותאריך רישום אם חסרים
        subscriber.id = subscriber.id || Date.now();
        subscriber.registrationDate = subscriber.registrationDate || new Date().toISOString();
        subscriber.active = subscriber.active !== false;
        subscriber.source = subscriber.source || 'website';
        
        // בדיקה אם מספר הטלפון כבר קיים
        const exists = this.subscribers.some(sub => sub.phone === subscriber.phone);
        
        if (!exists) {
            this.subscribers.push(subscriber);
            this.saveSubscribers();
            console.log(`✅ נוסף מנוי חדש: ${subscriber.name} (${subscriber.phone})`);
            return true;
        } else {
            console.log(`ℹ️ המנוי ${subscriber.phone} כבר קיים במערכת`);
            return false;
        }
    }

    // טעינת נתוני משרות לקבלת קטגוריות ואזורים דינמיים
    async loadJobsData() {
        try {
            console.log('📥 טוען נתוני משרות לקטגוריות ואזורים...');
            
            const response = await fetch('data/jobs.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.jobsData = await response.json();
            
            // חילוץ קטגוריות ואזורים ייחודיים
            const categoriesSet = new Set();
            const areasSet = new Set();
            
            this.jobsData.forEach(job => {
                if (job.category) {
                    categoriesSet.add(job.category.trim());
                }
                if (job.region) {
                    areasSet.add(job.region.trim());
                } else if (job.area) {
                    areasSet.add(job.area.trim());
                }
            });

            // המרה למערכים ממוינים
            this.options.categories = Array.from(categoriesSet).sort();
            this.options.areas = Array.from(areasSet).sort();
            
            // הוספת אפשרויות כלליות
            this.options.areas.push('כל הארץ', 'עבודה מהבית');
            this.options.categories.push('אחר');
            
            console.log(`✅ נטענו ${this.options.categories.length} קטגוריות ו-${this.options.areas.length} אזורים מקובץ המשרות`);
            
            // עדכון המודל אם הוא כבר קיים
            this.updateModalContent();
            
        } catch (error) {
            console.warn('⚠️ שגיאה בטעינת נתוני משרות, משתמש בברירת מחדל:', error);
            
            // ברירת מחדל אם יש בעיה בטעינה
            this.options.categories = [
                'לוגיסטיקה, מחסנים, שילוח ורכש', 'פיתוח ותוכנה', 'מכירות ושיווק', 
                'חינוך והוראה', 'מזון ומסעדנות', 'בריאות ורפואה', 'בנייה והנדסה',
                'עיצוב ויצירה', 'אבטחה ושמירה', 'ניהול וכספים', 'שירות לקוחות', 
                'משאבי אנוש', 'מדע הנדסה מחקר ופיתוח', 'פיננסים וכלכלה', 
                'סחר וקמעונאות', 'תיירות ופנאי', 'תקשורת ומדיא', 'חקלאות וסביבה', 
                'תחבורה ונהיגה', 'אחר'
            ];
            
            this.options.areas = [
                'מרכז', 'צפון', 'דרום', 'ירושלים והסביבה',
                'חיפה קריות והצפון', 'שרון', 'שפלה', 'גליל',
                'נגב', 'כל הארץ', 'עבודה מהבית', 'אחר'
            ];
        }
    }

    // פתיחת WhatsApp עם פרטי המנוי
    openWhatsAppWithSubscriberDetails(formData) {
        try {
            console.log('📱 פותח WhatsApp עם פרטי מנוי:', formData);
            
            // יצירת הודעה מפורטת עם כל פרטי המנוי
            const message = `
🔔 *מנוי חדש להתראות משרות*

👤 *שם*: ${formData.name}
📱 *טלפון*: ${formData.phone}
💼 *תחומי עניין*: ${formData.categories.join(', ')}
📍 *אזורי עניין*: ${formData.areas.join(', ')}
🕒 *תאריך*: ${new Date().toLocaleString('he-IL')}

מנוי זה נרשם דרך האתר "מה יש פה" לקבלת התראות משרות.
            `.trim();
            
            // קידוד ההודעה ל-URL
            const encodedMessage = encodeURIComponent(message);
            
            // יצירת קישור WhatsApp עם ההודעה
            const whatsappUrl = `https://wa.me/${this.options.ownerPhone}?text=${encodedMessage}`;
            
            // פתיחת חלון חדש עם WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // שליחת עותק במייל (אם יש כתובת מייל)
            if (this.options.ownerEmail) {
                this.sendEmailCopy(formData);
            }
            
            return true;
        } catch (error) {
            console.error('❌ שגיאה בפתיחת WhatsApp:', error);
            return false;
        }
    }
    
    // שליחת עותק במייל
    sendEmailCopy(formData) {
        try {
            const subject = `מנוי חדש - ${formData.name}`;
            const body = `
מנוי חדש נרשם להתראות:

שם: ${formData.name}
טלפון: ${formData.phone}
תחומי עניין: ${formData.categories.join(', ')}
אזורי עניין: ${formData.areas.join(', ')}
תאריך: ${new Date().toLocaleString('he-IL')}

הפרטים נשמרו במערכת המקומית.
            `.trim();
            
            // פתיחת תוכנת מייל עם ההודעה
            const mailtoUrl = `mailto:${this.options.ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(mailtoUrl, '_blank');
        } catch (error) {
            console.warn('⚠️ שגיאה בשליחת מייל:', error);
        }
    }

    // התאמת משרה למנויים
    findMatchingSubscribers(jobData) {
        if (!jobData || !this.subscribers) return [];

        return this.subscribers.filter(subscriber => {
            // התאמת קטגוריה 
            const categoryMatch = this.matchCategory(jobData.category, subscriber.categories);
            
            // התאמת אזור
            const areaMatch = this.matchArea(jobData.region || jobData.area, subscriber.areas);
            
            return categoryMatch && areaMatch;
        });
    }

    // התאמת קטגוריה משופרת
    matchCategory(jobCategory, subscriberCategories) {
        if (!jobCategory || !subscriberCategories) return false;
        
        const jobCat = jobCategory.toLowerCase();
        
        return subscriberCategories.some(subCat => {
            const subCatLower = subCat.toLowerCase();
            
            // התאמה מדויקת
            if (jobCat === subCatLower) return true;
            
            // התאמה חלקית
            if (jobCat.includes(subCatLower) || subCatLower.includes(jobCat)) return true;
            
            // התאמה לפי מילות מפתח
            return this.matchByKeywords(jobCat, subCatLower);
        });
    }

    // התאמת מילות מפתח
    matchByKeywords(jobCategory, subscriberCategory) {
        const keywordMap = {
            'לוגיסטיקה': ['נהג', 'נהיגה', 'משאית', 'מנוף', 'הובלה', 'מחסן', 'שילוח'],
            'נהיגה': ['לוגיסטיקה', 'משאית', 'מנוף', 'הובלה', 'תחבורה'],
            'פיתוח': ['מפתח', 'תכנות', 'תוכנה', 'programmer', 'developer'],
            'מכירות': ['שיווק', 'marketing', 'sales', 'מוכר'],
            'חינוך': ['מורה', 'הוראה', 'מחנך', 'גננת']
        };

        for (const [key, keywords] of Object.entries(keywordMap)) {
            if (jobCategory.includes(key) && keywords.some(k => subscriberCategory.includes(k))) {
                return true;
            }
            if (subscriberCategory.includes(key) && keywords.some(k => jobCategory.includes(k))) {
                return true;
            }
        }

        return false;
    }

    // התאמת אזור
    matchArea(jobArea, subscriberAreas) {
        if (!jobArea || !subscriberAreas) return false;
        
        const jobAreaLower = jobArea.toLowerCase();
        
        return subscriberAreas.some(subArea => {
            const subAreaLower = subArea.toLowerCase();
            
            return (
                jobAreaLower === subAreaLower ||
                jobAreaLower.includes(subAreaLower) ||
                subAreaLower.includes(jobAreaLower) ||
                subAreaLower === 'כל הארץ' ||
                subAreaLower === 'אחר'
            );
        });
    }

// יצירת הודעת משרה
createJobMessage(jobData) {
    // יצירת קישור ישיר למשרה באתר
    const jobUrl = `https://www.mayeshpo.co.il/job/${jobData.id || jobData.jobNumber}`;
    
    return `🔥 משרה חדשה!

📋 ${jobData.title}
📍 ${jobData.region || jobData.area || 'לא צוין'}
🎯 ${jobData.category || 'לא צוין'}
🆔 מספר משרה: ${jobData.jobNumber || jobData.id}

${jobData.description ? `💬 ${jobData.description}\n\n` : ''}🔗 לפרטים מלאים: ${jobUrl}

בהצלחה! 💪`;
}
    
    // שליחת התראה על משרה
    sendJobAlert(jobData) {
        const matchingSubscribers = this.findMatchingSubscribers(jobData);
        
        if (matchingSubscribers.length === 0) {
            console.log('❌ אין מנויים מתאימים למשרה זו');
            return false;
        }

        const message = this.createJobMessage(jobData);
        
        matchingSubscribers.forEach(subscriber => {
            const phoneNumber = subscriber.phone.replace(/^0/, '972').replace(/\D/g, '');
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            console.log(`📱 שולח ל-${subscriber.phone}:`, whatsappUrl);
            // כאן יהיה קוד שליחה אמיתי בעתיד
        });
        
        // עדכון מונה התראות
        const currentAlerts = parseInt(localStorage.getItem('whatsapp_total_alerts') || '0');
        localStorage.setItem('whatsapp_total_alerts', (currentAlerts + matchingSubscribers.length).toString());
        
        return true;
    }

    // ניקוי מספר טלפון
    cleanPhoneNumber(phone) {
        let cleaned = phone.replace(/[^\d+]/g, '');
        
        if (cleaned.startsWith('0')) {
            cleaned = '+972' + cleaned.substring(1);
        }
        
        if (!cleaned.startsWith('+')) {
            cleaned = '+972' + cleaned;
        }
        
        return cleaned;
    }

    // יצירת כפתור התראות
    createButton() {
        if (document.getElementById('whatsapp-alerts-btn')) return;

        const button = document.createElement('div');
        button.id = 'whatsapp-alerts-btn';
        button.innerHTML = `
            <div style="
                position: fixed;
                ${this.options.position.includes('bottom') ? 'bottom: 80px;' : 'top: 20px;'}
                ${this.options.position.includes('left') ? 'left: 20px;' : 'right: 20px;'}
                background: linear-gradient(135deg, #F69898, #ffb6c1);
                color: white;
                padding: 12px 20px;
                border-radius: 30px;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                box-shadow: 0 4px 15px rgba(246, 152, 152, 0.3);
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                animation: pulse 2s infinite;
            " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 6px 20px rgba(246, 152, 152, 0.4)';" 
               onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 15px rgba(246, 152, 152, 0.3)';">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.588z"/>
                </svg>
                ${this.options.buttonText}
            </div>
            <style>
                @keyframes pulse {
                    0% { box-shadow: 0 4px 15px rgba(246, 152, 152, 0.3); }
                    50% { box-shadow: 0 4px 20px rgba(246, 152, 152, 0.5); }
                    100% { box-shadow: 0 4px 15px rgba(246, 152, 152, 0.3); }
                }
            </style>
        `;

        document.body.appendChild(button);
    }

    // יצירת מודל רישום (מתעדכן אחרי טעינת הנתונים)
    createModal() {
        if (document.getElementById('whatsapp-alerts-modal')) {
            // אם המודל כבר קיים, מעדכן אותו עם הנתונים החדשים
            this.updateModalContent();
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'whatsapp-alerts-modal';
        modal.style.display = 'none';
        
        this.updateModalContent(modal);
        document.body.appendChild(modal);
    }

    // עדכון תוכן המודל עם קטגוריות ואזורים דינמיים
    updateModalContent(modal = null) {
        if (!modal) {
            modal = document.getElementById('whatsapp-alerts-modal');
        }
        if (!modal) return;

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
                backdrop-filter: blur(5px);
            ">
                <div style="
                    background-color: #000;
                    border-radius: 15px;
                    max-width: 500px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                    position: relative;
                    border: 2px solid #F69898;
                    color: white;
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
                        color: #F69898;
                        z-index: 1;
                    ">×</button>

                    <!-- כותרת -->
                    <div style="
                        background: linear-gradient(135deg, #F69898, #ffb6c1);
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
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #F69898;">
                                    👤 שם מלא *
                                </label>
                                <input type="text" id="subscriber-name" required style="
                                    width: 100%;
                                    padding: 12px;
                                    border: 2px solid rgba(246, 152, 152, 0.3);
                                    border-radius: 8px;
                                    font-size: 16px;
                                    box-sizing: border-box;
                                    transition: border-color 0.3s;
                                    background: rgba(255, 255, 255, 0.1);
                                    color: white;
                                " placeholder="הכנס את שמך המלא">
                            </div>

                            <!-- טלפון -->
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #F69898;">
                                    📱 מספר וטסאפ *
                                </label>
                                <input type="tel" id="subscriber-phone" required style="
                                    width: 100%;
                                    padding: 12px;
                                    border: 2px solid rgba(246, 152, 152, 0.3);
                                    border-radius: 8px;
                                    font-size: 16px;
                                    box-sizing: border-box;
                                    transition: border-color 0.3s;
                                    background: rgba(255, 255, 255, 0.1);
                                    color: white;
                                " placeholder="050-1234567">
                            </div>

                            <!-- קטגוריות דינמיות -->
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #F69898;">
                                    💼 תחומי עניין (בחר עד 3)
                                    <small style="color: #cccccc; font-weight: normal;">- מבוסס על משרות קיימות</small>
                                </label>
                                <div id="categories-container" style="
                                    max-height: 200px;
                                    overflow-y: auto;
                                    border: 2px solid rgba(246, 152, 152, 0.3);
                                    border-radius: 8px;
                                    padding: 10px;
                                    background: rgba(255, 255, 255, 0.05);
                                ">
                                    ${this.options.categories.map(cat => `
                                        <label style="
                                            display: block;
                                            margin-bottom: 8px;
                                            cursor: pointer;
                                            padding: 5px;
                                            border-radius: 5px;
                                            transition: background-color 0.2s;
                                            color: white;
                                        " onmouseover="this.style.backgroundColor='rgba(246, 152, 152, 0.1)';" onmouseout="this.style.backgroundColor='transparent';">
                                            <input type="checkbox" name="categories" value="${cat}" style="margin-left: 8px;">
                                            ${cat}
                                        </label>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- אזורים דינמיים -->
                            <div style="margin-bottom: 25px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #F69898;">
                                    📍 אזורי עניין (בחר עד 3)
                                    <small style="color: #cccccc; font-weight: normal;">- מבוסס על משרות קיימות</small>
                                </label>
                                <div id="areas-container" style="
                                    max-height: 150px;
                                    overflow-y: auto;
                                    border: 2px solid rgba(246, 152, 152, 0.3);
                                    border-radius: 8px;
                                    padding: 10px;
                                    background: rgba(255, 255, 255, 0.05);
                                ">
                                    ${this.options.areas.map(area => `
                                        <label style="
                                            display: block;
                                            margin-bottom: 8px;
                                            cursor: pointer;
                                            padding: 5px;
                                            border-radius: 5px;
                                            transition: background-color 0.2s;
                                            color: white;
                                        " onmouseover="this.style.backgroundColor='rgba(246, 152, 152, 0.1)';" onmouseout="this.style.backgroundColor='transparent';">
                                            <input type="checkbox" name="areas" value="${area}" style="margin-left: 8px;">
                                            ${area}
                                        </label>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- כפתור הרשמה -->
                            <button type="submit" style="
                                width: 100%;
                                background: linear-gradient(135deg, #F69898, #ffb6c1);
                                color: white;
                                border: none;
                                padding: 15px;
                                border-radius: 8px;
                                font-size: 18px;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s;
                            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(246, 152, 152, 0.4)';" 
                               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                                🚀 הירשם להתראות
                            </button>

                            <!-- הודעת הצהרה -->
                            <p style="
                                text-align: center;
                                font-size: 12px;
                                color: #cccccc;
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

        // עדכון האירועים אחרי יצירת התוכן החדש
        this.attachEvents();
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
                if (e.target.closest('.modal-content')) return;
                if (e.target === modal.firstElementChild) {
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

        // מקלדת
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
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

        // יצירת אובייקט מנוי בפורמט התואם למערכת הניהול
        const subscriber = {
            id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            name: name,
            phone: this.cleanPhoneNumber(phone),
            categories: categories,
            areas: areas,
            registrationDate: new Date().toISOString(),
            active: true,
            source: 'website_popup'
        };

        // הוספת המנוי למערכת
        const added = this.addSubscriber(subscriber);
        
        // פתיחת WhatsApp עם פרטי המנוי
        const whatsappOpened = this.openWhatsAppWithSubscriberDetails(subscriber);
        
        if (added) {
            this.showMessage(`🎉 מעולה ${name}! נרשמת בהצלחה להתראות משרות.`, 'success');
            setTimeout(() => {
                this.closeModal();
            }, 2000);
        } else {
            this.showMessage('מספר הטלפון כבר רשום במערכת', 'warning');
        }
    }

    // הצגת הודעות למשתמש
    showMessage(message, type = 'info') {
        // הסרת הודעות קודמות
        const existing = document.getElementById('whatsapp-message');
        if (existing) existing.remove();

        const messageDiv = document.createElement('div');
        messageDiv.id = 'whatsapp-message';
        
        const bgColor = type === 'success' ? '#4CAF50' : 
                       type === 'error' ? '#f44336' : 
                       type === 'warning' ? '#ff9800' : '#2196F3';
        
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

    // מציאת משרה לפי מספר
    findJobById(jobId) {
        if (!jobId || !this.jobsData) return null;

        // ניקוי מספר המשרה
        const cleanJobId = jobId.toString().trim();
        
        // חיפוש במספר השדות הרלוונטיים
        const job = this.jobsData.find(job => {
            if (!job) return false;
            
            // חיפוש לפי jobNumber (השדה הנכון!)
            if (job.jobNumber && job.jobNumber.toString().trim() === cleanJobId) {
                return true;
            }
            
            // חיפוש לפי id כגיבוי
            if (job.id && job.id.toString().trim() === cleanJobId) {
                return true;
            }
            
            // חיפוש חלקי בכותרת
            if (cleanJobId.length > 3) {
                if (job.title && job.title.includes(cleanJobId)) return true;
            }
            
            return false;
        });

        if (job) {
            console.log(`✅ נמצאה משרה: ${job.jobNumber} - ${job.title}`);
        } else {
            console.log(`❌ לא נמצאה משרה עם המספר: ${cleanJobId}`);
        }

        return job;
    }

    // המרת משרה לפורמט תקני
    normalizeJob(job) {
        if (!job) return null;

        return {
            id: job.jobNumber || job.id || 'unknown',
            jobNumber: job.jobNumber || job.id || 'unknown', 
            title: job.title || 'ללא כותרת',
            area: job.region || job.area || 'לא צוין',
            region: job.region || job.area || 'לא צוין',
            city: job.city || 'לא צוין',
            category: job.category || 'אחר',
            description: job.description || '',
            requirements: job.requirements || '',
            status: job.status || 'unknown',
            featured: job.featured || false,
            createdAt: job.createdAt || new Date().toISOString()
        };
    }

    // סקירת המשרות
    analyzeJobs() {
        if (!this.jobsData || this.jobsData.length === 0) return null;

        // ספירת קטגוריות
        const categoryCounts = {};
        this.jobsData.forEach(job => {
            if (job.category) {
                categoryCounts[job.category] = (categoryCounts[job.category] || 0) + 1;
            }
        });

        // ספירת אזורים
        const areaCounts = {};
        this.jobsData.forEach(job => {
            const area = job.region || job.area;
            if (area) {
                areaCounts[area] = (areaCounts[area] || 0) + 1;
            }
        });

        // מציאת משרות פופולריות
        const popularCategories = Object.entries(categoryCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
            
        const popularAreas = Object.entries(areaCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        // סקירת התאמה למנויים
        const subscriberMatchAnalysis = this.subscribers.map(subscriber => {
            const matchingJobs = this.jobsData.filter(job => 
                this.matchCategory(job.category, subscriber.categories) &&
                this.matchArea(job.region || job.area, subscriber.areas)
            );
            
            return {
                subscriber: `${subscriber.name} (${subscriber.phone})`,
                totalMatches: matchingJobs.length,
                matchPercentage: Math.round((matchingJobs.length / this.jobsData.length) * 100),
                topCategories: subscriber.categories,
                topAreas: subscriber.areas
            };
        });

        return {
            totalJobs: this.jobsData.length,
            activeJobs: this.jobsData.filter(job => job.status === 'פעיל').length,
            featuredJobs: this.jobsData.filter(job => job.featured).length,
            categoriesCount: Object.keys(categoryCounts).length,
            areasCount: Object.keys(areaCounts).length,
            popularCategories,
            popularAreas,
            subscriberMatchAnalysis,
            lastUpdated: new Date().toISOString()
        };
    }
}

// ייצוא לשימוש גלובלי
if (typeof window !== 'undefined') {
    window.WhatsAppAlerts = WhatsAppAlerts;
    
    // אתחול אוטומטי
    if (!window.whatsappAlerts) {
        window.whatsappAlerts = new WhatsAppAlerts({
        ownerPhone: '972555504633', // המספר שלך
            ownerEmail: 'kcs@kerencs.com' // עדכן לאימייל הנכון
        });
    }
}

// תמיכה ב-Node.js (אם נדרש)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppAlerts;
}
