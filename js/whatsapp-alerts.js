/**
 * קומפוננטת התראות WhatsApp - מעודכן עם קטגוריות דינמיות
 * @author מה יש פה?
 * @version 2.0.0
 */

class WhatsAppAlerts {
    constructor(options = {}) {
        this.options = {
            buttonText: 'התראות משרות',
            position: 'bottom-left', // bottom-left, bottom-right, top-left, top-right
            autoShow: true,
            categories: [
                'פיתוח ותוכנה', 'מכירות ושיווק', 'חינוך והוראה',
                'מזון ומסעדנות', 'בריאות ורפואה', 'בנייה והנדסה',
                'עיצוב ויצירה', 'אבטחה ושמירה', 'ניהול וכספים',
                'שירות לקוחות', 'משאבי אנוש', 'מדע הנדסה מחקר ופיתוח',
                'פיננסים וכלכלה', 'סחר וקמעונאות', 'אחר'
            ],
            areas: [
                'מרכז', 'צפון', 'דרום', 'ירושלים והסביבה',
                'חיפה קריות והצפון', 'שרון', 'שפלה', 'גליל',
                'נגב', 'כל הארץ', 'עבודה מהבית', 'אחר'
            ],
            ...options
        };

        this.subscribers = this.loadSubscribers();
        this.isModalOpen = false;
        
        if (this.options.autoShow) {
            this.init();
        }
    }

    // אתחול הקומפוננטה
    init() {
        this.createButton();
        this.createModal();
        this.attachEvents();
        console.log('✅ קומפוננטת התראות WhatsApp אותחלה בהצלחה');
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
        
        if (category === 'אחר' && otherCheckbox.checked) {
            customContainer.style.display = 'block';
            document.getElementById('custom-category').focus();
        } else if (category === 'אחר' && !otherCheckbox.checked) {
            customContainer.style.display = 'none';
            document.getElementById('custom-category').value = '';
        }
    }

    // טיפול בשינוי אזור
    handleAreaChange(area) {
        const customContainer = document.getElementById('custom-area-container');
        const otherCheckbox = document.getElementById('area_אחר');
        
        if (area === 'אחר' && otherCheckbox.checked) {
            customContainer.style.display = 'block';
            document.getElementById('custom-area').focus();
        } else if (area === 'אחר' && !otherCheckbox.checked) {
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
            
            // פוקוס על השדה הראשון
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
            // הסתרת שדות מותאמים אישית
            document.getElementById('custom-category-container').style.display = 'none';
            document.getElementById('custom-area-container').style.display = 'none';
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
    handleSubscription() {
        const name = document.getElementById('whatsapp-alerts-name').value.trim();
        const phone = document.getElementById('whatsapp-alerts-phone').value.trim();
        
        let selectedCategories = Array.from(
            document.querySelectorAll('#whatsapp-alerts-categories input:checked')
        ).map(input => input.value);
        
        let selectedAreas = Array.from(
            document.querySelectorAll('#whatsapp-alerts-areas input:checked')
        ).map(input => input.value);

        // טיפול בקטגוריה מותאמת אישית
        const otherCategoryChecked = document.getElementById('cat_אחר')?.checked;
        const customCategory = document.getElementById('custom-category').value.trim();
        
        if (otherCategoryChecked && customCategory) {
            // החלף "אחר" בקטגוריה המותאמת אישית
            selectedCategories = selectedCategories.filter(cat => cat !== 'אחר');
            selectedCategories.push(customCategory);
        } else if (otherCategoryChecked && !customCategory) {
            this.showMessage('אנא ציין את התחום שמעניין אותך', 'error');
            return;
        }

        // טיפול באזור מותאם אישית
        const otherAreaChecked = document.getElementById('area_אחר')?.checked;
        const customArea = document.getElementById('custom-area').value.trim();
        
        if (otherAreaChecked && customArea) {
            // החלף "אחר" באזור המותאם אישית
            selectedAreas = selectedAreas.filter(area => area !== 'אחר');
            selectedAreas.push(customArea);
        } else if (otherAreaChecked && !customArea) {
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
            id: Date.now(),
            name,
            phone,
            categories: selectedCategories,
            areas: selectedAreas,
            createdAt: new Date().toISOString(),
            source: 'website'
        };

        this.subscribers.push(subscriber);
        this.saveSubscribers();

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
            console.log(`💾 נשמרו ${this.subscribers.length} מנויים`);
        } catch (error) {
            console.error('שגיאה בשמירת מנויים:', error);
        }
    }

    // טעינת מנויים
    loadSubscribers() {
        try {
            const saved = localStorage.getItem('whatsapp_alerts_subscribers');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('שגיאה בטעינת מנויים:', error);
            return [];
        }
    }

    // שליחת התראה חדשה (למנהלים)
    sendJobAlert(jobData) {
        if (!jobData.title || !jobData.category || !jobData.area) {
            console.error('חסרים פרטי משרה נדרשים');
            return false;
        }

        // מציאת מנויים רלוונטיים (כולל התאמות חלקיות)
        const relevantSubscribers = this.subscribers.filter(subscriber => {
            const categoryMatch = subscriber.categories.some(cat => 
                cat.includes(jobData.category) || jobData.category.includes(cat)
            );
            const areaMatch = subscriber.areas.some(area => 
                area.includes(jobData.area) || jobData.area.includes(area) || 
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

    // שליחת הודעות WhatsApp
    sendWhatsAppMessages(subscribers, message) {
        subscribers.forEach((subscriber, index) => {
            setTimeout(() => {
                const phoneNumber = subscriber.phone.replace(/^0/, '972').replace(/\D/g, '');
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }, index * 1000); // השהיה של שנייה בין כל הודעה
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
}
