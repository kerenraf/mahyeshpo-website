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

// אתחול בטעינת הדף
document.addEventListener('DOMContentLoaded', function() {
    // הצגת משרות בדף הבית
    if (document.getElementById('jobsContainer')) {
        displayJobs(jobs);
    }
    
    // הגדרת אירועים
    setupEventListeners();
    
    // הסתרת הגמדה הצפה בהתחלה
    document.getElementById('floatingGnome').style.display = 'none';
    
    // גלילה והצגת הגמדה הצפה
    window.addEventListener('scroll', function() {
        const floatingGnome = document.getElementById('floatingGnome');
        if (window.scrollY > 300) {
            floatingGnome.style.display = 'block';
        } else {
            floatingGnome.style.display = 'none';
        }
    });
    
    // תפריט מובייל
    if (document.querySelector('.mobile-menu-toggle')) {
        document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
            document.getElementById('mainNav').classList.toggle('active');
        });
    }
});

// הגדרת אירועים
function setupEventListeners() {
    // אירועי חיפוש
    if (document.getElementById('searchButton')) {
        document.getElementById('searchButton').addEventListener('click', searchJobs);
    }
    
    if (document.getElementById('clearButton')) {
        document.getElementById('clearButton').addEventListener('click', clearFilters);
    }
    
    if (document.getElementById('searchInput')) {
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchJobs();
            }
        });
    }
    
    // מניעת סגירה של מודלים בלחיצה מחוץ להם
    window.onclick = function(event) {
        const jobModal = document.getElementById('job-modal');
        const importModal = document.getElementById('import-modal');
        
        if (event.target === jobModal) {
            closeJobModal();
        }
        if (event.target === importModal) {
            closeImportModal();
        }
    };
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
        searchJobs();
        document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
    }
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
// === שיפורים בקוד JavaScript ===

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 הדף נטען - מתחיל אתחול מובייל משופר...');
    
    // אתחול כל המרכיבים המשופרים למובייל
    initMobileEnhancements();
    
    // ניהול סדר אלמנטים במובייל
    reorderElementsForMobile();
    
    // הוספת מאזיני אירועים נוספים
    attachEnhancedEventListeners();
    
    // המשך לטעינת המשרות
    loadJobsFromGitHub();
    
    // הוספת אינדיקטור טעינה לאלמנטים שונים
    addLoadingIndicators();
    
    // הפעלת אנימציות גלילה
    initScrollAnimations();
    
    // טיפול באירועי פוקוס וריענון דף
    handlePageLifecycle();
});

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
    
    window.closeJobModal = function() {
        document.body.style.overflow = ''; // שחרור גלילה
        originalCloseFunction();
    };
    
    // שמירת פונקציית הפתיחה המקורית
    const originalOpenFunction = window.openJobModal;
    
    window.openJobModal = function(index, jobs) {
        document.body.style.overflow = 'hidden'; // נעילת גלילה
        originalOpenFunction(index, jobs);
    };
    
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
    // צביעה דינמית של קטגוריות
    uniqueCategories.forEach((category, index) => {
        // יצירת צבע דינמי בהתבסס על האינדקס
        const hue = (index * 35) % 360; // פיזור צבעים ב-HSL
        const colorClass = `category-color-${index}`;
        
        // הוספת סגנון CSS דינמי
        const style = document.createElement('style');
        style.textContent = `
            .${colorClass} {
                background: linear-gradient(135deg, hsl(${hue}, 80%, 80%), hsl(${hue}, 70%, 65%));
                color: hsl(${hue}, 80%, 20%);
            }
        `;
        document.head.appendChild(style);
        
        // מציאת כל התגיות בקטגוריה זו
        document.querySelectorAll(`.job-badge`).forEach(badge => {
            if (badge.textContent.trim() === category) {
                badge.classList.add(colorClass);
            }
        });
    });
}

// שיפור הצגת המשרות
function enhanceJobsDisplay(jobs) {
    // בדיקה אם יש משרות חדשות
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    jobs.forEach(job => {
        // סימון משרות חדשות (בהנחה שיש שדה createdAt או דומה)
        if (job.createdAt) {
            const jobDate = new Date(job.createdAt);
            if (jobDate > oneWeekAgo) {
                job.isNew = true;
            }
        }
        
        // סימון משרות פופולריות לפי צפיות או אחוז המרה
        if (job.views && job.views > 100) {
            job.isPopular = true;
        }
    });
}

// שיפור ביצועי טפסים
function enhanceFormPerformance() {
    // מניעת שליחות כפולות
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('[type="submit"]');
            if (submitButton) {
                if (submitButton.hasAttribute('data-submitted')) {
                    e.preventDefault();
                    return false;
                }
                
                submitButton.setAttribute('data-submitted', 'true');
                submitButton.disabled = true;
                
                setTimeout(() => {
                    submitButton.removeAttribute('data-submitted');
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    });
    
    // ולידציה משופרת בטפסים
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });
}

// ולידציה משופרת לשדות קלט
function validateInput(input) {
    if (!input.value && input.hasAttribute('required')) {
        showError(input, 'שדה חובה');
        return false;
    }
    
    if (input.id === 'phone' && input.value) {
        const phoneRegex = /^(0[23489]|05[0-9])-?[0-9]{7,8}$/;
        if (!phoneRegex.test(input.value)) {
            showError(input, 'מספר טלפון לא תקין');
            return false;
        }
    }
    
    if (input.id === 'contact-email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            showError(input, 'כתובת אימייל לא תקינה');
            return false;
        }
    }
    
    hideError(input);
    return true;
}
// פונקציה להצגת משרות
function displayJobs(jobsToShow) {
    const jobsContainer = document.getElementById('jobsContainer');
    if (!jobsContainer) return;
    
    jobsContainer.innerHTML = '';
    
    if (!jobsToShow || jobsToShow.length === 0) {
        jobsContainer.innerHTML = '<div>אין משרות זמינות</div>';
        return;
    }
    
    const activeJobs = jobsToShow.filter(job => job.status === 'פעיל');
    
    activeJobs.forEach((job, index) => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card fade-up';
        
        const categoryClass = categoryColors[job.category] || 'category-other';
        
        jobCard.innerHTML = `
            <div class="job-number">${job.jobNumber || (index + 1)}</div>
            <h3 class="job-title">${job.title}</h3>
            <div class="job-company">${job.company}</div>
            <div class="job-location">${job.location}</div>
            <div class="job-description">${job.description.substring(0, 100)}...</div>
            <div class="job-badge ${categoryClass}">${job.category}</div>
        `;
        
        jobCard.addEventListener('click', function() {
            openJobModal(job);
        });
        
        jobsContainer.appendChild(jobCard);
    });
}

// פונקציה לטעינת משרות מגיטהאב
function loadJobsFromGitHub() {
    const gitHubRawUrl = 'https://raw.githubusercontent.com/kerenraf/ma-yesh-po-jobs/main/jobs.json';
    
    fetch(gitHubRawUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`שגיאת שרת: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ טעינה מוצלחת של', data.length, 'משרות מגיטהאב');
            jobs = data; // עדכון המאגר המקומי
            displayJobs(jobs);
        })
        .catch(error => {
            console.error('❌ שגיאה בטעינה מגיטהאב:', error);
            console.log('🔄 משתמש במשרות מקומיות');
            displayJobs(jobs); // שימוש במאגר המקומי
        });
}

// פונקציה לפתיחת מודל משרה
function openJobModal(job) {
    // כאן תוסיפי את הקוד לפתיחת המודל
    alert(`פרטי המשרה: ${job.title}\nחברה: ${job.company}\nתיאור: ${job.description}`);
}

// פונקציה לחיפוש משרות
function searchJobs() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    
    let filteredJobs = jobs.filter(job => {
        const matchesSearch = !searchTerm || 
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !categoryFilter || job.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    displayJobs(filteredJobs);
}

// פונקציה לניקוי מסננים
function clearFilters() {
    if (document.getElementById('searchInput')) {
        document.getElementById('searchInput').value = '';
    }
    if (document.getElementById('categoryFilter')) {
        document.getElementById('categoryFilter').value = '';
    }
    displayJobs(jobs);
}

// פונקציה לטעינה מאחסון מקומי
function loadJobsFromStorage() {
    // אם יש נתונים מקומיים, השתמש בהם
    // אחרת טען מגיטהאב
    loadJobsFromGitHub();
}

// הצגת שגיאה ליד שדה
function showError(input, message) {
    let errorElement = input.nextElementSibling;
    
    if (!errorElement || !errorElement.classList.contains('validation-error')) {
        errorElement = document.createElement('div');
        errorElement.className = 'validation-error';
        input.parentNode.insertBefore(errorElement, input.nextElementSibling);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.classList.add('error-input');
}

// הסתרת שגיאה
function hideError(input) {
    const errorElement = input.nextElementSibling;
    
    if (errorElement && errorElement.classList.contains('validation-error')) {
        errorElement.style.display = 'none';
    }
    
    input.classList.remove('error-input');
}
