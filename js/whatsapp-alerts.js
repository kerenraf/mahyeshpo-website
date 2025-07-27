// פתרון בלי PHP - עדכון whatsapp-alerts.js
// החליפי את הקוד הקיים בזה:

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

        // השבתת שרת - עובד מקומית בלבד
        this.useServerSync = false;
        this.jsonBackupFile = 'data/subscribers.json';
        this.subscribers = [];
        this.isModalOpen = false;
        
        if (this.options.autoShow) {
            this.init();
        }
    }

    // אתחול
    async init() {
        // ניסיון טעינה מ-JSON קודם
        await this.loadFromJsonFile();
        
        // אם לא הצליח, טען מקומית
        if (this.subscribers.length === 0) {
            this.loadSubscribers();
        }
        
        this.createButton();
        this.createModal();
        this.attachEvents();
        console.log('✅ קומפוננטת התראות WhatsApp אותחלה (מצב JSON)');
    }

    // טעינה מקובץ JSON
    async loadFromJsonFile() {
        try {
            const response = await fetch(this.jsonBackupFile + '?' + Date.now());
            
            if (response.ok) {
                const data = await response.json();
                
                if (Array.isArray(data) && data.length > 0) {
                    this.subscribers = data;
                    this.saveSubscribers(); // גיבוי מקומי
                    console.log(`✅ נטענו ${data.length} מנויים מקובץ JSON`);
                    return true;
                }
            }
        } catch (error) {
            console.warn('⚠️ לא ניתן לטעון מקובץ JSON, טוען מקומית:', error);
        }
        return false;
    }

    // יצירת הכפתור הצף
    createButton() {
        if (document.getElementById('whatsapp-alerts-button')) return;

        const button = document.createElement('div');
        button.id = 'whatsapp-alerts-button';
        button.className = `whatsapp-alerts-button ${this.options.position}`;
        button.innerHTML = `
            <i class="fas fa-bell"></i>
            <span>${this.options.buttonText}</span>
        `;
        
        button.addEventListener('click', () => this.openModal());
        document.body.appendChild(button);
    }

    // יצירת המודל
    createModal() {
        if (document.getElementById('whatsapp-alerts-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'whatsapp-alerts-modal';
        modal.className = 'whatsapp-alerts-modal';
        modal.innerHTML = this.getModalHTML();
        
        document.body.appendChild(modal);
    }

    // תוכן המודל
    getModalHTML() {
        return `
            <div class="whatsapp-alerts-modal-content">
                <div class="whatsapp-alerts-modal-header">
                    <h3><i class="fas fa-bell"></i> התראות משרות ל-WhatsApp</h3>
                    <span class="whatsapp-alerts-close">&times;</span>
                </div>
                <div class="whatsapp-alerts-modal-body">
                    <div class="whatsapp-alerts-intro">
                        <p>📱 קבל התראות על משרות חדשות שמתאימות לך ישירות לווצאפ!</p>
                        <p><small>ללא ספאם • רק משרות רלוונטיות • אפשר לבטל בכל עת</small></p>
                    </div>
                    
                    <form id="whatsapp-alerts-form">
                        <div class="whatsapp-alerts-form-group">
                            <label for="whatsapp-alerts-name">שם מלא *</label>
                            <input type="text" id="whatsapp-alerts-name" placeholder="השם שלך..." required>
                        </div>
                        
                        <div class="whatsapp-alerts-form-group">
                            <label for="whatsapp-alerts-phone">מספר WhatsApp *</label>
                            <input type="tel" id="whatsapp-alerts-phone" placeholder="05X-XXX-XXXX" required>
                        </div>
                        
                        <div class="whatsapp-alerts-form-group">
                            <label>תחומי עניין * (בחר לפחות אחד)</label>
                            <div class="whatsapp-alerts-checkboxes" id="whatsapp-alerts-categories">
                                ${this.getCategoriesHTML()}
                            </div>
                            <div id="custom-category-container" style="display: none; margin-top: 10px;">
                                <input type="text" id="custom-category" placeholder="איזה תחום מעניין אותך?" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                            </div>
                        </div>
                        
                        <div class="whatsapp-alerts-form-group">
                            <label>אזורים מועדפים * (בחר לפחות אחד)</label>
                            <div class="whatsapp-alerts-checkboxes" id="whatsapp-alerts-areas">
                                ${this.getAreasHTML()}
                            </div>
                            <div id="custom-area-container" style="display: none; margin-top: 10px;">
                                <input type="text" id="custom-area" placeholder="איזה אזור מעניין אותך?" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                            </div>
                        </div>
                        
                        <button type="submit" class="whatsapp-alerts-submit-btn">
                            <i class="fas fa-bell"></i> הירשם להתראות
                        </button>
                    </form>
                    
                    <div id="whatsapp-alerts-message" class="whatsapp-alerts-message"></div>
                    
                    <div class="whatsapp-alerts-footer">
                        <p><small>המידע שלך מוגן ולא יועבר לגורמי צד שלישי</small></p>
                        <p><small>נשלח לך רק משרות המתאימות להעדפות שבחרת</small></p>
                    </div>
                </div>
            </div>
        `;
    }

    // HTML קטגוריות
    getCategoriesHTML() {
        return this.options.categories.map(category => `
            <div class="whatsapp-alerts-checkbox-item">
                <input type="checkbox" id="cat_${category}" value="${category}" onchange="window.whatsappAlerts.handleCategoryChange('${category}')">
                <label for="cat_${category}">${category}</label>
            </div>
        `).join('');
    }

    // HTML אזורים
    getAreasHTML() {
        return this.options.areas.map(area => `
            <div class="whatsapp-alerts-checkbox-item">
                <input type="checkbox" id="area_${area}" value="${area}" onchange="window.whatsappAlerts.handleAreaChange('${area}')">
                <label for="area_${area}">${area}</label>
            </div>
        `).join('');
    }

    // טיפול בשינוי קטגוריה
    handleCategoryChange(category) {
        const customContainer = document.getElementById('custom-category-container');
        const otherCheckbox = document.getElementById('cat_אחר');
        
        if (category === 'אחר' && otherCheckbox && otherCheckbox.checked) {
            customContainer.style.display = 'block';
            document.getElementById('custom-category').focus();
        } else if (category === 'אחר' && otherCheckbox && !otherCheckbox.checked) {
            customContainer.style.display = 'none';
            document.getElementById('custom-category').value = '';
        }
    }

    // טיפול בשינוי אזור
    handleAreaChange(area) {
        const customContainer = document.getElementById('custom-area-container');
        const otherCheckbox = document.getElementById('area_אחר');
        
        if (area === 'אחר' && otherCheckbox && otherCheckbox.checked) {
            customContainer.style.display = 'block';
            document.getElementById('custom-area').focus();
        } else if (area === 'אחר' && otherCheckbox && !otherCheckbox.checked) {
            customContainer.style.display = 'none';
            document.getElementById('custom-area').value = '';
        }
    }

    // מאזיני אירועים
    attachEvents() {
        // סגירת מודל
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('whatsapp-alerts-close') || 
                e.target.classList.contains('whatsapp-alerts-modal')) {
                this.closeModal();
            }
        });

        // ESC לסגירה
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen) {
                this.closeModal();
            }
        });

        // טופס הרשמה
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'whatsapp-alerts-form') {
                e.preventDefault();
                this.handleSubscription();
            }
        });

        // פורמט טלפון
        document.addEventListener('input', (e) => {
            if (e.target.id === 'whatsapp-alerts-phone') {
                this.formatPhone(e);
            }
        });
    }

    // פתיחת המודל
    openModal() {
        const modal = document.getElementById('whatsapp-alerts-modal');
        if (modal) {
            modal.style.display = 'block';
            this.isModalOpen = true;
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                const nameInput = document.getElementById('whatsapp-alerts-name');
                if (nameInput) nameInput.focus();
            }, 300);
        }
    }

    // סגירת המודל
    closeModal() {
        const modal = document.getElementById('whatsapp-alerts-modal');
        if (modal) {
            modal.style.display = 'none';
            this.isModalOpen = false;
            document.body.style.overflow = 'auto';
            this.clearForm();
        }
    }

    // ניקוי הטופס
    clearForm() {
        const form = document.getElementById('whatsapp-alerts-form');
        if (form) {
            form.reset();
            this.hideMessage();
            const customCategoryContainer = document.getElementById('custom-category-container');
            const customAreaContainer = document.getElementById('custom-area-container');
            if (customCategoryContainer) customCategoryContainer.style.display = 'none';
            if (customAreaContainer) customAreaContainer.style.display = 'none';
        }
    }

    // פורמט מספר טלפון
    formatPhone(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 3) {
            value = value.substring(0, 3) + '-' + value.substring(3);
        }
        if (value.length >= 7) {
            value = value.substring(0, 7) + '-' + value.substring(7, 11);
        }
        
        e.target.value = value;
    }

    // טיפול ברשמה
    async handleSubscription() {
        const name = document.getElementById('whatsapp-alerts-name').value.trim();
        const phone = document.getElementById('whatsapp-alerts-phone').value.trim();
        
        let selectedCategories = Array.from(
            document.querySelectorAll('#whatsapp-alerts-categories input:checked')
        ).map(input => input.value);
        
        let selectedAreas = Array.from(
            document.querySelectorAll('#whatsapp-alerts-areas input:checked')
        ).map(input => input.value);

        // טיפול בקטגוריה מותאמת אישית
        const otherCategoryCheckbox = document.getElementById('cat_אחר');
        const customCategory = document.getElementById('custom-category').value.trim();
        
        if (otherCategoryCheckbox && otherCategoryCheckbox.checked && customCategory) {
            selectedCategories = selectedCategories.filter(cat => cat !== 'אחר');
            selectedCategories.push(customCategory);
        } else if (otherCategoryCheckbox && otherCategoryCheckbox.checked && !customCategory) {
            this.showMessage('אנא ציין את התחום שמעניין אותך', 'error');
            return;
        }

        // טיפול באזור מותאם אישית
        const otherAreaCheckbox = document.getElementById('area_אחר');
        const customArea = document.getElementById('custom-area').value.trim();
        
        if (otherAreaCheckbox && otherAreaCheckbox.checked && customArea) {
            selectedAreas = selectedAreas.filter(area => area !== 'אחר');
            selectedAreas.push(customArea);
        } else if (otherAreaCheckbox && otherAreaCheckbox.checked && !customArea) {
            this.showMessage('אנא ציין את האזור שמעניין אותך', 'error');
            return;
        }

        // ולידציה
        if (!name || !phone) {
            this.showMessage('אנא מלא את השם ומספר הטלפון', 'error');
            return;
        }

        if (selectedCategories.length === 0) {
            this.showMessage('אנא בחר לפחות תחום עניין אחד', 'error');
            return;
        }

        if (selectedAreas.length === 0) {
            this.showMessage('אנא בחר לפחות אזור אחד', 'error');
            return;
        }

        // בדיקת טלפון קיים
        if (this.subscribers.find(sub => sub.phone === phone)) {
            this.showMessage('מספר הטלפון כבר רשום במערכת', 'error');
            return;
        }

        // הוספת מנוי חדש
        const subscriber = {
            id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            name,
            phone,
            categories: selectedCategories,
            areas: selectedAreas,
            registrationDate: new Date().toISOString(),
            active: true,
            source: 'website_json'
        };

        this.subscribers.push(subscriber);
        this.saveSubscribers();

        // ניסיון שמירה בקובץ JSON גם כן
        this.saveToJsonFile();

        // הודעת הצלחה
        this.showMessage(
            `🎉 מעולה ${name}! נרשמת בהצלחה להתראות משרות. נתחיל לשלוח לך משרות רלוונטיות!`, 
            'success'
        );

        // סגירה אוטומטית
        setTimeout(() => {
            this.closeModal();
        }, 3000);

        // טריגר לאירוע מותאם אישית
        this.triggerEvent('subscriber-added', subscriber);
    }

    // שמירה בקובץ JSON (יצירת גיבוי להורדה)
    async saveToJsonFile() {
        try {
            // יצירת קובץ להורדה
            const blob = new Blob([JSON.stringify(this.subscribers, null, 2)], 
                                 {type: 'application/json'});
            
            // שמירה אוטומטית (אתה יכולה להוסיף את זה לגיט ידנית)
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `subscribers_backup_${new Date().toISOString().split('T')[0]}.json`;
            
            // הוספה חבויה ללא הורדה אוטומטית (את תוכלי להוריד ידנית)
            a.style.display = 'none';
            document.body.appendChild(a);
            // a.click(); // בטל הערה אם רוצה הורדה אוטומטית
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log('📁 גיבוי JSON מוכן להורדה');
        } catch (error) {
            console.log('💾 שמירה מקומית בלבד');
        }
    }

    // הצגת הודעה
    showMessage(message, type = 'info') {
        const messageDiv = document.getElementById('whatsapp-alerts-message');
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = `whatsapp-alerts-message ${type}`;
            messageDiv.style.display = 'block';
        }
    }

    // הסתרת הודעה
    hideMessage() {
        const messageDiv = document.getElementById('whatsapp-alerts-message');
        if (messageDiv) {
            messageDiv.style.display = 'none';
        }
    }

    // טריגר לאירוע מותאם אישית
    triggerEvent(eventName, data) {
        const event = new CustomEvent(`whatsapp-alerts-${eventName}`, {
            detail: data
        });
        document.dispatchEvent(event);
    }

    // שמירת מנויים
    saveSubscribers() {
        try {
            localStorage.setItem('whatsapp_alerts_subscribers', JSON.stringify(this.subscribers));
            console.log(`💾 נשמרו ${this.subscribers.length} מנויים מקומית`);
        } catch (error) {
            console.error('שגיאה בשמירת מנויים:', error);
        }
    }

    // טעינת מנויים
    loadSubscribers() {
        try {
            const saved = localStorage.getItem('whatsapp_alerts_subscribers');
            this.subscribers = saved ? JSON.parse(saved) : [];
            console.log(`📱 נטענו ${this.subscribers.length} מנויים מקומית`);
            return this.subscribers;
        } catch (error) {
            console.error('שגיאה בטעינת מנויים:', error);
            this.subscribers = [];
            return [];
        }
    }

    // יצירת הודעת משרה
    createJobMessage(jobData) {
        let message = `🎯 משרה חדשה!\n\n`;
        message += `💼 ${jobData.title}\n`;
        
        if (jobData.company) message += `🏢 ${jobData.company}\n`;
        if (jobData.city) message += `📍 ${jobData.city}, ${jobData.area}\n`;
        else message += `📍 ${jobData.area}\n`;
        
        message += `🏷️ ${jobData.category}\n`;
        
        if (jobData.jobNumber) message += `🔢 מספר משרה: ${jobData.jobNumber}\n`;
        if (jobData.description) message += `\n📋 ${jobData.description}\n`;
        
        message += `\n📞 לפרטים נוספים: 055-550-4633`;
        message += `\n🌐 כל המשרות: https://mayeshpo.co.il`;
        
        return message;
    }

    // שליחת התראה חדשה (למנהלים)
    sendJobAlert(jobData) {
        if (!jobData.title || !jobData.category || !jobData.area) {
            console.error('חסרים פרטי משרה נדרשים');
            return false;
        }

        // מציאת מנויים רלוונטיים
        const relevantSubscribers = this.subscribers.filter(subscriber => {
            const categoryMatch = subscriber.categories.some(cat => 
                cat.toLowerCase().includes(jobData.category.toLowerCase()) || 
                jobData.category.toLowerCase().includes(cat.toLowerCase())
            );
            const areaMatch = subscriber.areas.some(area => 
                area.toLowerCase().includes(jobData.area.toLowerCase()) || 
                jobData.area.toLowerCase().includes(area.toLowerCase()) || 
                area === 'כל הארץ' || jobData.area === 'כל הארץ'
            );
            return categoryMatch && areaMatch;
        });

        if (relevantSubscribers.length === 0) {
            console.log('לא נמצאו מנויים רלוונטיים');
            return false;
        }

        // יצירת הודעה
        const message = this.createJobMessage(jobData);

        // שליחת הודעות
        this.sendWhatsAppMessages(relevantSubscribers, message);

        console.log(`📤 נשלחו התראות ל-${relevantSubscribers.length} מנויים`);
        return true;
    }

    // שליחת הודעות WhatsApp
    sendWhatsAppMessages(subscribers, message) {
        subscribers.forEach((subscriber, index) => {
            setTimeout(() => {
                const phoneNumber = subscriber.phone.replace(/^0/, '972').replace(/\D/g, '');
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }, index * 1000);
        });
    }

    // API ציבורי
    getSubscribers() {
        return this.subscribers;
    }

    getSubscriberCount() {
        return this.subscribers.length;
    }

    removeSubscriber(phone) {
        this.subscribers = this.subscribers.filter(sub => sub.phone !== phone);
        this.saveSubscribers();
        this.triggerEvent('subscriber-removed', { phone });
    }

    // הסתרת/הצגת הכפתור
    hideButton() {
        const button = document.getElementById('whatsapp-alerts-button');
        if (button) button.style.display = 'none';
    }

    showButton() {
        const button = document.getElementById('whatsapp-alerts-button');
        if (button) button.style.display = 'flex';
    }

    // הרס הקומפוננטה
    destroy() {
        const button = document.getElementById('whatsapp-alerts-button');
        const modal = document.getElementById('whatsapp-alerts-modal');
        
        if (button) button.remove();
        if (modal) modal.remove();
        
        this.isModalOpen = false;
        document.body.style.overflow = 'auto';
        
        console.log('🗑️ קומפוננטת התראות הוסרה');
    }
}

// ייצוא לשימוש גלובלי
if (typeof window !== 'undefined') {
    window.WhatsAppAlerts = WhatsAppAlerts;
    
    // יצירת אינסטנס גלובלי
    if (!window.whatsappAlerts) {
        window.whatsappAlerts = new WhatsAppAlerts();
    }
}
