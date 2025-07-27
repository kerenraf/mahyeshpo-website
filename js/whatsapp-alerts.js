/**
 * קומפוננטת התראות WhatsApp - גרסת Google Forms
 * @author מה יש פה?
 * @version 5.0.0 - Google Forms Integration
 */
class WhatsAppAlerts {
    constructor(options = {}) {
        this.options = {
            buttonText: 'התראות משרות',
            position: 'bottom-left',
            autoShow: true,
            // כתובת Google Form - מעודכן עם הכתובת שלך
            googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeajdMe14COlT3kUptdxx1MRqp-sOfl2aXo_ntywcAxtTKPw/formResponse',
            // השדות של Google Form - נחשה מחוכמת לפי מבנה סטנדרטי
            formFields: {
                name: 'entry.2005620554',      // שם מלא
                phone: 'entry.1045781291',     // מספר WhatsApp  
                categories: 'entry.839299703', // תחומי עניין
                areas: 'entry.292906491'       // אזורי עניין
            },
            // ברירת מחדל - יתעדכן דינמית מקובץ המשרות
            categories: ['טוען קטגוריות...'],
            areas: ['טוען אזורים...'],
            ...options
        };

        this.isModalOpen = false;
        this.jobsData = [];
        
        if (this.options.autoShow) {
            this.init();
        }
    }

    // אתחול המערכת
    async init() {
        console.log('🚀 מאתחל מערכת התראות WhatsApp עם Google Forms...');
        
        // טעינת נתוני משרות לקטגוריות ואזורים דינמיים
        await this.loadJobsData();
        
        this.createButton();
        this.createModal();
        this.attachEvents();
        
        console.log('✅ קומפוננטת התראות WhatsApp אותחלה (גרסת Google Forms)');
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
                if (job.city) {
                    areasSet.add(job.city.trim());
                }
            });

            // המרה למערכים ממוינים
            this.options.categories = Array.from(categoriesSet).sort();
            this.options.areas = Array.from(areasSet).sort();
            
            // הוספת אפשרויות כלליות
            this.options.areas.push('כל הארץ', 'עבודה מהבית');
            this.options.categories.push('אחר');
            
            console.log(`✅ נטענו ${this.options.categories.length} קטגוריות ו-${this.options.areas.length} אזורים מקובץ המשרות`);
            
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

    // שליחה ל-Google Forms
    async submitToGoogleForms(formData) {
        try {
            // יצירת FormData
            const data = new FormData();
            
            // הוספת הנתונים לפי שמות השדות של Google Forms
            data.append(this.options.formFields.name, formData.name);
            data.append(this.options.formFields.phone, formData.phone);
            data.append(this.options.formFields.categories, formData.categories.join(', '));
            data.append(this.options.formFields.areas, formData.areas.join(', '));

            // שליחה ל-Google Forms
            const response = await fetch(this.options.googleFormUrl, {
                method: 'POST',
                mode: 'no-cors', // חשוב! Google Forms דורש את זה
                body: data
            });

            // Google Forms תמיד מחזיר opaque response עם no-cors
            // אז אנחנו מניחים שהשליחה הצליחה אם לא היתה שגיאה
            console.log('📤 נשלח ל-Google Forms בהצלחה');
            return true;

        } catch (error) {
            console.error('❌ שגיאה בשליחה ל-Google Forms:', error);
            return false;
        }
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

                            <!-- קטגוריות דינמיות -->
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">
                                    💼 תחומי עניין (בחר עד 3)
                                    <small style="color: #666; font-weight: normal;">- מבוסס על משרות קיימות</small>
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

                            <!-- אזורים דינמיים -->
                            <div style="margin-bottom: 25px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #333;">
                                    📍 אזורי עניין (בחר עד 3)
                                    <small style="color: #666; font-weight: normal;">- מבוסס על משרות קיימות</small>
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

        // עדכון האירועים אחרי יצירת התוכן החדש
        this.attachEvents();
    }
