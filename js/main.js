// מאגר משרות
let jobs = [
    {
        id: 1,
        jobNumber: "JS001",
        title: "מפתח/ת Full Stack",
        company: "טכנולוגיות מתקדמות בע\"מ",
        category: "פיתוח ותוכנה",
        city: "תל אביב",
        region: "מרכז",
        location: "תל אביב - מרכז",
        jobType: "משרה מלאה",
        description: "אנו מחפשים מפתח/ת Full Stack עם ניסיון בטכנולוגיות React, Node.js ו-MongoDB. התפקיד כולל פיתוח מערכות מורכבות, עבודה בצוות מקצועי ומתן פתרונות טכנולוגיים מתקדמים.",
        requirements: "ניסיון של 3+ שנים בפיתוח Full Stack\nידע מעמיק ב-JavaScript\nניסיון עם React ו-Node.js\nיכולת עבודה בצוות\nאנגלית ברמה טובה",
        status: "פעיל"
    },
    {
        id: 2,
        jobNumber: "WS002",
        title: "מלצר/ית למסעדה יוקרתית",
        company: "מסעדת השף",
        category: "מזון ומסעדנות",
        city: "חיפה",
        region: "חיפה קריות והצפון",
        location: "חיפה - צפון",
        jobType: "משרה חלקית",
        description: "דרושים מלצרים/ות למסעדה יוקרתית בחיפה. ניסיון קודם - יתרון. העבודה במשמרות גמישות, אווירה משפחתית ותנאים מעולים!",
        requirements: "ניסיון קודם בהגשה - יתרון\nיחסי אנוש מעולים\nזמינות לעבודה בערבים וסופי שבוע\nיכולת עבודה בצוות",
        status: "פעיל"
    },
    {
        id: 3,
        jobNumber: "TE003",
        title: "מורה לאנגלית",
        company: "בית ספר יסודי",
        category: "חינוך והוראה",
        city: "ירושלים",
        region: "ירושליים והסביבה",
        location: "ירושלים",
        jobType: "משרה מלאה",
        description: "דרוש/ה מורה לאנגלית לבית ספר יסודי בירושלים. המשרה כוללת הוראת אנגלית לכיתות א'-ו', הכנת מערכי שיעור ובדיקת מבחנים.",
        requirements: "תואר ראשון בהוראת אנגלית או תחום רלוונטי\nתעודת הוראה\nניסיון בהוראה - יתרון\nיחסי אנוש מעולים\nיכולת עבודה בסביבה דינמית",
        status: "פעיל"
    },
    {
        id: 4,
        jobNumber: "MK004",
        title: "מנהל/ת שיווק דיגיטלי",
        company: "חברת היי-טק מובילה",
        category: "שיווק ומכירות",
        city: "תל אביב",
        region: "מרכז",
        location: "תל אביב - מרכז",
        jobType: "משרה מלאה",
        description: "דרוש/ה מנהל/ת שיווק דיגיטלי לחברת היי-טק מובילה. התפקיד כולל ניהול קמפיינים, עבודה עם פלטפורמות פרסום, ניתוח נתונים והובלת אסטרטגיה שיווקית.",
        requirements: "ניסיון של 3+ שנים בשיווק דיגיטלי\nהיכרות עם פלטפורמות פרסום כגון Google Ads, Facebook Ads\nיכולת ניתוח נתונים\nחשיבה אסטרטגית\nיתרון - ניסיון בשיווק B2B",
        status: "פעיל"
    },
    {
        id: 5,
        jobNumber: "HR005",
        title: "מגייס/ת בכיר/ה",
        company: "חברת משאבי אנוש",
        category: "משאבי אנוש",
        city: "רמת גן",
        region: "מרכז",
        location: "רמת גן - מרכז",
        jobType: "משרה מלאה",
        description: "לחברת משאבי אנוש מובילה דרוש/ה מגייס/ת בכיר/ה. התפקיד כולל איתור מועמדים, ראיונות, ליווי תהליכי גיוס ועבודה מול מנהלים ולקוחות.",
        requirements: "ניסיון של 2+ שנים בגיוס\nיחסי אנוש מעולים\nיכולת עבודה בסביבה דינמית\nהיכרות עם מערכות גיוס\nאנגלית ברמה גבוהה",
        status: "לא פעיל"
    },
    {
        id: 6,
        jobNumber: "HC006",
        title: "אח/ות מוסמך/ת",
        company: "בית חולים פרטי",
        category: "בריאות ורפואה",
        city: "חיפה",
        region: "חיפה קריות והצפון",
        location: "חיפה - צפון",
        jobType: "משרה מלאה",
        description: "לבית חולים פרטי בחיפה דרוש/ה אח/ות מוסמך/ת. העבודה במחלקה פנימית, משמרות בוקר/ערב/לילה.",
        requirements: "תעודת אח/ות מוסמך/ת\nניסיון של שנה לפחות\nיחסי אנוש מעולים\nיכולת עבודה בצוות\nנכונות לעבודה במשמרות",
        status: "פעיל"
    },
    {
        id: 7,
        jobNumber: "DR007",
        title: "נהג/ת משלוחים",
        company: "חברת שילוח",
        category: "עולם הרכבים והליסינג",
        city: "ירושלים",
        region: "ירושליים והסביבה",
        location: "ירושלים",
        jobType: "משרה חלקית",
        description: "לחברת שילוח דרוש/ה נהג/ת משלוחים לאזור ירושלים. עבודה בשעות גמישות, רכב צמוד.",
        requirements: "רישיון נהיגה בתוקף לפחות 3 שנים\nהיכרות עם אזור ירושלים\nיחסי אנוש טובים\nנכונות לעבודה בשעות גמישות",
        status: "פעיל"
    }
];

// טבלת צבעים לקטגוריות
const categoryColors = {
    'מזון ומסעדנות': 'category-food',
    'חינוך והוראה': 'category-education',
    'פיתוח ותוכנה': 'category-tech',
    'מחשבים ורשתות תקשורת': 'category-computers',
    'עולם הרכבים והליסינג': 'category-automotive',
    'שיווק ומכירות': 'category-marketing',
    'אדמיניסטרציה': 'category-admin',
    'לוגיסטיקה ורכש': 'category-logistics',
    'משאבי אנוש': 'category-hr',
    'אבטחה': 'category-security',
    'בריאות ורפואה': 'category-health',
    'תיירות ומלונאות': 'category-tourism',
    'בנייה ותשתיות': 'category-construction',
    'אחר': 'category-other'
};

// משתנים גלובליים
let allJobs = [];
let filteredJobs = [];
let uniqueCategories = [];

// אתחול בטעינת הדף
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 הדף נטען - מתחיל אתחול...');
    
    // הוספת מאזיני אירועים בסיסיים
    attachEventListeners();
    
    // בדיקת נתונים בקונסול
    console.log('📋 משרות מוגדרות בקוד:', jobs ? jobs.length : 0);
    
    // טעינת משרות - הערה: אנחנו משתמשים במשרות המוגדרות בקוד במקום לנסות לטעון מהשרת
    console.log('⚠️ משתמש במשרות המוגדרות מראש בקוד');
    createSampleJobs();
    
    // שאר האתחולים
    initMobileEnhancements();
    reorderElementsForMobile();
    attachEnhancedEventListeners();
    addLoadingIndicators();
    initScrollAnimations();
    handlePageLifecycle();
    
    // הסתרת הגמדה הצפה בהתחלה
    if (document.getElementById('floatingGnome')) {
        document.getElementById('floatingGnome').style.display = 'none';
    }
    
    // גלילה והצגת הגמדה הצפה
    window.addEventListener('scroll', function() {
        const floatingGnome = document.getElementById('floatingGnome');
        if (floatingGnome) {
            if (window.scrollY > 300) {
                floatingGnome.style.display = 'block';
            } else {
                floatingGnome.style.display = 'none';
            }
        }
    });
    
    // תפריט מובייל
    if (document.querySelector('.mobile-menu-toggle')) {
        document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
            const mainNav = document.getElementById('mainNav');
            if (mainNav) {
                mainNav.classList.toggle('active');
            }
        });
    }
    
    console.log('✅ אתחול הושלם');
});

// פונקציה לבדיקה אם המכשיר הוא מובייל
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// פונקציה להוספת מאזיני אירועים
function attachEventListeners() {
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', filterJobs);
    }
    
    const clearButton = document.getElementById('clearButton');
    if (clearButton) {
        clearButton.addEventListener('click', clearFilters);
    }
    
    if (document.getElementById('searchInput')) {
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterJobs();
            }
        });
    }
    
    // מאזין אירועים למודל "עוד עלינו"
    const aboutBtn = document.getElementById('aboutBtn');
    if (aboutBtn) {
        aboutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openAboutModal();
        });
    }
    
    // מאזיני אירועים לכפתורי סגירת המודל
    const aboutCloseBtn = document.querySelector('.about-close');
    const aboutCloseButtonFooter = document.querySelector('.about-close-button');
    
    if (aboutCloseBtn) {
        aboutCloseBtn.addEventListener('click', closeAboutModal);
    }
    
    if (aboutCloseButtonFooter) {
        aboutCloseButtonFooter.addEventListener('click', closeAboutModal);
    }
    
    window.addEventListener('storage', function(e) {
        if (e.key === 'jobs') {
            loadJobsFromStorage();
        }
    });
    
    // מאזין אירועים לסגירה בלחיצה על מסך או ESC
    window.addEventListener('click', function(event) {
        const aboutModal = document.getElementById('aboutModal');
        const jobModal = document.getElementById('job-modal');
        
        if (event.target === aboutModal) {
            closeAboutModal();
        }
        if (event.target === jobModal) {
            closeJobModal();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAboutModal();
            closeJobModal();
        }
    });
    
    // מניעת סגירה של מודלים בלחיצה מחוץ להם
    window.onclick = function(event) {
        const jobModal = document.getElementById('job-modal');
        const importModal = document.getElementById('import-modal');
        
        if (event.target === jobModal) {
            closeJobModal();
        }
        if (importModal && event.target === importModal) {
            closeImportModal();
        }
    };
}

// פונקציה לאתחול שיפורים במובייל
function initMobileEnhancements() {
    // אתחול תפריט מובייל משופר
    initMobileMenu();
    
    // הוספת אפקט ריפל לכפתורים
    addRippleEffect();
    
    // ניהול גודל ומיקום הגמדה
    optimizeGnomeForMobile();
    
    // שיפור מהירות טעינה במובייל
    optimizePerformance();
    
    // תיקון מיקומים בגלילה
    fixScrollPositioning();
    
    // שיפור אינטראקציות מודלים
    enhanceModalInteractions();
    
    console.log('✨ השיפורים למובייל אותחלו בהצלחה');
}

// תפריט מובייל משופר
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.getElementById('mainNav');
    const body = document.body;
    
    if (!menuToggle || !mainNav) {
        console.warn('⚠️ לא נמצאו אלמנטי תפריט מובייל');
        return;
    }
    
    // הוספת כיסוי רקע לתפריט
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    menuOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1050;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        backdrop-filter: blur(3px);
    `;
    body.appendChild(menuOverlay);
    
    // אירוע פתיחת וסגירת תפריט
    menuToggle.addEventListener('click', function() {
        const isActive = mainNav.classList.contains('active');
        
        if (isActive) {
            // סגירת התפריט
            mainNav.classList.remove('active');
            menuOverlay.style.opacity = '0';
            menuOverlay.style.visibility = 'hidden';
            body.style.overflow = '';
            
            // שינוי האייקון
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        } else {
            // פתיחת התפריט
            mainNav.classList.add('active');
            menuOverlay.style.opacity = '1';
            menuOverlay.style.visibility = 'visible';
            body.style.overflow = 'hidden'; // מניעת גלילה כשהתפריט פתוח
            
            // שינוי האייקון
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-times';
            }
        }
    });
    
    // סגירת התפריט בלחיצה על הרקע
    menuOverlay.addEventListener('click', function() {
        mainNav.classList.remove('active');
        menuOverlay.style.opacity = '0';
        menuOverlay.style.visibility = 'hidden';
        body.style.overflow = '';
        
        // שינוי האייקון בחזרה
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    });
    
    // סגירת התפריט בלחיצה על קישור
    const menuLinks = mainNav.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            menuOverlay.style.opacity = '0';
            menuOverlay.style.visibility = 'hidden';
            body.style.overflow = '';
            
            // שינוי האייקון בחזרה
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        });
    });
    
    console.log('✅ תפריט מובייל משופר אותחל');
}

// אפקט ריפל לכפתורים
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .form-submit, .search-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // מניעת ריבוי אפקטים
            const ripples = this.querySelectorAll('.ripple');
            ripples.forEach(ripple => ripple.remove());
            
            // יצירת אלמנט הריפל
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            // חישוב מיקום הריפל
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - (size / 2);
            const y = e.clientY - rect.top - (size / 2);
            
            // מיקום והגדרת גודל
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // הוספה לכפתור
            this.appendChild(ripple);
            
            // הסרה אחרי האנימציה
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    console.log('✅ אפקט ריפל נוסף לכפתורים');
}

// אופטימיזציה לגמדה במובייל
function optimizeGnomeForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) return;
    
    // טיפול בגמדה הראשית
    const mainGnome = document.querySelector('.hero-section .gnome-character');
    if (mainGnome) {
        // הבטחת אנימציית הריחוף
        if (!mainGnome.style.animation) {
            mainGnome.style.animation = 'float 3s ease-in-out infinite';
        }
    }
    
    // אופטימיזציה לגמדות בכרטיסי משרה
    const jobGnomes = document.querySelectorAll('.job-card-gnome');
    jobGnomes.forEach(gnome => {
        // הקטנה מעט לביצועים טובים יותר
        gnome.style.width = '45px';
    });
    
    // שיפור ביצועים לאנימציית הגמדה הצפה
    const floatingGnome = document.getElementById('floatingGnome');
    if (floatingGnome) {
        // ודא שהגמדה הצפה תמיד מוצגת במובייל
        floatingGnome.style.display = 'block';
        
        // הפחתת עומס אנימציה
        floatingGnome.style.animation = 'float 4s ease-in-out infinite';
    }
    
    console.log('✅ הגמדות אופטמו למובייל');
}

// שיפור ביצועים במובייל
function optimizePerformance() {
    // דחיית טעינת תמונות שאינן בשימוש מיידי
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // הוספת lazy loading לתמונות
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // הוספת תמונות בגדלים שונים למכשירים שונים אם רלוונטי
        if (img.classList.contains('gnome-character') && !img.hasAttribute('srcset')) {
            // בדרך כלל היינו מוסיפים srcset, אבל כאן נשאיר את התמונה המקורית
            // כי אין לנו גישה לגרסאות אחרות של התמונה
        }
    });
    
    // הפחתת עומס אנימציות במובייל
    if (window.innerWidth <= 768) {
        // הגבלת האנימציות ברקע
        const circles = document.querySelectorAll('.circle');
        circles.forEach(circle => {
            circle.style.animationDuration = '8s'; // האטת האנימציה
        });
    }
    
    console.log('✅ ביצועים אופטמו למובייל');
}

// תיקון מיקומים בגלילה
function fixScrollPositioning() {
    // תיקון גלילה לחלקים ספציפיים
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return; // דילוג על קישורים ריקים
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // חישוב מיקום מדויק בהתחשב בכותרת הקבועה
                const headerOffset = 70; // גובה הכותרת
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('✅ מיקומי גלילה תוקנו');
}

// שיפור אינטראקציות מודלים
function enhanceModalInteractions() {
    // שיפור מודל משרה
    const jobModal = document.getElementById('job-modal');
    
    if (!jobModal) return;
    
    // סגירת מודל בהקלקה מחוץ לתוכן
    jobModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeJobModal();
        }
    });
    
    // סגירת מודל בESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && jobModal.style.display === 'block') {
            closeJobModal();
        }
    });
    
    // מניעת גלילת רקע כשהמודל פתוח
    const originalCloseFunction = window.closeJobModal;
    
    if (typeof originalCloseFunction === 'function') {
        window.closeJobModal = function() {
            document.body.style.overflow = ''; // שחרור גלילה
            if (typeof originalCloseFunction === 'function') {
                originalCloseFunction();
            } else {
                if (jobModal) {
                    jobModal.style.display = 'none';
                }
            }
        };
    }
    
    // שמירת פונקציית הפתיחה המקורית
    const originalOpenFunction = window.openJobModal;
    
    if (typeof originalOpenFunction === 'function') {
        window.openJobModal = function(index, jobs) {
            document.body.style.overflow = 'hidden'; // נעילת גלילה
            if (typeof originalOpenFunction === 'function') {
                originalOpenFunction(index, jobs);
            }
        };
    }
    
    console.log('✅ אינטראקציות מודל שופרו');
}

// סידור מחדש של אלמנטים במובייל
function reorderElementsForMobile() {
    if (window.innerWidth > 768) return; // רק במובייל
    
    // מציאת המיכלים של החלקים
    const searchSection = document.querySelector('.search-section');
    const jobsSection = document.querySelector('.jobs');
    const categoriesSection = document.querySelector('.categories');
    const contactSection = document.querySelector('#contact');
    
    if (!searchSection || !jobsSection || !categoriesSection) {
        console.warn('⚠️ לא נמצאו כל החלקים לסידור מחדש');
        return;
    }
    
    // מציאת המיכל המשותף (אם קיים)
    let container = searchSection.parentElement;
    
    // הוספת class למיכל עבור סדר flex
    if (container) {
        container.classList.add('main-content');
        
        // סידור מחדש - סדר האלמנטים
        searchSection.style.order = '1';
        jobsSection.style.order = '2';
        categoriesSection.style.order = '3';
        if (contactSection) contactSection.style.order = '4';
        
        console.log('✅ אלמנטים סודרו מחדש למובייל');
    } else {
        console.warn('⚠️ לא נמצא מיכל משותף לסידור מחדש');
    }
}

// הוספת מאזיני אירועים משופרים
function attachEnhancedEventListeners() {
    // שיפור התנהגות כפתור החיפוש
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        // משוב טקטילי בלחיצה
        searchButton.addEventListener('touchstart', function() {
            this.classList.add('button-active');
        });
        
        searchButton.addEventListener('touchend', function() {
            this.classList.remove('button-active');
        });
    }
    
    // שיפור התנהגות כרטיסי משרה
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // אפקט לחיצה לגמדה הצפה
    const floatingGnome = document.getElementById('floatingGnome');
    if (floatingGnome) {
        floatingGnome.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.9)';
        });
        
        floatingGnome.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    }
    
    // גלילה חלקה לכפתור למעלה
    if (floatingGnome) {
        floatingGnome.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    console.log('✅ מאזיני אירועים משופרים נוספו');
}

// הוספת אינדיקטורים לטעינה
function addLoadingIndicators() {
    // יצירת אינדיקטור טעינה בסיסי
    function createLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-indicator';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
        `;
        return loadingDiv;
    }
    
    // הוספת אינדיקטור למיכל המשרות
    const jobsContainer = document.getElementById('jobsContainer');
    if (jobsContainer && jobsContainer.children.length === 0) {
        const loadingIndicator = createLoadingIndicator();
        jobsContainer.appendChild(loadingIndicator);
    }
    
    // הוספת טיימר להסרת אינדיקטורים אם הטעינה נתקעת
    setTimeout(function() {
        const indicators = document.querySelectorAll('.loading-indicator');
        indicators.forEach(indicator => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        });
    }, 5000); // הסרה אחרי 5 שניות בכל מקרה
    
    console.log('✅ אינדיקטורי טעינה נוספו');
}

// אתחול אנימציות גלילה
function initScrollAnimations() {
    // בדיקה שהדפדפן תומך ב-IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        console.warn('⚠️ הדפדפן לא תומך ב-IntersectionObserver, אנימציות גלילה לא יעבדו');
        return;
    }
    
    // הגדרת אובזרבר גלילה
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // הוספת אפקט ריחוף לגמדה בכרטיס משרה שנכנס למסך
                const gnome = entry.target.querySelector('.job-card-gnome');
                if (gnome) {
                    gnome.style.animation = 'float 3s ease-in-out infinite';
                }
            }
        });
    }, observerOptions);
    
    // כרטיסי משרה
    document.querySelectorAll('.job-card').forEach(card => {
        observer.observe(card);
    });
    
    // כרטיסי קטגוריה
    document.querySelectorAll('.category-card').forEach(card => {
        observer.observe(card);
    });
    
    console.log('✅ אנימציות גלילה אותחלו');
}

// טיפול במחזור חיי הדף
function handlePageLifecycle() {
    // עדכון בחזרה לדף
    window.addEventListener('focus', function() {
        console.log('👁️ הדף זוכה בפוקוס - מרענן נתונים');
        loadJobsFromStorage();
    });
    
    // ניקוי משאבים כשיוצאים מהדף
    window.addEventListener('beforeunload', function() {
        // ניקוי משאבים אם צריך
    });
    
    // התמודדות עם מצב אופליין
    window.addEventListener('online', function() {
        console.log('🔌 המכשיר מחובר - מרענן נתונים');
        loadJobsFromGitHub();
    });
    
    window.addEventListener('offline', function() {
        console.log('🔌 המכשיר מנותק - משתמש בנתונים מקומיים');
        // הצגת הודעה למשתמש אם רלוונטי
    });
    
    console.log('✅ מחזור חיי הדף מנוהל');
}

// שיפור התצוגה של קטגוריות
function enhanceCategoriesDisplay() {
    // בדיקה שיש קטגוריות
    if (!uniqueCategories || uniqueCategories.length === 0) {
        console.warn('⚠️ אין קטגוריות לשיפור תצוגה');
        return;
    }
    
    console.log('משפר תצוגת קטגוריות:', uniqueCategories);
    
    // הגדרת מחלקות צבע קבועות מראש לקטגוריות נפוצות
    const predefinedColors = {
        'מזון ומסעדנות': 'rgba(255, 99, 132, 0.8)',
        'חינוך והוראה': 'rgba(54, 162, 235, 0.8)',
        'פיתוח ותוכנה': 'rgba(75, 192, 192, 0.8)',
        'מחשבים ורשתות תקשורת': 'rgba(153, 102, 255, 0.8)',
        'עולם הרכבים והליסינג': 'rgba(255, 159, 64, 0.8)',
        'שיווק ומכירות': 'rgba(255, 99, 255, 0.8)',
        'אדמיניסטרציה': 'rgba(99, 255, 132, 0.8)',
        'לוגיסטיקה ורכש': 'rgba(132, 99, 255, 0.8)',
        'משאבי אנוש': 'rgba(99, 132, 255, 0.8)',
        'אבטחה': 'rgba(132, 255, 99, 0.8)',
        'בריאות ורפואה': 'rgba(255, 132, 99, 0.8)',
        'תיירות ומלונאות': 'rgba(99, 255, 255, 0.8)',
        'בנייה ותשתיות': 'rgba(255, 206, 86, 0.8)',
        'אחר': 'rgba(156, 156, 156, 0.8)'
    };
    
    // הוספת סגנון CSS גלובלי לשיפור תצוגת הקטגוריות
    const categoryStyle = document.createElement('style');
    categoryStyle.id = 'category-colors-style';
    
    // הסרת סגנון קודם אם קיים
    const existingStyle = document.getElementById('category-colors-style');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    // יצירת CSS לכל הקטגוריות
    let cssText = '';
    
    uniqueCategories.forEach((category, index) => {
        // בחירת צבע - קבוע מראש או דינמי
        let bgColor;
        let textColor = '#ffffff'; // טקסט לבן כברירת מחדל
        
        if (predefinedColors[category]) {
            bgColor = predefinedColors[category];
        } else {
            // יצירת צבע דינמי בהתבסס על האינדקס
            const hue = (index * 35) % 360; // פיזור צבעים ב-HSL
            bgColor = `hsla(${hue}, 80%, 65%, 0.8)`;
            
            // אם הצבע בהיר, להשתמש בטקסט כהה
            if (hue > 40 && hue < 200) {
                textColor = '#333333';
            }
        }
        
        // יצירת class בטוח לשימוש ב-CSS
        const safeCategory = category.replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        const className = `category-${safeCategory}`;
        
        // הוספת CSS למחלקה
        cssText += `
        .job-badge[data-category="${category}"], 
        .job-badge.${className} {
            background-color: ${bgColor};
            color: ${textColor};
            border-radius: 4px;
            padding: 3px 8px;
            font-weight: bold;
            display: inline-block;
            font-size: 0.85rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        `;
    });
    
    // החלת הסגנון
    categoryStyle.textContent = cssText;
    document.head.appendChild(categoryStyle);
    
    // החלת מחלקות CSS על כל התגיות של הקטגוריות
    const categoryBadges = document.querySelectorAll('.job-badge');
    categoryBadges.forEach(badge => {
        const category = badge.textContent.trim();
        badge.setAttribute('data-category', category);
        
        // הוספת מחלקה ספציפית
        const safeCategory = category.replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        badge.classList.add(`category-${safeCategory}`);
    });
    
    console.log('✅ תצוגת קטגוריות שופרה');
}

// פונקציות לניהול מודל "עוד עלינו" - עם תיקון לבעיית ההיעלמות
function openAboutModal() {
    const aboutModal = document.getElementById('aboutModal');
    if (!aboutModal) return;
    
    // וידוא שכל התוכן גלוי לפני הצגת המודל
    const modalContent = aboutModal.querySelector('.about-modal-content');
    if (modalContent) {
        // וידוא שכל האלמנטים גלויים
        const elements = aboutModal.querySelectorAll('.about-intro, .about-main-text, .why-section, .human-section, .benefits-list li');
        elements.forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
    }
    
    // הצגת המודל עם אנימציה מתאימה
    aboutModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAboutModal() {
    const aboutModal = document.getElementById('aboutModal');
    if (!aboutModal) return;
    
    aboutModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// פונקציה לסגירת מודל המשרה
function closeJobModal() {
    const jobModal = document.getElementById('job-modal');
    if (jobModal) {
        jobModal.style.display = 'none';
        document.body.style.overflow = ''; // חידוש הגלילה
    }
}

// פונקציה לסגירת מודל הייבוא
function closeImportModal() {
    const importModal = document.getElementById('import-modal');
    if (importModal) {
        importModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// פונקציה לטיפול בבחירת קובץ קורות חיים
function handleFileSelect(event) {
    const file = event.target.files[0];
    const fileNameElement = document.getElementById('file-name');
    
    if (file && fileNameElement) {
        fileNameElement.textContent = file.name;
    }
}

// פונקציה לגלילה לראש הדף
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// פונקציה לבחירת קטגוריה מקטגוריות מובילות
function selectCategory(category) {
    if (document.getElementById('categoryFilter')) {
        document.getElementById('categoryFilter').value = category;
        filterJobs();
        document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
    }
}

// פונקציה לחילוץ קטגוריות ייחודיות
function extractUniqueCategories(jobs) {
    if (!jobs || !Array.isArray(jobs)) {
        console.error('שגיאה: jobs אינו מערך תקין', jobs);
        uniqueCategories = [];
        return;
    }
    
    const categories = jobs
        .filter(job => job && job.category)
        .map(job => job.category.trim())
        .filter((category, index, self) => 
            self.indexOf(category) === index && category !== '');
    
    uniqueCategories = categories.sort();
    console.log('קטגוריות ייחודיות:', uniqueCategories);
}

// פונקציה לעדכון רשימת הקטגוריות
function updateCategoryFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;
    
    const selectedValue = categoryFilter.value;
    categoryFilter.innerHTML = '<option value="">כל הקטגוריות</option>';
    
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    
    if (selectedValue && uniqueCategories.includes(selectedValue)) {
        categoryFilter.value = selectedValue;
    }
}

// פונקציה לעדכון קוביות הקטגוריות
function updateCategoryCards() {
    const categoriesGrid = document.querySelector('.categories-grid');
    if (!categoriesGrid) return;
    
    categoriesGrid.innerHTML = '';
    const categoriesToShow = uniqueCategories.slice(0, 10);
    
    categoriesToShow.forEach((category, index) => {
        const card = document.createElement('div');
        card.className = `category-card fade-up delay-${index % 5}`;
        card.onclick = function() { selectCategory(category); };
        
        let icon = '📦';
        let description = 'משרות מגוונות';
        
        // התאמת אייקונים
        if (category.includes('מזון')) {
            icon = '🍽️';
            description = 'מלצרים, טבחים, ברמנים';
        } else if (category.includes('חינוך')) {
            icon = '📚';
            description = 'מורים, מדריכים, מחנכים';
        } else if (category.includes('פיתוח')) {
            icon = '💻';
            description = 'מפתחים, מתכנתים, QA';
        }
        
        card.innerHTML = `
            <div class="category-icon">${icon}</div>
            <div class="category-title">${category}</div>
            <div class="category-desc">${description}</div>
        `;
        
        categoriesGrid.appendChild(card);
    });
}

// פונקציה לטעינת משרות מהאחסון המקומי
function loadJobsFromStorage() {
    try {
        const savedJobs = localStorage.getItem('jobs');
        
        if (savedJobs) {
            allJobs = JSON.parse(savedJobs);
            extractUniqueCategories(allJobs);
            updateCategoryFilters();
            updateCategoryCards();
            enhanceCategoriesDisplay(); // הוספת קריאה לפונקציה שמטפלת בצבעי הקטגוריות
            
            const activeJobs = allJobs.filter(job => job.status !== 'לא פעיל');
            displayJobsInHomepage(activeJobs);
            filteredJobs = [];
        } else {
            createSampleJobs();
        }
    } catch (error) {
        console.error('❌ שגיאה בטעינה:', error);
        createSampleJobs();
    }
}

// פונקציה ליצירת משרות דוגמה
function createSampleJobs() {
    console.log('✅ יוצר משרות דוגמה ממערך jobs');
    
    // וידוא שמערך jobs תקין
    if (!jobs || !Array.isArray(jobs) || jobs.length === 0) {
        console.error('❌ אין מערך jobs תקין ליצירת משרות דוגמה');
        
        // יצירת משרות דוגמה מינימליות
        allJobs = [
            {
                id: 1,
                jobNumber: "JS001",
                title: "מפתח/ת Full Stack",
                company: "טכנולוגיות מתקדמות בע\"מ",
                category: "פיתוח ותוכנה",
                city: "תל אביב",
                region: "מרכז",
                location: "תל אביב - מרכז",
                jobType: "משרה מלאה",
                description: "אנו מחפשים מפתח/ת Full Stack עם ניסיון בטכנולוגיות React, Node.js ו-MongoDB.",
                requirements: "ניסיון של 3+ שנים בפיתוח Full Stack\nידע מעמיק ב-JavaScript",
                status: "פעיל"
            },
            {
                id: 2,
                jobNumber: "WS002",
                title: "מלצר/ית למסעדה יוקרתית",
                company: "מסעדת השף",
                category: "מזון ומסעדנות",
                city: "חיפה",
                region: "חיפה קריות והצפון",
                status: "פעיל"
            }
        ];
    } else {
        // שימוש במערך jobs הקיים
        allJobs = jobs;
    }
    
    // שמירה באחסון מקומי
    localStorage.setItem('jobs', JSON.stringify(allJobs));
    
    // הדפסת פרטי המשרות לבדיקה
    console.log('דוגמאות משרות:');
    allJobs.slice(0, 2).forEach((job, index) => {
        console.log(`משרה ${index+1}:`, {
            title: job.title,
            company: job.company,
            category: job.category,
            number: job.jobNumber
        });
    });
    
    extractUniqueCategories(allJobs);
    updateCategoryFilters();
    updateCategoryCards();
    enhanceCategoriesDisplay();
    displayJobsInHomepage(allJobs);
}

// פונקציה להצגת משרות בדף הבית
function displayJobsInHomepage(jobs) {
    const jobsContainer = document.getElementById('jobsContainer');
    if (!jobsContainer) return;
    
    jobsContainer.innerHTML = '';
    
    if (!jobs || jobs.length === 0) {
        jobsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #ccc;">
                <h3>אין משרות פעילות כרגע</h3>
                <p>ייבא משרות דרך <a href="job-management.html" style="color: #F69898;">עמוד הניהול</a></p>
            </div>
        `;
        return;
    }
    
    const categoryColorMap = {};
    const colorClasses = [
        'category-food', 'category-education', 'category-tech', 
        'category-computers', 'category-automotive', 'category-marketing', 
        'category-health', 'category-hr', 'category-security', 
        'category-tourism', 'category-construction', 'category-admin', 
        'category-logistics', 'category-other'
    ];
    
    uniqueCategories.forEach((category, index) => {
        categoryColorMap[category] = colorClasses[index % colorClasses.length];
    });
    
    const jobsToShow = jobs.slice(0, 9);
    
    jobsToShow.forEach((job, index) => {
        // בדיקה וטיפול במקרה ששדות חסרים
        const jobTitle = job.title || 'משרה ללא כותרת';
        const jobCompany = job.company || 'חברה לא ידועה';
        const jobNumber = job.jobNumber || (index + 1).toString();
        const jobCategory = job.category || 'אחר';
        
        // לוג לבדיקת המשרה
        console.log('מציג משרה:', { title: jobTitle, company: jobCompany, category: jobCategory, number: jobNumber });
        
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card fade-up';
        jobCard.style.animationDelay = `${index * 0.1}s`;
        
        const location = job.city ? `${job.city}, ${job.region || 'מרכז'}` : job.region || 'מרכז';
        let shortDescription = job.description ? 
            job.description.substring(0, 100) + (job.description.length > 100 ? '...' : '') : 
            'לחץ על כפתורי יצירת הקשר לפרטים נוספים';
        
        const categoryClass = categoryColorMap[jobCategory] || 'category-other';
        const messageText = `שלום, אני מעוניין/ת במשרה: ${jobTitle} (${jobNumber})`;
        
        const whatsappText = encodeURIComponent(messageText);
        const whatsappLink = `https://wa.me/972555504633?text=${whatsappText}`;
        const smsLink = `sms:+972555504633?body=${encodeURIComponent(messageText)}`;
        
        jobCard.innerHTML = `
            <div class="job-number">${jobNumber}</div>
            <h3 class="job-title">${jobTitle}</h3>
            <div class="job-company">${jobCompany}</div>
            <div class="job-location">${location}</div>
            <div class="job-description">${shortDescription}</div>
            <div class="job-badge ${categoryClass}">${jobCategory}</div>
            
            <div class="job-card-gnome">
                <img src="images/gnome.png" alt="גמדה פרטים">
                <div class="job-card-gnome-text">לפרטים נוספים</div>
                <div class="gnome-tooltip">לחץ לפרטים נוספים!</div>
            </div>
            
            <div class="contact-buttons">
                <a href="${whatsappLink}" class="contact-button whatsapp-button" target="_blank" title="פנייה בוואטסאפ" onclick="event.stopPropagation();">
                    <i class="fab fa-whatsapp"></i>
                </a>
                <a href="${smsLink}" class="contact-button sms-button" title="פנייה ב-SMS" onclick="event.stopPropagation();">
                    <i class="fas fa-sms"></i>
                </a>
            </div>
        `;
        
        jobCard.addEventListener('click', function() {
            const currentJobs = filteredJobs.length > 0 ? filteredJobs : jobs;
            openJobModal(index, currentJobs);
        });
        
        jobsContainer.appendChild(jobCard);
    });
    
    // הוספת קריאה מפורשת לפונקציה enhanceCategoriesDisplay כאן
    setTimeout(() => {
        enhanceCategoriesDisplay();
    }, 100);
}

// פונקציה לטעינת משרות מ-GitHub
function loadJobsFromGitHub() {
    // בדיקה אם יש משרות מוגדרות מראש בקוד - אם כן, נשתמש בהן
    if (jobs && Array.isArray(jobs) && jobs.length > 0) {
        console.log('✅ משתמש במשרות המוגדרות מראש:', jobs.length);
        allJobs = jobs;
        localStorage.setItem('jobs', JSON.stringify(allJobs));
        
        extractUniqueCategories(allJobs);
        updateCategoryFilters();
        updateCategoryCards();
        enhanceCategoriesDisplay();
        
        const activeJobs = allJobs.filter(job => job.status !== 'לא פעיל');
        displayJobsInHomepage(activeJobs);
        filteredJobs = [];
        return;
    }
    
    // אחרת, ננסה לטעון מהשרת
    const gitHubRawUrl = 'https://raw.githubusercontent.com/kerenraf/ma-yesh-po-jobs/main/jobs.json';
    
    console.log('🔄 מנסה לטעון משרות מהשרת:', gitHubRawUrl);
    
    fetch(gitHubRawUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`שגיאת שרת: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ טעינה מוצלחת של', data.length, 'משרות מהשרת');
            console.log('דוגמה למשרה ראשונה:', data[0]);
            
            if (data && Array.isArray(data) && data.length > 0) {
                allJobs = data;
                localStorage.setItem('jobs', JSON.stringify(allJobs));
                
                extractUniqueCategories(allJobs);
                updateCategoryFilters();
                updateCategoryCards();
                enhanceCategoriesDisplay();
                
                const activeJobs = allJobs.filter(job => job.status !== 'לא פעיל');
                displayJobsInHomepage(activeJobs);
                filteredJobs = [];
            }
        })
        .catch(error => {
            console.error('❌ שגיאה בטעינה מהשרת:', error);
            console.log('⚠️ משתמש במשרות מוגדרות מראש כגיבוי');
            createSampleJobs();
        });
}

// פונקציה לפתיחת מודל פרטי משרה
function openJobModal(index, jobs) {
    if (!jobs || !jobs[index]) {
        alert('אירעה שגיאה בטעינת פרטי המשרה');
        return;
    }
    
    const job = jobs[index];
    
    document.getElementById('modal-job-title').textContent = job.title || 'משרה ללא כותרת';
    document.getElementById('modal-job-company').textContent = job.company || 'חברה לא ידועה';
    document.getElementById('modal-job-location').textContent = job.city ? `${job.city}, ${job.region || 'מרכז'}` : job.region || 'מרכז';
    document.getElementById('modal-job-type').textContent = job.type || 'משרה מלאה';
    document.getElementById('modal-job-category').textContent = job.category || 'אחר';
    document.getElementById('modal-job-description').textContent = job.description || 'לחץ על כפתורי יצירת הקשר לפרטים נוספים';
    document.getElementById('modal-job-requirements').textContent = job.requirements || 'לחץ על כפתורי יצירת הקשר לפרטים נוספים';
    
    // איפוס טופס
    document.getElementById('mini-name').value = '';
    document.getElementById('mini-phone').value = '';
    document.getElementById('mini-name-error').style.display = 'none';
    document.getElementById('mini-phone-error').style.display = 'none';
    
    // יצירת כפתורים
    let buttonsContainer = document.querySelector('.modal-buttons-container');
    if (!buttonsContainer) {
        buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'modal-buttons-container';
        const miniForm = document.querySelector('.modal-mini-form');
        miniForm.parentNode.insertBefore(buttonsContainer, miniForm.nextSibling);
    } else {
        buttonsContainer.innerHTML = '';
    }
    
    const whatsappButton = document.createElement('button');
    whatsappButton.className = 'modal-contact-button modal-whatsapp-button';
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i> פנייה בוואטסאפ';
    whatsappButton.addEventListener('click', function() {
        sendContactWithDetails('whatsapp', job, index);
    });
    
    const smsButton = document.createElement('button');
    smsButton.className = 'modal-contact-button modal-sms-button';
    smsButton.innerHTML = '<i class="fas fa-sms"></i> פנייה ב-SMS';
    smsButton.addEventListener('click', function() {
        sendContactWithDetails('sms', job, index);
    });
    
    const searchButton = document.createElement('button');
    searchButton.className = 'modal-contact-button modal-search-button';
    searchButton.innerHTML = '<i class="fas fa-search"></i> חזרה לחיפוש';
    searchButton.addEventListener('click', function() {
        closeJobModal();
        document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
    });
    
    buttonsContainer.appendChild(whatsappButton);
    buttonsContainer.appendChild(smsButton);
    buttonsContainer.appendChild(searchButton);
    
    document.getElementById('job-modal').style.display = 'block';
}

// פונקציה לשליחת הודעה עם פרטי המועמד
function sendContactWithDetails(method, job, jobIndex) {
    const name = document.getElementById('mini-name').value.trim();
    const phone = document.getElementById('mini-phone').value.trim();
    
    let isValid = true;
    
    if (!name) {
        document.getElementById('mini-name-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('mini-name-error').style.display = 'none';
    }
    
    if (!phone || !isValidPhone(phone)) {
        document.getElementById('mini-phone-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('mini-phone-error').style.display = 'none';
    }
    
    if (!isValid) return;
    
    const jobTitle = job.title || 'משרה';
    const jobNumber = job.jobNumber || (jobIndex + 1);
    
    const messageText = `שלום, אני מעוניין/ת במשרה: ${jobTitle} (${jobNumber})
שם מלא: ${name}
טלפון: ${phone}`;
    
    if (method === 'whatsapp') {
        const whatsappText = encodeURIComponent(messageText);
        const whatsappLink = `https://wa.me/972555504633?text=${whatsappText}`;
        window.open(whatsappLink, '_blank');
    } else if (method === 'sms') {
        const smsLink = `sms:+972555504633?body=${encodeURIComponent(messageText)}`;
        window.location.href = smsLink;
    }
}

// פונקציה לבדיקת תקינות מספר טלפון
function isValidPhone(phone) {
    const phoneRegex = /^(0[23489]|05[0-9])-?[0-9]{7,8}$/;
    return phoneRegex.test(phone);
}

// פונקציה לסינון משרות
function filterJobs() {
    const searchText = document.getElementById('searchInput').value.trim().toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const region = document.getElementById('regionFilter').value;
    
    const activeJobs = allJobs.filter(job => job.status !== 'לא פעיל');
    
    filteredJobs = activeJobs.filter(job => {
        if (searchText && !jobMatchesSearch(job, searchText)) {
            return false;
        }
        
        if (category && job.category !== category) {
            return false;
        }
        
        if (region && job.region !== region) {
            return false;
        }
        
        return true;
    });
    
    displayJobsInHomepage(filteredJobs);
}

// פונקציה לבדיקה אם משרה מתאימה לחיפוש
function jobMatchesSearch(job, searchText) {
    return (
        (job.title && job.title.toLowerCase().includes(searchText)) ||
        (job.company && job.company.toLowerCase().includes(searchText)) ||
        (job.description && job.description.toLowerCase().includes(searchText)) ||
        (job.requirements && job.requirements.toLowerCase().includes(searchText)) ||
        (job.city && job.city.toLowerCase().includes(searchText)) ||
        (job.region && job.region.toLowerCase().includes(searchText)) ||
        (job.category && job.category.toLowerCase().includes(searchText))
    );
}

// פונקציה לניקוי מסננים
function clearFilters() {
    if (document.getElementById('searchInput')) {
        document.getElementById('searchInput').value = '';
    }
    if (document.getElementById('categoryFilter')) {
        document.getElementById('categoryFilter').value = '';
    }
    if (document.getElementById('regionFilter')) {
        document.getElementById('regionFilter').value = '';
    }
    
    const activeJobs = allJobs.filter(job => job.status !== 'לא פעיל');
    filteredJobs = [];
    displayJobsInHomepage(activeJobs);
}

// פונקציה ליצירת קשר - עם שיפור המראה
function submitContactForm(event) {
    event.preventDefault();
    
    // בדיקת תקינות הטופס
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    
    if (!name || !email || !subject || !message) {
        alert('נא למלא את כל השדות בטופס');
        return false;
    }
    
    // שליחת הטופס - במקרה אמיתי כאן יש לשלוח את הנתונים לשרת
    console.log('שליחת טופס:', { name, email, subject, message });
    
    // איפוס הטופס והצגת הודעת הצלחה
    document.getElementById('contact-form').reset();
    document.getElementById('contact-success').style.display = 'block';
    
    // הסתרת הודעת ההצלחה אחרי 5 שניות
    setTimeout(function() {
        document.getElementById('contact-success').style.display = 'none';
    }, 5000);
    
    return false;
}

// פונקציה לטיפול בכפתור הנגישות
function toggleAccessibility() {
    alert('כפתור הנגישות נלחץ! כאן תוכל להוסיף פונקציות נגישות.');
    
    const btn = document.getElementById('fallback-accessibility');
    if (btn) {
        btn.classList.add('pulse');
        
        setTimeout(() => {
            btn.classList.remove('pulse');
        }, 2000);
    }
}

// בדיקה אם ספריית הנגישות נטענת
window.addEventListener('load', function() {
    if (typeof enable !== 'undefined') {
        document.body.classList.add('enable-loaded');
    }
});
