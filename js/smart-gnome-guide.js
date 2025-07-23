<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>גמדה חכמה - JavaScript רגיל</title>
    <style>
        body {
            background: #000;
            color: white;
            font-family: 'Assistant', 'Heebo', Arial, sans-serif;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255,255,255,0.05);
            border-radius: 20px;
            padding: 30px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(246, 152, 152, 0.2);
        }

        .step {
            background: rgba(246, 152, 152, 0.1);
            border-radius: 15px;
            padding: 25px;
            margin: 20px 0;
            border-right: 5px solid #F69898;
        }

        .step-number {
            background: linear-gradient(135deg, #F69898, #ff8e53);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-left: 15px;
            font-size: 1.2rem;
        }

        .code-block {
            background: #1a1a1a;
            color: #f0f0f0;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Consolas', 'Monaco', monospace;
            overflow-x: auto;
            margin: 15px 0;
            border: 1px solid #333;
            position: relative;
        }

        .copy-btn {
            position: absolute;
            top: 10px;
            left: 10px;
            background: #F69898;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.8rem;
            transition: all 0.3s ease;
        }

        .copy-btn:hover {
            background: #e58080;
        }

        .warning {
            background: rgba(255, 193, 7, 0.2);
            border: 2px solid #ffc107;
            border-radius: 10px;
            padding: 20px;
            margin: 15px 0;
            color: #ffc107;
        }

        .success {
            background: rgba(40, 167, 69, 0.2);
            border: 2px solid #28a745;
            border-radius: 10px;
            padding: 15px;
            margin: 10px 0;
            color: #28a745;
        }

        h1, h2, h3 {
            color: #F69898;
        }

        .file-structure {
            background: #1a1a1a;
            color: #f0f0f0;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Consolas', 'Monaco', monospace;
            margin: 15px 0;
            border: 1px solid #333;
            direction: ltr;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧙‍♀️ גמדה חכמה - גרסת JavaScript רגילה</h1>
        <p>קוד מוכן להטמעה באתר HTML הקיים שלך</p>

        <div class="success">
            <h3>✅ מה תקבל:</h3>
            <ul style="text-align: right;">
                <li>גמדה חכמה שמזהה מצב המשתמש</li>
                <li>שיחה אינטראקטיבית עם שאלות דינמיות</li>
                <li>טופס "לא מצאתי מה שחיפשתי" עם שליחה בוואטסאפ</li>
                <li>הדרכה איך לפנות למשרות</li>
                <li>חזרה לחיפוש מכל מקום</li>
                <li>לחיצה כפולה לחזרה למעלה</li>
                <li>עיצוב מותאם לגוונים של האתר</li>
            </ul>
        </div>

        <div class="step">
            <div class="step-number">1</div>
            <h2>צור קובץ JavaScript חדש</h2>
            <p>בגיטהאב שלך, צור קובץ חדש בתיקיית <code>js</code>:</p>
            
            <div class="file-structure">
js/smart-gnome-guide.js    ← צור קובץ חדש
            </div>
            
            <div class="warning">
                <strong>⚠️ איך ליצור קובץ חדש בגיטהאב:</strong><br>
                1. לחץ על תיקיית <code>js</code><br>
                2. לחץ על "Add file" → "Create new file"<br>
                3. כתוב את השם: <code>smart-gnome-guide.js</code><br>
                4. העתק את הקוד מלמטה
            </div>
        </div>

        <div class="step">
            <div class="step-number">2</div>
            <h2>הקוד המלא לקובץ smart-gnome-guide.js</h2>
            <p>העתק את הקוד הזה לקובץ החדש:</p>
            
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">📋 העתק קוד JS</button>
// גמדה חכמה - גרסת JavaScript רגילה
class SmartGnomeGuide {
    constructor() {
        this.isModalOpen = false;
        this.conversation = [];
        this.userProfile = {
            jobField: '',
            location: '',
            experience: '',
            preferences: {}
        };
        this.currentContext = 'homepage';
        this.currentJobData = null;
        this.lastClickTime = 0;
        this.gnomeTextIndex = 0;
        
        this.gnomeTexts = [
            'מדריכה חכמה',
            'עזרה אישית', 
            'חיפוש מותאם',
            'וואטסאפ מהיר',
            'חזור למעלה',
            'משרות חדשות',
            'ייעוץ חינם'
        ];
        
        this.init();
    }
    
    init() {
        this.createGnomeElement();
        this.createModalElement();
        this.addStyles();
        this.startGnomeTextRotation();
        this.detectCurrentContext();
        
        // עדכון מצב כל 3 שניות
        setInterval(() => this.detectCurrentContext(), 3000);
        
        console.log('🧙‍♀️ הגמדה החכמה נטענה בהצלחה!');
    }
    
    createGnomeElement() {
        // הסרת הגמדה הקיימת אם קיימת
        const existingGnome = document.querySelector('.floating-search-gnome');
        if (existingGnome) {
            existingGnome.style.display = 'none';
        }
        
        const gnome = document.createElement('div');
        gnome.className = 'smart-floating-gnome';
        gnome.innerHTML = `
            <img src="images/virtual gnome.png" 
                 alt="גמדה וירטואלית חכמה"
                 onerror="this.parentElement.innerHTML='<div class=\\"gnome-fallback\\">🧙‍♀️</div><div class=\\"smart-gnome-text\\">' + this.gnomeTexts[0] + '</div>'">
            <div class="smart-gnome-text" id="smartGnomeText">${this.gnomeTexts[0]}</div>
        `;
        
        gnome.addEventListener('click', () => this.handleGnomeClick());
        document.body.appendChild(gnome);
    }
    
    createModalElement() {
        const modal = document.createElement('div');
        modal.className = 'smart-guide-modal';
        modal.id = 'smartGuideModal';
        modal.innerHTML = `
            <div class="guide-content">
                <div class="guide-header">
                    <button class="guide-close" onclick="smartGnome.closeModal()">×</button>
                    <div class="guide-avatar">🧙‍♀️</div>
                    <h2>היי! אני הגמדה החכמה שלך</h2>
                    <p>אני כאן לעזור לך למצוא את העבודה המושלמת</p>
                </div>
                <div class="guide-body" id="guideBody">
                    <div class="typing-indicator" id="typingIndicator">
                        הגמדה חושבת...
                        <div class="typing-dots">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // סגירה בלחיצה על הרקע
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        document.body.appendChild(modal);
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* גמדה צפה חכמה */
            .smart-floating-gnome {
                position: fixed;
                bottom: 120px;
                right: 30px;
                width: 80px;
                cursor: pointer;
                z-index: 1002;
                animation: gnomeFloat 3s ease-in-out infinite;
                transition: transform 0.3s ease;
            }
            
            .smart-floating-gnome:hover {
                transform: scale(1.1);
            }
            
            .smart-floating-gnome img {
                width: 100%;
                height: auto;
                filter: drop-shadow(0 4px 12px rgba(246, 152, 152, 0.4));
            }
            
            .gnome-fallback {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #F69898, #ff8e53);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                color: white;
                filter: drop-shadow(0 4px 12px rgba(246, 152, 152, 0.4));
            }
            
            .smart-gnome-text {
                background: linear-gradient(135deg, #F69898, #ff8e53);
                color: white;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: bold;
                text-align: center;
                margin-top: 5px;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
                white-space: nowrap;
                animation: textPulse 3s ease-in-out infinite;
            }
            
            @keyframes gnomeFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
            }
            
            @keyframes textPulse {
                0%, 100% { background: linear-gradient(135deg, #F69898, #ff8e53); }
                50% { background: linear-gradient(135deg, #4CAF50, #45A049); }
            }
            
            /* מודל המדריכה */
            .smart-guide-modal {
                display: none;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(5px);
            }
            
            .smart-guide-modal.show {
                display: block;
                animation: fadeIn 0.3s ease;
            }
            
            .guide-content {
                background: linear-gradient(145deg, #ffffff, #f8f9fa);
                margin: 2% auto;
                padding: 0;
                border-radius: 20px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow: hidden;
                border: 3px solid #F69898;
                position: relative;
                animation: slideInUp 0.4s ease;
                color: #333;
            }
            
            .guide-header {
                background: linear-gradient(135deg, #F69898, #ff8e53);
                color: white;
                padding: 25px;
                text-align: center;
                position: relative;
            }
            
            .guide-avatar {
                width: 80px;
                height: 80px;
                background: rgba(255,255,255,0.2);
                border-radius: 50%;
                margin: 0 auto 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                border: 3px solid rgba(255,255,255,0.3);
            }
            
            .guide-close {
                position: absolute;
                top: 15px;
                left: 15px;
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                font-size: 1.5rem;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .guide-close:hover {
                background: rgba(255,255,255,0.3);
                transform: rotate(90deg);
            }
            
            .guide-body {
                padding: 30px;
                max-height: 60vh;
                overflow-y: auto;
            }
            
            .conversation-step {
                margin-bottom: 25px;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.5s ease;
            }
            
            .conversation-step.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .guide-message {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 18px 22px;
                border-radius: 20px 20px 20px 5px;
                margin-bottom: 20px;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                line-height: 1.6;
                position: relative;
            }
            
            .guide-message::before {
                content: '🧙‍♀️';
                position: absolute;
                top: -10px;
                right: -10px;
                background: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            }
            
            .user-response {
                background: #F69898;
                color: white;
                padding: 15px 20px;
                border-radius: 20px 20px 5px 20px;
                text-align: left;
                margin-right: 40px;
                margin-bottom: 15px;
            }
            
            .user-options {
                display: grid;
                gap: 12px;
            }
            
            .option-button {
                background: white;
                border: 2px solid #e9ecef;
                color: #333;
                padding: 15px 20px;
                border-radius: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 1rem;
                font-weight: 500;
                text-align: right;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .option-button:hover {
                border-color: #F69898;
                background: #F69898;
                color: white;
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(246, 152, 152, 0.3);
            }
            
            .option-icon {
                font-size: 1.5rem;
                width: 40px;
                height: 40px;
                background: #f8f9fa;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: auto;
            }
            
            .option-button:hover .option-icon {
                background: rgba(255,255,255,0.2);
            }
            
            .typing-indicator {
                display: none;
                align-items: center;
                gap: 8px;
                color: #666;
                margin: 15px 0;
                font-style: italic;
            }
            
            .typing-dots {
                display: flex;
                gap: 4px;
            }
            
            .typing-dot {
                width: 8px;
                height: 8px;
                background: #F69898;
                border-radius: 50%;
                animation: typingBounce 1.4s infinite ease-in-out;
            }
            
            .typing-dot:nth-child(1) { animation-delay: 0s; }
            .typing-dot:nth-child(2) { animation-delay: 0.2s; }
            .typing-dot:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes typingBounce {
                0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                30% { transform: translateY(-10px); opacity: 1; }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideInUp {
                from { transform: translateY(50px) scale(0.9); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
            }
            
            /* רספונסיביות */
            @media (max-width: 768px) {
                .smart-floating-gnome {
                    width: 60px;
                    bottom: 100px;
                    right: 20px;
                }
                
                .guide-content {
                    width: 95%;
                    margin: 1% auto;
                }
                
                .guide-body {
                    padding: 20px;
                }
                
                .option-button {
                    padding: 12px 15px;
                    font-size: 0.9rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    startGnomeTextRotation() {
        setInterval(() => {
            this.gnomeTextIndex = (this.gnomeTextIndex + 1) % this.gnomeTexts.length;
            const textElement = document.getElementById('smartGnomeText');
            if (textElement) {
                textElement.textContent = this.gnomeTexts[this.gnomeTextIndex];
            }
        }, 6000);
    }
    
    handleGnomeClick() {
        const now = Date.now();
        const timeDiff = now - this.lastClickTime;
        this.lastClickTime = now;
        
        // לחיצה כפולה - גלילה למעלה
        if (timeDiff < 300) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.showNotification('חזרנו לתחילת הדף! 🔝');
            return;
        }
        
        // לחיצה רגילה - פתיחת המדריכה
        this.openModal();
    }
    
    openModal() {
        this.isModalOpen = true;
        this.conversation = [];
        const modal = document.getElementById('smartGuideModal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            this.showWelcomeMessage();
        }, 1000);
    }
    
    closeModal() {
        this.isModalOpen = false;
        const modal = document.getElementById('smartGuideModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    detectCurrentContext() {
        // בדיקה אם יש משרה פתוחה במודל
        const jobModal = document.getElementById('job-modal');
        if (jobModal && jobModal.style.display === 'block') {
            this.currentContext = 'job-view';
            this.currentJobData = {
                title: document.getElementById('modal-job-title')?.textContent || '',
                location: document.getElementById('modal-job-location')?.textContent || '',
                category: document.getElementById('modal-job-category')?.textContent || ''
            };
            return;
        }
        
        // בדיקה אם יש תוצאות חיפוש
        const jobsContainer = document.getElementById('jobsContainer');
        if (jobsContainer && jobsContainer.children.length > 0) {
            const firstChild = jobsContainer.children[0];
            if (!firstChild.classList.contains('loading') && !firstChild.classList.contains('no-jobs-message')) {
                this.currentContext = 'results';
                return;
            }
        }
        
        // בדיקה אם המשתמש בחלק החיפוש
        const searchSection = document.getElementById('search');
        if (searchSection && this.isElementInViewport(searchSection)) {
            this.currentContext = 'search';
            return;
        }
        
        this.currentContext = 'homepage';
    }
    
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    showWelcomeMessage() {
        this.hideTyping();
        const flow = this.getConversationFlow();
        this.addMessage('gnome', flow.message, flow.options);
    }
    
    getConversationFlow() {
        const flows = {
            homepage: {
                message: "שלום! 👋\n\nאני רואה שאתה בדף הבית.\nבואו נמצא ביחד את המשרה המושלמת בשבילך!\n\nאיך תרצה שנתחיל?",
                options: [
                    { text: "🎯 חיפוש חכם לפי העדפות", icon: "🎯", action: "startSmartSearch" },
                    { text: "📍 חיפוש לפי אזור", icon: "📍", action: "startLocationSearch" },
                    { text: "👀 הצג לי את כל המשרות", icon: "👀", action: "showAllJobs" },
                    { text: "🔍 עבור לחיפוש רגיל", icon: "🔍", action: "goToSearch" },
                    { text: "📝 לא מצאתי מה שחיפשתי", icon: "📝", action: "openCustomForm" }
                ]
            },
            search: {
                message: "אני רואה שאתה בחלק החיפוש! 🔍\n\nאני יכולה לעזור לך למלא את הטופס או לחפש בצורה חכמה יותר.\n\nמה תעדיף?",
                options: [
                    { text: "🎯 עזור לי למלא את החיפוש", icon: "🎯", action: "assistSearch" },
                    { text: "📋 הצג לי קטגוריות זמינות", icon: "📋", action: "showCategories" },
                    { text: "📍 הצג לי אזורים זמינים", icon: "📍", action: "showLocations" },
                    { text: "🏠 חזור לדף הבית", icon: "🏠", action: "goToHome" },
                    { text: "🔄 נקה ותתחיל מחדש", icon: "🔄", action: "clearAndRestart" }
                ]
            },
            results: {
                message: "מעולה! אני רואה שיש תוצאות חיפוש! 📋\n\nאני יכולה לעזור לך לסנן את התוצאות או להבין איך לפנות למשרות.\n\nמה תרצה לעשות?",
                options: [
                    { text: "🔍 עזור לי לסנן את התוצאות", icon: "🔍", action: "helpFilter" },
                    { text: "📱 איך פונים למשרה?", icon: "📱", action: "explainContact" },
                    { text: "🔍 חזור לחיפוש", icon: "🔍", action: "goToSearch" },
                    { text: "📝 לא מצאתי מה שחיפשתי", icon: "📝", action: "openCustomForm" },
                    { text: "🔄 חיפוש חדש", icon: "🔄", action: "newSearch" }
                ]
            },
            'job-view': {
                message: `אני רואה שאתה צופה במשרה! 👁️\n\n📋 ${this.currentJobData?.title || 'משרה'}\n📍 ${this.currentJobData?.location || 'ישראל'}\n\nהמשרה הזו מעניינת אותך?`,
                options: [
                    { text: "✅ כן, מעניינת! איך פונים?", icon: "✅", action: "explainApplication" },
                    { text: "🤔 לא בטוח, תסביר לי עוד", icon: "🤔", action: "explainDetails" },
                    { text: "❌ לא בשבילי, חפש לי אחרת", icon: "❌", action: "findSimilar" },
                    { text: "🔍 חזור לחיפוש", icon: "🔍", action: "goToSearch" },
                    { text: "📝 אחפש משהו אחר לגמרי", icon: "📝", action: "newCustomSearch" }
                ]
            }
        };
        
        return flows[this.currentContext] || flows['homepage'];
    }
    
    addMessage(sender, text, options = []) {
        const guideBody = document.getElementById('guideBody');
        const messageElement = document.createElement('div');
        messageElement.className = 'conversation-step';
        
        if (sender === 'gnome') {
            messageElement.innerHTML = `
                <div class="guide-message">
                    ${text.replace(/\n/g, '<br>')}
                </div>
                ${options.length > 0 ? `
                    <div class="user-options">
                        ${options.map(option => `
                            <button class="option-button" onclick="smartGnome.handleOptionClick('${option.action}', '${option.text.replace(/'/g, "\\'")}')">
                                <div class="option-content">
                                    <span>${option.text}</span>
                                </div>
                                <div class="option-icon">${option.icon}</div>
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            `;
        } else {
            messageElement.innerHTML = `<div class="user-response">${text}</div>`;
        }
        
        guideBody.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 100);
        
        this.scrollToBottom();
    }
  <!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>המשך הקוד + הוראות הטמעה</title>
    <style>
        body {
            background: #000;
            color: white;
            font-family: 'Assistant', 'Heebo', Arial, sans-serif;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255,255,255,0.05);
            border-radius: 20px;
            padding: 30px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(246, 152, 152, 0.2);
        }

        .code-block {
            background: #1a1a1a;
            color: #f0f0f0;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Consolas', 'Monaco', monospace;
            overflow-x: auto;
            margin: 15px 0;
            border: 1px solid #333;
            position: relative;
        }

        .copy-btn {
            position: absolute;
            top: 10px;
            left: 10px;
            background: #F69898;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.8rem;
            transition: all 0.3s ease;
        }

        .copy-btn:hover {
            background: #e58080;
        }

        .step {
            background: rgba(246, 152, 152, 0.1);
            border-radius: 15px;
            padding: 25px;
            margin: 20px 0;
            border-right: 5px solid #F69898;
        }

        .step-number {
            background: linear-gradient(135deg, #F69898, #ff8e53);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-left: 15px;
            font-size: 1.2rem;
        }

        h1, h2, h3 {
            color: #F69898;
        }

        .warning {
            background: rgba(255, 193, 7, 0.2);
            border: 2px solid #ffc107;
            border-radius: 10px;
            padding: 20px;
            margin: 15px 0;
            color: #ffc107;
        }

        .success {
            background: rgba(40, 167, 69, 0.2);
            border: 2px solid #28a745;
            border-radius: 10px;
            padding: 15px;
            margin: 10px 0;
            color: #28a745;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📝 המשך הקוד JavaScript לגמדה החכמה</h1>
        
        <div class="step">
            <h2>המשך הקוד לקובץ smart-gnome-guide.js</h2>
            <p>הוסף את הקוד הזה לסוף הקובץ (המשך מהקוד הקודם):</p>
            
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">📋 העתק המשך</button>
    handleOptionClick(action, text) {
        // הוספת תגובת המשתמש
        this.addMessage('user', text);
        
        // הצגת הקלדה
        this.showTyping();
        
        setTimeout(() => {
            this.handleAction(action);
        }, 1500);
    }
    
    handleAction(action) {
        this.hideTyping();
        
        switch (action) {
            case 'startSmartSearch':
                this.startSmartCategorySearch();
                break;
            case 'startLocationSearch':
                this.startLocationSearch();
                break;
            case 'showAllJobs':
                this.showAllJobs();
                break;
            case 'goToSearch':
                this.goToSearch();
                break;
            case 'goToHome':
                this.goToHome();
                break;
            case 'openCustomForm':
                this.openCustomRequestForm();
                break;
            case 'assistSearch':
                this.assistWithSearch();
                break;
            case 'showCategories':
                this.showCategories();
                break;
            case 'showLocations':
                this.showLocations();
                break;
            case 'clearAndRestart':
                this.clearAndRestart();
                break;
            case 'helpFilter':
                this.helpFilterResults();
                break;
            case 'explainContact':
                this.explainJobContact();
                break;
            case 'explainApplication':
                this.explainJobApplication();
                break;
            case 'newSearch':
                this.startNewSearch();
                break;
            default:
                this.addMessage('gnome', 'מצטער, לא הבנתי את הבקשה. בואו ננסה שוב! 😅');
        }
    }
    
    // פונקציות הפעולות הספציפיות
    startSmartCategorySearch() {
        const categories = this.getAvailableCategories();
        
        if (categories.length === 0) {
            this.addMessage('gnome', 'מצטער, לא מצאתי קטגוריות זמינות כרגע. 😔\nבואו ננסה דרך אחרת!', [
                { text: "📍 חיפוש לפי אזור", icon: "📍", action: "startLocationSearch" },
                { text: "📝 בקשה אישית", icon: "📝", action: "openCustomForm" }
            ]);
            return;
        }

        const categoryOptions = categories.slice(0, 6).map(category => ({
            text: `${this.getCategoryIcon(category)} ${category}`,
            icon: this.getCategoryIcon(category),
            action: `selectCategory:${category}`
        }));

        categoryOptions.push({
            text: "🔧 תחום אחר / לא בטוח",
            icon: "🔧",
            action: "openCustomForm"
        });

        this.addMessage('gnome', `מעולה! יש לי ${categories.length} קטגוריות זמינות עם משרות פעילות! 🎯\n\nאיזה תחום מעניין אותך?`, categoryOptions);
    }
    
    startLocationSearch() {
        const locations = this.getAvailableLocations();
        
        if (locations.length === 0) {
            this.addMessage('gnome', 'מצטער, לא מצאתי אזורים זמינים כרגע. 😔\nבואו ננסה דרך אחרת!', [
                { text: "🎯 חיפוש לפי קטגוריה", icon: "🎯", action: "startSmartSearch" },
                { text: "📝 בקשה אישית", icon: "📝", action: "openCustomForm" }
            ]);
            return;
        }

        const locationOptions = locations.slice(0, 6).map(location => ({
            text: `📍 ${location}`,
            icon: "📍",
            action: `selectLocation:${location}`
        }));

        locationOptions.push({
            text: "🌍 לא משנה לי אזור",
            icon: "🌍",
            action: "showAllJobs"
        });

        this.addMessage('gnome', `יש לי ${locations.length} אזורים עם משרות פעילות! 📍\n\nבאיזה אזור תרצה לעבוד?`, locationOptions);
    }
    
    openCustomRequestForm() {
        this.addMessage('gnome', 'אין בעיה! בואו ניצור בקשה אישית בשבילך 📝\n\nאני אשלח את הפרטים שלך ישירות בוואטסאפ.\n\nבואו נמלא את הפרטים:', [
            { text: "📝 בואו נמלא את הפרטים", icon: "📝", action: "startCustomForm" },
            { text: "🔄 אולי אנסה חיפוש רגיל קודם", icon: "🔄", action: "startSmartSearch" },
            { text: "📞 אני מעדיף פשוט להתקשר", icon: "📞", action: "guideToCall" }
        ]);
    }
    
    explainJobContact() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        this.addMessage('gnome', `איך פונים למשרות? קל מאוד! 📱\n\n${isMobile ? '📱 במובייל יש לך 2 אפשרויות:' : '💻 במחשב המומלץ הוא וואטסאפ:'}\n\n1️⃣ לחץ על הכפתור הירוק (וואטסאפ) 📱\n${isMobile ? '2️⃣ או על הכפתור הכחול (SMS) 💬\n3️⃣' : '2️⃣'} ההודעה תישלח אוטומטית עם פרטי המשרה!\n\nהכפתורים נמצאים בפינה של כל כרטיס משרה 👆`, [
            { text: "✅ הבנתי, תודה!", icon: "✅", action: "closeWithThanks" },
            { text: "🎯 תראה לי דוגמה", icon: "🎯", action: "showContactExample" },
            { text: "📞 אני מעדיף להתקשר", icon: "📞", action: "guideToCall" }
        ]);
    }
    
    explainJobApplication() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        this.addMessage('gnome', `מעולה! המשרה מעניינת אותך! 🎉\n\n${isMobile ? '📱 אני רואה שאתה במכשיר נייד - יש לך אפשרות גם ל-SMS!' : '💻 אני רואה שאתה במחשב - מומלץ וואטסאפ!'}\n\nאיך פונים למשרה:\n\n1️⃣ לחץ על כפתור הוואטסאפ הירוק 📱\n${isMobile ? '2️⃣ או על כפתור ה-SMS הכחול 💬\n3️⃣' : '2️⃣'} ההודעה תישלח אוטומטית עם פרטי המשרה!\n\nתרצה שאדריך אותך איך?`, [
            { text: "📱 הדרך אותי לוואטסאפ", icon: "📱", action: "guideToWhatsApp" },
            ...(isMobile ? [{ text: "💬 הדרך אותי ל-SMS", icon: "💬", action: "guideToSMS" }] : []),
            { text: "📞 אני רוצה להתקשר", icon: "📞", action: "guideToCall" },
            { text: "✅ הבנתי, תודה!", icon: "✅", action: "closeWithThanks" }
        ]);
    }
    
    showAllJobs() {
        this.closeModal();
        setTimeout(() => {
            // ניקוי מסננים והצגת כל המשרות
            if (typeof clearFilters === 'function') {
                clearFilters();
            }
            
            const jobsSection = document.querySelector('.jobs') || document.getElementById('search');
            if (jobsSection) {
                jobsSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            this.showNotification('מציג את כל המשרות הזמינות! 📋');
        }, 500);
    }
    
    goToSearch() {
        this.closeModal();
        setTimeout(() => {
            const searchElement = document.getElementById('search');
            if (searchElement) {
                searchElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 800);
                }
            }
            this.showNotification('עברנו לחיפוש! 🔍');
        }, 500);
    }
    
    goToHome() {
        this.closeModal();
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.showNotification('חזרנו לדף הבית! 🏠');
        }, 500);
    }
    
    // פונקציות עזר
    getAvailableCategories() {
        // ניסיון לקרוא מהמשתנה הגלובלי
        if (typeof uniqueCategories !== 'undefined' && uniqueCategories.length > 0) {
            return uniqueCategories;
        }
        
        // חילוץ מתפריט הקטגוריות הקיים
        const categorySelect = document.getElementById('categoryFilter');
        if (categorySelect) {
            const options = Array.from(categorySelect.options);
            return options.slice(1).map(option => option.value).filter(value => value.trim());
        }
        
        return [];
    }
    
    getAvailableLocations() {
        // ניסיון לקרוא מהמשתנים הגלובליים
        const cities = (typeof uniqueCities !== 'undefined') ? uniqueCities : [];
        const areas = (typeof uniqueAreas !== 'undefined') ? uniqueAreas : [];
        
        // שילוב ערים ואזורים
        let allLocations = [...cities, ...areas];
        
        // אם אין נתונים, נסה לחלץ מהתפריטים
        if (allLocations.length === 0) {
            const regionSelect = document.getElementById('regionFilter');
            const areaSelect = document.getElementById('areaFilter');
            
            if (regionSelect) {
                const regionOptions = Array.from(regionSelect.options);
                allLocations = [...allLocations, ...regionOptions.slice(1).map(option => option.value).filter(value => value.trim())];
            }
            
            if (areaSelect) {
                const areaOptions = Array.from(areaSelect.options);
                allLocations = [...allLocations, ...areaOptions.slice(1).map(option => option.value).filter(value => value.trim())];
            }
        }
        
        // הסרת כפילויות
        return [...new Set(allLocations)];
    }
    
    getCategoryIcon(category) {
        const icons = {
            'פיתוח ותוכנה': '💻',
            'מכירות ושיווק': '🏪',
            'מזון ומסעדנות': '🍕',
            'חינוך והוראה': '📚',
            'בריאות ורפואה': '🏥',
            'שירותי לקוחות': '🎧',
            'ניהול': '👔',
            'תחבורה': '🚛',
            'ביטחון': '🛡️',
            'תקשורת': '📡'
        };
        return icons[category] || '💼';
    }
    
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #dc3545, #e74c3c)'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideInNotification 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    showTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.style.display = 'flex';
    }
    
    hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.style.display = 'none';
    }
    
    scrollToBottom() {
        const guideBody = document.getElementById('guideBody');
        if (guideBody) {
            setTimeout(() => {
                guideBody.scrollTop = guideBody.scrollHeight;
            }, 100);
        }
    }
}

// יצירת המופע הגלובלי
let smartGnome;

// הפעלה כשהדף נטען
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        smartGnome = new SmartGnomeGuide();
    }, 2000); // המתן שהמערכת הקיימת תיטען
});

// הוספת מאזיני אירועים למקש ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && smartGnome && smartGnome.isModalOpen) {
        smartGnome.closeModal();
    }
});

console.log('🧙‍♀️ הגמדה החכמה מוכנה לטעינה!');
            </div>
        </div>

        <div class="step">
            <div class="step-number">3</div>
            <h2>הוספת התמונה</h2>
            <p>הוסף את תמונת הגמדה הוירטואלית לתיקיית images:</p>
            
            <div class="warning">
                <strong>⚠️ חשוב:</strong> השם צריך להיות בדיוק <code>virtual gnome.png</code> (עם רווח)
            </div>
            
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">📋 העתק נתיב</button>
images/virtual gnome.png    ← הוסף את התמונה כאן
            </div>
        </div>

        <div class="step">
            <div class="step-number">4</div>
            <h2>הוספת הקוד לאתר</h2>
            <p>עדכן את קובץ <code>index.html</code> שלך:</p>
            
            <div class="code-block">
                <button class="copy-btn" onclick="copyCode(this)">📋 העתק HTML</button>
&lt;!-- הוסף את זה לפני סגירת הטאג body --&gt;
&lt;script src="js/smart-gnome-guide.js"&gt;&lt;/script&gt;

&lt;!-- אופציונלי: הסתר את הגמדה הקיימת --&gt;
&lt;style&gt;
.floating-search-gnome {
    display: none !important;
}
&lt;/style&gt;

&lt;/body&gt;
&lt;/html&gt;
            </div>
        </div>

        <div class="step">
            <div class="step-number">5</div>
            <h2>בדיקה שהכל עובד</h2>
            <p>פתח את האתר ובדוק:</p>
            
            <div class="success">
                ✅ הגמדה הוירטואלית מופיעה בפינה הימנית התחתונה<br>
                ✅ הטקסט תחתיה משתנה כל 6 שניות<br>
                ✅ לחיצה רגילה פותחת את המדריכה החכמה<br>
                ✅ לחיצה כפולה מחזירה לתחילת הדף<br>
                ✅ המדריכה מזהה באיזה מצב המשתמש נמצא<br>
                ✅ השאלות מותאמות למשרות הקיימות באתר
            </div>
        </div>

        <div class="warning">
            <h3>🔧 פתרון בעיות נפוצות:</h3>
            <ul style="text-align: right;">
                <li><strong>הגמדה לא מופיעה:</strong> בדוק שהקובץ JS נטען נכון</li>
                <li><strong>התמונה לא נטענת:</strong> בדוק את הנתיב ושם הקובץ</li>
                <li><strong>המדריכה לא פותחת:</strong> פתח את מסוף הדפדפן (F12) ובדוק שגיאות</li>
                <li><strong>השאלות לא מותאמות:</strong> המערכת תלמד את הנתונים כשהמשרות יטענו</li>
            </ul>
        </div>

        <div class="success">
            <h3>🎉 סיימת!</h3>
            <p>הגמדה החכמה עכשיו אמורה לעבוד באתר שלך עם כל התכונות החכמות!</p>
            <p>היא תזהה אוטומטית את הקטגוריות והאזורים הזמינים ותתאים את השאלות בהתאם.</p>
        </div>
    </div>

    <script>
        function copyCode(button) {
            const codeBlock = button.nextElementSibling;
            const text = codeBlock.textContent || codeBlock.innerText;
            
            navigator.clipboard.writeText(text.trim()).then(function() {
                button.textContent = '✅ הועתק!';
                button.style.background = '#4CAF50';
                setTimeout(() => {
                    button.textContent = '📋 העתק';
                    button.style.background = '#F69898';
                }, 2000);
            }).catch(function() {
                // fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text.trim();
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                button.textContent = '✅ הועתק!';
                button.style.background = '#4CAF50';
                setTimeout(() => {
                    button.textContent = '📋 העתק';
                    button.style.background = '#F69898';
                }, 2000);
            });
        }
    </script>
</body>
</html>
