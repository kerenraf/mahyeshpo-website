/**
 * מערכת התראות חכמה למשרות - JavaScript מלא
 * גרסה: 1.0
 * תאריך: 2025
 */

class SmartAlertsSystem {
    constructor() {
        this.currentStep = 1;
        this.userData = {
            firstName: '',
            whatsappNumber: '',
            categories: [],
            areas: [],
            alertTime: '08:00',
            alertFrequency: '3',
            suggestions: []
        };
        
        this.subscribers = this.loadSubscribers();
        this.dailyAlerts = 156;
        this.successRate = 89;
        
        this.initializeSystem();
    }

    initializeSystem() {
        console.log('🔔 מערכת התראות חכמה הופעלה');
        this.updateStats();
        this.startRealTimeUpdates();
        this.createModalHTML();
    }

    // יצירת HTML של המודל דינמית
    createModalHTML() {
        if (document.getElementById('alertsModal')) return;

        const modalHTML = `
        <div class="alerts-modal" id="alertsModal">
            <div class="alerts-modal-content">
                <button class="close-alerts" onclick="alertsSystem.closeAlertsModal()">✕</button>
                
                <div class="alerts-header">
                    <h2 class="alerts-title"><i class="fas fa-bell"></i> התראות חכמות</h2>
                    <p class="alerts-subtitle">מילוי הטופס לוקח 30 שניות בלבד</p>
                    <div class="step-indicator">
                        <div class="step-dot active" id="dot1"></div>
                        <div class="step-dot" id="dot2"></div>
                        <div class="step-dot" id="dot3"></div>
                        <div class="step-dot" id="dot4"></div>
                    </div>
                </div>

                <!-- שלב 1: פרטים אישיים -->
                <div class="step active" id="step1">
                    <h3 class="step-title">📝 בואו נכיר</h3>
                    <div class="form-group">
                        <label class="form-label">שם פרטי</label>
                        <input type="text" class="form-control" id="firstName" placeholder="איך קוראים לך?">
                    </div>
                    <div class="form-group">
                        <label class="form-label">מספר וואטסאפ</label>
                        <input type="tel" class="form-control" id="whatsappNumber" placeholder="050-1234567">
                    </div>
                    <button class="btn" onclick="alertsSystem.nextStep(2)">המשך <i class="fas fa-arrow-left"></i></button>
                </div>

                <!-- שלב 2: תחומי עניין -->
                <div class="step" id="step2">
                    <h3 class="step-title">💼 באיזה תחומים אתה מעוניין?</h3>
                    <p class="step-subtitle">בחר עד 3 תחומים (מומלץ)</p>
                    <div class="categories-grid" id="categoriesGrid">
                        ${this.getCategoriesHTML()}
                    </div>
                    <div class="step-buttons">
                        <button class="btn btn-secondary" onclick="alertsSystem.prevStep(1)"><i class="fas fa-arrow-right"></i> חזור</button>
                        <button class="btn" onclick="alertsSystem.nextStep(3)" id="categoriesNext" disabled>המשך <i class="fas fa-arrow-left"></i></button>
                    </div>
                </div>

                <!-- שלב 3: אזורים -->
                <div class="step" id="step3">
                    <h3 class="step-title">📍 באיזה אזורים אתה מעוניין לעבוד?</h3>
                    <p class="step-subtitle">בחר עד 5 אזורים</p>
                    <div class="areas-grid" id="areasGrid">
                        ${this.getAreasHTML()}
                    </div>
                    <div class="step-buttons">
                        <button class="btn btn-secondary" onclick="alertsSystem.prevStep(2)"><i class="fas fa-arrow-right"></i> חזור</button>
                        <button class="btn" onclick="alertsSystem.nextStep(4)" id="areasNext" disabled>המשך <i class="fas fa-arrow-left"></i></button>
                    </div>
                </div>

                <!-- שלב 4: הגדרות -->
                <div class="step" id="step4">
                    <h3 class="step-title">⚙️ הגדרות נוספות</h3>
                    
                    <div class="form-group">
                        <label class="form-label">באיזה שעה תרצה לקבל התראות?</label>
                        <select class="form-control" id="alertTime">
                            <option value="08:00">08:00 - התחלת יום עבודה</option>
                            <option value="12:00">12:00 - הפסקת צהריים</option>
                            <option value="18:00">18:00 - סוף יום עבודה</option>
                            <option value="20:00">20:00 - ערב</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">כמה משרות ביום?</label>
                        <select class="form-control" id="alertFrequency">
                            <option value="3">3 משרות (מומלץ)</option>
                            <option value="5">5 משרות</option>
                            <option value="10">10 משרות</option>
                        </select>
                    </div>

                    <div class="smart-suggestions">
                        <h4 class="suggestions-title">💡 הצעות חכמות</h4>
                        <div class="suggestion-item" onclick="alertsSystem.applySuggestion('טירון')">
                            <i class="fas fa-star"></i> משרות מתאימות לטירונים
                        </div>
                        <div class="suggestion-item" onclick="alertsSystem.applySuggestion('חלקית')">
                            <i class="fas fa-clock"></i> משרות חלקיות בלבד
                        </div>
                        <div class="suggestion-item" onclick="alertsSystem.applySuggestion('מיידי')">
                            <i class="fas fa-bolt"></i> משרות לכניסה מיידית
                        </div>
                    </div>

                    <div class="step-buttons">
                        <button class="btn btn-secondary" onclick="alertsSystem.prevStep(3)"><i class="fas fa-arrow-right"></i> חזור</button>
                        <button class="btn" onclick="alertsSystem.completeRegistration()">
                            <i class="fas fa-check"></i> הפעל התראות!
                        </button>
                    </div>
                </div>

                <!-- הודעת הצלחה -->
                <div class="step" id="stepSuccess">
                    <div class="success-message">
                        <div class="success-icon">🎉</div>
                        <h3>ההתראות מופעלות!</h3>
                        <p class="success-text">
                            היי <span id="successName"></span>! 👋<br>
                            מחר בשעה <span id="successTime"></span> תקבל/י את ההתראה הראשונה שלך.
                        </p>
                        <div class="success-details">
                            <strong>מה הלאה?</strong><br>
                            • נשלח לך הודעת אישור בקרוב<br>
                            • תקבל/י משרות מותאמות יומית<br>
                            • תוכל/י לבטל או לשנות הגדרות בכל עת
                        </div>
                        
                        <div class="success-buttons">
                            <button class="btn" onclick="alertsSystem.sendToWhatsApp()">
                                <i class="fab fa-whatsapp"></i> שלח פרטים לוואטסאפ
                            </button>
                            <button class="btn btn-secondary" onclick="alertsSystem.closeAlertsModal()">
                                <i class="fas fa-check"></i> סיום
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    getCategoriesHTML() {
        const categories = [
            { value: 'פיתוח ותוכנה', icon: '💻' },
            { value: 'מכירות ושיווק', icon: '📈' },
            { value: 'חינוך והוראה', icon: '📚' },
            { value: 'מזון ומסעדנות', icon: '🍽️' },
            { value: 'בריאות ורפואה', icon: '🏥' },
            { value: 'שירות לקוחות', icon: '📞' },
            { value: 'הנדסה', icon: '⚙️' },
            { value: 'עיצוב', icon: '🎨' }
        ];

        return categories.map(cat => 
            `<div class="category-btn" onclick="alertsSystem.toggleCategory(this, '${cat.value}')">
                ${cat.icon} ${cat.value}
            </div>`
        ).join('');
    }

    getAreasHTML() {
        const areas = [
            'תל אביב', 'ירושלים', 'חיפה', 'באר שבע',
            'פתח תקווה', 'ראשון לציון', 'אשדוד', 'נתניה',
            'מרכז', 'צפון', 'דרום', 'עבודה מהבית'
        ];

        return areas.map(area => 
            `<div class="area-btn" onclick="alertsSystem.toggleArea(this, '${area}')">
                ${area}
            </div>`
        ).join('');
    }

    // ניהול שלבים
    nextStep(step) {
        if (!this.validateCurrentStep()) return;

        this.currentStep = step;
        this.showStep(step);
        this.updateStepIndicator();
    }

    prevStep(step) {
        this.currentStep = step;
        this.showStep(step);
        this.updateStepIndicator();
    }

    showStep(stepNumber) {
        document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
        const currentStep = document.getElementById(`step${stepNumber}`);
        if (currentStep) currentStep.classList.add('active');
    }

    updateStepIndicator() {
        for (let i = 1; i <= 4; i++) {
            const dot = document.getElementById(`dot${i}`);
            if (dot) {
                dot.classList.toggle('active', i <= this.currentStep);
            }
        }
    }

    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                const firstName = document.getElementById('firstName')?.value?.trim();
                const phone = document.getElementById('whatsappNumber')?.value?.trim();
                
                if (!firstName) {
                    this.showNotification('אנא הזן שם פרטי', 'error');
                    return false;
                }
                
                if (!phone || !this.validatePhoneNumber(phone)) {
                    this.showNotification('אנא הזן מספר וואטסאפ תקין', 'error');
                    return false;
                }
                
                this.userData.firstName = firstName;
                this.userData.whatsappNumber = phone;
                return true;

            case 2:
                if (this.userData.categories.length === 0) {
                    this.showNotification('אנא בחר לפחות תחום אחד', 'error');
                    return false;
                }
                return true;

            case 3:
                if (this.userData.areas.length === 0) {
                    this.showNotification('אנא בחר לפחות אזור אחד', 'error');
                    return false;
                }
                return true;

            default:
                return true;
        }
    }

    validatePhoneNumber(phone) {
        const cleanPhone = phone.replace(/[\s-]/g, '');
        const israeliPhoneRegex = /^((\+972|972|0)([23489]|5[02468]|77)[0-9]{7})$/;
        return israeliPhoneRegex.test(cleanPhone);
    }

    // ניהול קטגוריות ואזורים
    toggleCategory(element, category) {
        const isSelected = element.classList.contains('selected');
        
        if (isSelected) {
            element.classList.remove('selected');
            this.userData.categories = this.userData.categories.filter(c => c !== category);
        } else {
            if (this.userData.categories.length >= 3) {
                this.showNotification('ניתן לבחור עד 3 תחומים בלבד', 'warning');
                return;
            }
            element.classList.add('selected');
            this.userData.categories.push(category);
        }

        const nextBtn = document.getElementById('categoriesNext');
        if (nextBtn) nextBtn.disabled = this.userData.categories.length === 0;
    }

    toggleArea(element, area) {
        const isSelected = element.classList.contains('selected');
        
        if (isSelected) {
            element.classList.remove('selected');
            this.userData.areas = this.userData.areas.filter(a => a !== area);
        } else {
            if (this.userData.areas.length >= 5) {
                this.showNotification('ניתן לבחור עד 5 אזורים בלבד', 'warning');
                return;
            }
            element.classList.add('selected');
            this.userData.areas.push(area);
        }

        const nextBtn = document.getElementById('areasNext');
        if (nextBtn) nextBtn.disabled = this.userData.areas.length === 0;
    }

    applySuggestion(suggestionType) {
        if (!this.userData.suggestions.includes(suggestionType)) {
            this.userData.suggestions.push(suggestionType);
            this.showNotification(`נוסף: ${this.getSuggestionText(suggestionType)}`, 'success');
        }
    }

    getSuggestionText(suggestionType) {
        const texts = {
            'טירון': 'משרות מתאימות לטירונים',
            'חלקית': 'משרות חלקיות בלבד',
            'מיידי': 'משרות לכניסה מיידית'
        };
        return texts[suggestionType] || suggestionType;
    }

    // השלמת הרשמה
    async completeRegistration() {
        try {
            this.userData.alertTime = document.getElementById('alertTime')?.value || '08:00';
            this.userData.alertFrequency = document.getElementById('alertFrequency')?.value || '3';

            this.showLoadingState();
            await this.saveUserData();
            this.showSuccessStep();
            this.updateStatsAfterRegistration();

        } catch (error) {
            console.error('❌ שגיאה בהרשמה:', error);
            this.showNotification('אירעה שגיאה, אנא נסה שוב', 'error');
        }
    }

    showLoadingState() {
        const step4 = document.getElementById('step4');
        if (step4) {
            step4.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner">⏳</div>
                    <h3>מכין את ההתראות שלך...</h3>
                    <p>זה לוקח רק כמה שניות</p>
                </div>
            `;
        }
    }

    async saveUserData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.subscribers.push({
                    id: Date.now(),
                    ...this.userData,
                    createdAt: new Date().toISOString(),
                    status: 'active',
                    totalAlerts: 0
                });
                
                this.saveSubscribers();
                resolve();
            }, 2000);
        });
    }

    showSuccessStep() {
        this.showStep('Success');
        
        const successName = document.getElementById('successName');
        const successTime = document.getElementById('successTime');
        
        if (successName) successName.textContent = this.userData.firstName;
        if (successTime) successTime.textContent = this.userData.alertTime;

        this.startCelebrationAnimation();
    }

    startCelebrationAnimation() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => this.createConfetti(), i * 100);
        }
    }

    createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            top: -10px;
            left: ${Math.random() * 100}%;
            width: 8px;
            height: 8px;
            background: ${['#F69898', '#FFD700', '#00FF00', '#FF69B4'][Math.floor(Math.random() * 4)]};
            z-index: 10000;
            animation: confettiFall 3s linear forwards;
            border-radius: 50%;
        `;
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }

    // ניהול מנויים
    loadSubscribers() {
        const saved = localStorage.getItem('alertsSubscribers');
        return saved ? JSON.parse(saved) : [];
    }

    saveSubscribers() {
        localStorage.setItem('alertsSubscribers', JSON.stringify(this.subscribers));
    }

    updateStatsAfterRegistration() {
        this.updateStats();
        this.showNotification('הצטרפת בהצלחה למערכת ההתראות!', 'success');
    }

    updateStats() {
        const stats = {
            subscribers: this.subscribers.length + 2847,
            dailyAlerts: this.dailyAlerts,
            successRate: this.successRate
        };

        // עדכון בממשק אם קיים
        const statElements = document.querySelectorAll('.stat-number');
        if (statElements.length >= 3) {
            statElements[0].textContent = stats.subscribers.toLocaleString();
            statElements[1].textContent = stats.dailyAlerts;
            statElements[2].textContent = stats.successRate + '%';
        }
    }

    startRealTimeUpdates() {
        setInterval(() => {
            this.dailyAlerts += Math.floor(Math.random() * 3);
            this.updateStats();
        }, 30000);

        setInterval(() => {
            if (Math.random() > 0.7) {
                this.simulateNewSubscriber();
            }
        }, 15000);
    }

    simulateNewSubscriber() {
        const names = ['דוד', 'שרה', 'מיכל', 'יוסי', 'רונית', 'עמית'];
        const cities = ['תל אביב', 'ירושלים', 'חיפה', 'באר שבע'];
        
        const name = names[Math.floor(Math.random() * names.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        
        this.showFloatingNotification(`${name} מ${city} הצטרף/ה להתראות! 🎉`);
    }

    // התראות ומסרים
    showNotification(message, type = 'info') {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };

        const notification = document.createElement('div');
        notification.className = 'alert-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 5000;
            font-weight: bold;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            max-width: 300px;
            font-size: 14px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
    }

    showFloatingNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'floating-notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 200px;
            right: 20px;
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 12px 18px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 3000;
            animation: slideInRight 0.5s ease, fadeOut 0.3s ease 3.7s forwards;
            font-size: 13px;
            max-width: 250px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 4000);
    }

    // ממשק משתמש
    openAlertsModal() {
        const modal = document.getElementById('alertsModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            this.currentStep = 1;
            this.showStep(1);
            this.updateStepIndicator();
            this.resetUserData();
        }
    }

    closeAlertsModal() {
        const modal = document.getElementById('alertsModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    resetUserData() {
        this.userData = {
            firstName: '',
            whatsappNumber: '',
            categories: [],
            areas: [],
            alertTime: '08:00',
            alertFrequency: '3',
            suggestions: []
        };

        // ניקוי טפסים
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => input.value = '');

        // ניקוי בחירות
        const selected = document.querySelectorAll('.selected');
        selected.forEach(el => el.classList.remove('selected'));

        // עדכון כפתורים
        const nextBtns = document.querySelectorAll('#categoriesNext, #areasNext');
        nextBtns.forEach(btn => btn.disabled = true);
    }

    generateWhatsAppMessage() {
        const categories = this.userData.categories.join(', ');
        const areas = this.userData.areas.join(', ');
        
        return `שלום! אני ${this.userData.firstName} ואני מעוניין/ת לקבל התראות למשרות.

פרטי:
🎯 תחומי עניין: ${categories}
📍 אזורים: ${areas}
⏰ שעה מועדפת: ${this.userData.alertTime}
📱 וואטסאפ: ${this.userData.whatsappNumber}

תודה!`;
    }

    async sendToWhatsApp() {
        const message = this.generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/972555504633?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}

// אתחול המערכת
let alertsSystem;

document.addEventListener('DOMContentLoaded', function() {
    alertsSystem = new SmartAlertsSystem();
    
    // הוספת סטיילים דינמיים
    addDynamicStyles();
    addEventListeners();
    
    console.log('🚀 מערכת התראות חכמה הופעלה במלואה!');
});

// פונקציות גלובליות
function openAlertsModal() {
    if (alertsSystem) alertsSystem.openAlertsModal();
}

function closeAlertsModal() {
    if (alertsSystem) alertsSystem.closeAlertsModal();
}

// סטיילים דינמיים
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        .loading-state {
            text-align: center;
            padding: 40px;
            color: white;
        }
        
        .loading-spinner {
            font-size: 3rem;
            margin-bottom: 20px;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// מאזיני אירועים
function addEventListeners() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('alerts-modal')) {
            if (alertsSystem) alertsSystem.closeAlertsModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('alertsModal');
            if (modal && modal.style.display === 'block') {
                if (alertsSystem) alertsSystem.closeAlertsModal();
            }
        }
    });
    
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const activeStep = document.querySelector('.step.active');
            if (activeStep) {
                const nextBtn = activeStep.querySelector('.btn:not(.btn-secondary)');
                if (nextBtn && !nextBtn.disabled) {
                    nextBtn.click();
                }
            }
        }
    });
}
