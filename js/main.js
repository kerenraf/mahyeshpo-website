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
