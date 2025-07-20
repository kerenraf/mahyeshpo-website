// מאגר משרות מוגדר מראש
const hardcodedJobs = [
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
    }
];

// הוסף את הקוד הזה בתחילת הפונקציה initializeApp() שלך

function forceCreateMainGnome() {
    console.log('🧙‍♀️ יוצר גמדה ראשית בכוח...');
    
    // מוחק גמדות קיימות אם יש
    const existingGnomes = document.querySelectorAll('.hero-section .gnome-character');
    existingGnomes.forEach(gnome => gnome.remove());
    
    // מוצא את ה-hero section
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) {
        console.error('❌ לא נמצא hero-section');
        return;
    }
    
    // יוצר את הגמדה החדשה
    const gnomeElement = document.createElement('div');
    gnomeElement.className = 'gnome-character main-gnome';
    gnomeElement.id = 'mainHeroGnome';
    
    // הוספת HTML של הגמדה
    gnomeElement.innerHTML = `
        <img src="https://cdn.pixabay.com/photo/2017/01/31/16/49/dwarf-2023281_960_720.png" 
             alt="גמדה עוזרת" 
             style="width: 100%; height: auto; display: block;"
             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDAiIGZpbGw9IiNGNjk4OTgiLz48dGV4dCB4PSI1MCIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE0Ij7XnNeT15TXkjwvdGV4dD48L3N2Zz4='">
        <div class="gnome-tooltip">אני אעזור לך למצוא משרה!</div>
    `;
    
    // הוספת סגנון CSS ישירות לאלמנט
    gnomeElement.style.cssText = `
        position: absolute !important;
        bottom: 20px !important;
        right: 10% !important;
        width: 120px !important;
        height: auto !important;
        cursor: pointer !important;
        transition: transform 0.3s ease !important;
        z-index: 100 !important;
        animation: gnomeFloat 3s ease-in-out infinite !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
    `;
    
    // הוספת אירוע קליק לגלילה למעלה
    gnomeElement.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // הוספת אירוע hover
    gnomeElement.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    gnomeElement.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // הוספת הגמדה ל-hero section
    heroSection.appendChild(gnomeElement);
    
    console.log('✅ גמדה ראשית נוצרה בהצלחה!');
    
    // וידוא שהגמדה נראית
    setTimeout(() => {
        const createdGnome = document.getElementById('mainHeroGnome');
        if (createdGnome) {
            const rect = createdGnome.getBoundingClientRect();
            console.log('📏 מיקום הגמדה:', { 
                visible: rect.width > 0 && rect.height > 0,
                position: { top: rect.top, left: rect.left, right: rect.right, bottom: rect.bottom }
            });
        }
    }, 100);
}

// הוספת CSS לאנימציה
function addGnomeAnimation() {
    const style = document.createElement('style');
    style.id = 'gnome-animation-styles';
    style.textContent = `
        @keyframes gnomeFloat {
            0%, 100% { 
                transform: translateY(0px); 
            }
            50% { 
                transform: translateY(-10px); 
            }
        }
        
        .gnome-tooltip {
            position: absolute !important;
            background: #2D2D2D !important;
            color: white !important;
            padding: 8px 12px !important;
            border-radius: 6px !important;
            font-size: 12px !important;
            top: -50px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            opacity: 0 !important;
            visibility: hidden !important;
            transition: all 0.3s ease !important;
            white-space: nowrap !important;
            z-index: 20 !important;
            border: 2px solid #F69898 !important;
        }
        
        .gnome-character:hover .gnome-tooltip {
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        .gnome-tooltip::after {
            content: '' !important;
            position: absolute !important;
            bottom: -8px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            border-left: 8px solid transparent !important;
            border-right: 8px solid transparent !important;
            border-top: 8px solid #2D2D2D !important;
        }
        
        @media (max-width: 768px) {
            .gnome-character.main-gnome {
                width: 90px !important;
                right: 5% !important;
            }
        }
    `;
    
    // הסרת סגנון קודם אם קיים
    const existingStyle = document.getElementById('gnome-animation-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    document.head.appendChild(style);
    console.log('✅ אנימציות גמדה נוספו');
}

// עדכן את הפונקציה initializeApp שלך להיות כך:
function initializeApp() {
    addGnomeAnimation(); // הוספת אנימציות
    forceCreateMainGnome(); // יצירת הגמדה בכוח
    loadJobs();
    attachEventListeners();
    addVisualEffects();
    
    setTimeout(function() {
        showMessage('ברוכים הבאים למה יש פה! 🎉', 'success');
    }, 1000);
}

// משתנים גלובליים
let allJobs = [];
let filteredJobs = [];
let uniqueCategories = [];

// אתחול כשהדף נטען
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 הדף נטען - מאתחל...');
    initializeApp();
});

// פונקציה ראשית לאתחול
function initializeApp() {
    addGnomeStyles(); // הוספת סגנונות לגמדה
    loadJobs();
    attachEventListeners();
    addVisualEffects();
    
    setTimeout(function() {
        showMessage('ברוכים הבאים למה יש פה! 🎉', 'success');
    }, 1000);
}

// הוספת סגנונות מיוחדים לגמדה
function addGnomeStyles() {
    const gnomeStyles = document.createElement('style');
    gnomeStyles.id = 'gnome-styles';
    gnomeStyles.textContent = `
        .gnome-character {
            position: absolute !important;
            bottom: 20px !important;
            right: 10% !important;
            width: 120px !important;
            cursor: pointer !important;
            transition: transform 0.3s ease !important;
            z-index: 10 !important;
            animation: float 3s ease-in-out infinite !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
        
        .gnome-character img {
            width: 100% !important;
            height: auto !important;
            filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3)) !important;
        }
        
        .gnome-character:hover {
            transform: scale(1.1) !important;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @media (max-width: 768px) {
            .gnome-character {
                width: 90px !important;
                right: 5% !important;
            }
        }
    `;
    document.head.appendChild(gnomeStyles);
    console.log('✅ סגנונות גמדה נוספו');
}

// טעינת משרות
function loadJobs() {
    console.log('📋 טוען משרות...');
    allJobs = hardcodedJobs;
    processJobs();
}

// עיבוד משרות
function processJobs() {
    extractUniqueCategories();
    updateCategoryFilters();
    updateCategoryCards();
    displayJobs(allJobs.filter(job => job.status === 'פעיל'));
}

// חילוץ קטגוריות ייחודיות
function extractUniqueCategories() {
    const categories = allJobs
        .filter(job => job.category)
        .map(job => job.category.trim())
        .filter((category, index, self) => self.indexOf(category) === index);
    
    uniqueCategories = categories.sort();
    console.log('✅ קטגוריות:', uniqueCategories);
}

// עדכון פילטר קטגוריות
function updateCategoryFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (!categoryFilter) return;
    
    categoryFilter.innerHTML = '<option value="">כל הקטגוריות</option>';
    
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// עדכון כרטיסי קטגוריות
function updateCategoryCards() {
    const categoriesContainer = document.getElementById('categoriesContainer');
    if (!categoriesContainer) return;
    
    categoriesContainer.innerHTML = '';
    
    const categoryIcons = {
        'פיתוח ותוכנה': '💻',
        'מזון ומסעדנות': '🍽️',
        'חינוך והוראה': '📚',
        'שיווק ומכירות': '📈',
        'משאבי אנוש': '👥',
        'בריאות ורפואה': '🏥',
        'עולם הרכבים והליסינג': '🚗'
    };
    
    const categoryDescs = {
        'פיתוח ותוכנה': 'מפתחים, מתכנתים, QA',
        'מזון ומסעדנות': 'מלצרים, טבחים, ברמנים',
        'חינוך והוראה': 'מורים, מדריכים, מחנכים',
        'שיווק ומכירות': 'מנהלי מכירות, שיווק דיגיטלי',
        'משאבי אנוש': 'מגייסים, מנהלי HR',
        'בריאות ורפואה': 'אחיות, רופאים, פיזיותרפיסטים',
        'עולם הרכבים והליסינג': 'נהגים, מכונאים, נציגי מכירות'
    };
    
    uniqueCategories.slice(0, 6).forEach((category, index) => {
        const card = document.createElement('div');
        card.className = 'category-card fade-up delay-' + ((index % 4) + 1);
        card.onclick = function() { selectCategory(category); };
        
        const icon = categoryIcons[category] || '📦';
        const desc = categoryDescs[category] || 'משרות מגוונות';
        
        card.innerHTML = 
            '<div class="category-icon">' + icon + '</div>' +
            '<div class="category-title">' + category + '</div>' +
            '<div class="category-desc">' + desc + '</div>';
        
        categoriesContainer.appendChild(card);
    });
}

// הצגת משרות
function displayJobs(jobs) {
    const jobsContainer = document.getElementById('jobsContainer');
    if (!jobsContainer) return;
    
    jobsContainer.innerHTML = '';
    
    if (!jobs || jobs.length === 0) {
        jobsContainer.innerHTML = 
            '<div class="no-jobs-message">' +
            '<h3>אין משרות פעילות כרגע</h3>' +
            '<p>נסה לחפש שוב מאוחר יותר או לשנות את המסננים</p>' +
            '</div>';
        return;
    }
    
    const jobsToShow = jobs.slice(0, 9);
    
    jobsToShow.forEach(function(job, index) {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card fade-up delay-' + ((index % 4) + 1);
        
        const location = job.city ? (job.city + ', ' + (job.region || 'מרכז')) : (job.region || 'מרכז');
        const shortDescription = job.description ? 
            (job.description.substring(0, 120) + (job.description.length > 120 ? '...' : '')) : 
            'לחץ על הגמדה או כפתורי יצירת הקשר לפרטים נוספים';
        
        const messageText = 'שלום, אני מעוניין/ת במשרה: ' + job.title + ' (' + job.jobNumber + ')';
        const whatsappLink = 'https://wa.me/972555504633?text=' + encodeURIComponent(messageText);
        const smsLink = 'sms:+972555504633?body=' + encodeURIComponent(messageText);
        
        jobCard.innerHTML = 
            '<div class="job-number">' + job.jobNumber + '</div>' +
            '<h3 class="job-title">' + job.title + '</h3>' +
            '<div class="job-company">' + job.company + '</div>' +
            '<div class="job-location">' +
            '<i class="fas fa-map-marker-alt"></i> ' + location +
            '</div>' +
            '<div class="job-description">' + shortDescription + '</div>' +
            '<div class="job-badge ' + getCategoryClass(job.category) + '">' + job.category + '</div>' +
            '<div class="job-card-bottom">' +
            '<div class="job-card-gnome" onclick="event.stopPropagation(); openJobModal(' + index + ', ' + (filteredJobs.length > 0 ? 'filteredJobs' : 'allJobs.filter(j => j.status === \'פעיל\')') + ')">' +
            '<img src="./images/gnome.png" alt="גמדה פרטים" onerror="this.src=\'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDAiIGZpbGw9IiNGNjk4OTgiLz48dGV4dCB4PSI1MCIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE0Ij7XnNeT15TXkjwvdGV4dD48L3N2Zz4=\'">' +
            '<div class="job-card-gnome-text">פרטים נוספים</div>' +
            '</div>' +
            '<div class="contact-buttons">' +
            '<a href="' + whatsappLink + '" class="contact-button whatsapp-button" target="_blank" title="פנייה בוואטסאפ" onclick="event.stopPropagation();">' +
            '<i class="fab fa-whatsapp"></i>' +
            '</a>' +
            '<a href="' + smsLink + '" class="contact-button sms-button" title="פנייה ב-SMS" onclick="event.stopPropagation();">' +
            '<i class="fas fa-sms"></i>' +
            '</a>' +
            '</div>' +
            '</div>';
        
        jobCard.addEventListener('click', function() {
            const currentJobs = filteredJobs.length > 0 ? filteredJobs : allJobs.filter(function(j) { return j.status === 'פעיל'; });
            openJobModal(index, currentJobs);
        });
        
        jobsContainer.appendChild(jobCard);
    });
}

// פונקציה לקבלת מחלקת CSS לקטגוריה
function getCategoryClass(category) {
    const categoryMap = {
        'פיתוח ותוכנה': 'dev',
        'מזון ומסעדנות': 'food',
        'חינוך והוראה': 'education',
        'שיווק ומכירות': 'marketing',
        'משאבי אנוש': 'hr',
        'בריאות ורפואה': 'health',
        'עולם הרכבים והליסינג': 'automotive'
    };
    return categoryMap[category] || 'default';
}

// פתיחת מודל משרה
function openJobModal(index, jobs) {
    if (!jobs || !jobs[index]) {
        alert('אירעה שגיאה בטעינת פרטי המשרה');
        return;
    }
    
    const job = jobs[index];
    
    document.getElementById('modal-job-title').textContent = job.title || 'משרה ללא כותרת';
    document.getElementById('modal-job-company').textContent = job.company || 'חברה לא ידועה';
    document.getElementById('modal-job-location').textContent = job.city ? (job.city + ', ' + (job.region || 'מרכז')) : (job.region || 'מרכז');
    document.getElementById('modal-job-type').textContent = job.jobType || 'משרה מלאה';
    document.getElementById('modal-job-category').textContent = job.category || 'אחר';
    document.getElementById('modal-job-description').textContent = job.description || 'לחץ על כפתורי יצירת הקשר לפרטים נוספים';
    document.getElementById('modal-job-requirements').textContent = job.requirements ? job.requirements.replace(/\\n/g, '\n') : 'לחץ על כפתורי יצירת הקשר לפרטים נוספים';
    
    const messageText = 'שלום, אני מעוניין/ת במשרה: ' + job.title + ' (' + job.jobNumber + ')';
    const whatsappLink = 'https://wa.me/972555504633?text=' + encodeURIComponent(messageText);
    const smsLink = 'sms:+972555504633?body=' + encodeURIComponent(messageText);
    
    document.getElementById('modal-whatsapp-btn').href = whatsappLink;
    document.getElementById('modal-sms-btn').href = smsLink;
    
    document.getElementById('job-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// סגירת מודל משרה
function closeJobModal() {
    document.getElementById('job-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// פתיחת מודל "עוד עלינו"
function openAboutModal() {
    document.getElementById('about-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// סגירת מודל "עוד עלינו"
function closeAboutModal() {
    document.getElementById('about-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// בחירת קטגוריה
function selectCategory(category) {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.value = category;
        filterJobs();
        document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
    }
}

// סינון משרות
function filterJobs() {
    const searchText = document.getElementById('searchInput').value.trim().toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const region = document.getElementById('regionFilter').value;
    
    const activeJobs = allJobs.filter(function(job) { return job.status === 'פעיל'; });
    
    filteredJobs = activeJobs.filter(function(job) {
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
    
    displayJobs(filteredJobs);
    console.log('נמצאו ' + filteredJobs.length + ' תוצאות');
}

// בדיקה אם משרה מתאימה לחיפוש
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

// ניקוי מסננים
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('regionFilter').value = '';
    
    const activeJobs = allJobs.filter(function(job) { return job.status === 'פעיל'; });
    filteredJobs = [];
    displayJobs(activeJobs);
    
    console.log('מסננים נוקו');
}

// הוספת מאזיני אירועים
function attachEventListeners() {
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', filterJobs);
    }
    
    const clearButton = document.getElementById('clearButton');
    if (clearButton) {
        clearButton.addEventListener('click', clearFilters);
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterJobs();
            }
        });
    }
    
    // מאזיני אירועים למודלים
    window.addEventListener('click', function(event) {
        const jobModal = document.getElementById('job-modal');
        const aboutModal = document.getElementById('about-modal');
        
        if (event.target === jobModal) {
            closeJobModal();
        }
        if (event.target === aboutModal) {
            closeAboutModal();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeJobModal();
            closeAboutModal();
        }
    });
    
    // מאזין לקישורי גלילה חלקה
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('✅ מאזיני אירועים הוספו');
}

// גלילה לראש הדף
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// הוספת אפקטים ויזואליים
function addVisualEffects() {
    if (!('IntersectionObserver' in window)) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.job-card, .category-card').forEach(function(card) {
        observer.observe(card);
    });
}

// הצגת הודעות למשתמש
function showMessage(message, type) {
    type = type || 'info';
    const messageDiv = document.createElement('div');
    
    let bgColor = '#5352ed';
    if (type === 'error') bgColor = '#ff4757';
    if (type === 'success') bgColor = '#2ed573';
    
    messageDiv.style.cssText = 
        'position: fixed;' +
        'top: 20px;' +
        'right: 20px;' +
        'background: ' + bgColor + ';' +
        'color: white;' +
        'padding: 15px 20px;' +
        'border-radius: 10px;' +
        'box-shadow: 0 5px 15px rgba(0,0,0,0.2);' +
        'z-index: 9999;' +
        'font-weight: bold;' +
        'max-width: 300px;' +
        'word-wrap: break-word;' +
        'transition: all 0.3s ease;';
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(function() {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(function() {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// פונקציה לייבוא משרות (להתאמה עתידית)
function importJobsFromJSON() {
    console.log('משתמש במשרות מוגדרות מראש');
    loadJobs();
}

// הוספת הפונקציות ל-window object למניעת שגיאות
window.openJobModal = openJobModal;
window.closeJobModal = closeJobModal;
window.openAboutModal = openAboutModal;
window.closeAboutModal = closeAboutModal;
window.getCategoryClass = getCategoryClass;
window.selectCategory = selectCategory;
window.filterJobs = filterJobs;
window.clearFilters = clearFilters;
window.importJobsFromJSON = importJobsFromJSON;
window.scrollToTop = scrollToTop;
<!-- הוסף את זה ב-hero-section אחרי ה-container -->
<div class="gnome-character" id="mainGnome">
    <img src="https://cdn.pixabay.com/photo/2017/01/31/16/49/dwarf-2023281_960_720.png" 
         alt="גמדה עוזרת" 
         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDAiIGZpbGw9IiNGNjk4OTgiLz48dGV4dCB4PSI1MCIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE0Ij7XnNeT15TXkjwvdGV4dD48L3N2Zz4='"
         loading="lazy">
    <div class="gnome-tooltip">אני אעזור לך למצוא משרה!</div>
</div>

<style>
/* CSS מיוחד לתיקון הגמדה */
.gnome-character {
    position: absolute !important;
    bottom: 20px !important;
    right: 10% !important;
    width: 120px !important;
    height: auto !important;
    cursor: pointer !important;
    transition: transform 0.3s ease !important;
    z-index: 100 !important;
    animation: float 3s ease-in-out infinite !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: auto !important;
}

.gnome-character img {
    width: 100% !important;
    height: auto !important;
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3)) !important;
    display: block !important;
}

.gnome-character:hover {
    transform: scale(1.1) !important;
}

.gnome-tooltip {
    position: absolute !important;
    background: #2D2D2D !important;
    color: white !important;
    padding: 8px 12px !important;
    border-radius: 6px !important;
    font-size: 12px !important;
    top: -50px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    opacity: 0 !important;
    visibility: hidden !important;
    transition: all 0.3s ease !important;
    white-space: nowrap !important;
    z-index: 20 !important;
    border: 2px solid #F69898 !important;
}

.gnome-character:hover .gnome-tooltip {
    opacity: 1 !important;
    visibility: visible !important;
}

.gnome-tooltip::after {
    content: '' !important;
    position: absolute !important;
    bottom: -8px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    border-left: 8px solid transparent !important;
    border-right: 8px solid transparent !important;
    border-top: 8px solid #2D2D2D !important;
}

@keyframes float {
    0%, 100% { 
        transform: translateY(0px); 
    }
    50% { 
        transform: translateY(-10px); 
    }
}

/* תיקון למובייל */
@media (max-width: 768px) {
    .gnome-character {
        width: 90px !important;
        right: 5% !important;
        bottom: 15px !important;
    }
}

/* תיקון לטאבלט */
@media (max-width: 1024px) and (min-width: 769px) {
    .gnome-character {
        width: 100px !important;
        right: 8% !important;
    }
}

/* וידוא שהגמדה תמיד נראית */
.hero-section {
    position: relative !important;
    overflow: visible !important;
}

/* תיקון אם יש קונפליקטים אחרים */
.gnome-character,
#mainGnome {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    position: absolute !important;
}
</style>

<script>
// JavaScript לוידוא שהגמדה נראית
document.addEventListener('DOMContentLoaded', function() {
    // חיפוש הגמדה
    let gnome = document.querySelector('.gnome-character');
    
    if (!gnome) {
        console.warn('הגמדה לא נמצאה - יוצר חדשה');
        createGnome();
    } else {
        console.log('הגמדה נמצאה - מוודא שהיא נראית');
        ensureGnomeVisible(gnome);
    }
    
    // בדיקה נוספת אחרי שנייה
    setTimeout(function() {
        checkGnomeVisibility();
    }, 1000);
});

function createGnome() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const gnomeHTML = `
        <div class="gnome-character" id="mainGnome">
            <img src="https://cdn.pixabay.com/photo/2017/01/31/16/49/dwarf-2023281_960_720.png" 
                 alt="גמדה עוזרת" 
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDAiIGZpbGw9IiNGNjk4OTgiLz48dGV4dCB4PSI1MCIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE0Ij7XnNeT15TXkjwvdGV4dD48L3N2Zz4='">
            <div class="gnome-tooltip">אני אעזור לך למצוא משרה!</div>
        </div>
    `;
    
    heroSection.insertAdjacentHTML('beforeend', gnomeHTML);
    console.log('✅ גמדה חדשה נוצרה');
}

function ensureGnomeVisible(gnome) {
    // וידוא שכל המאפיינים נכונים
    gnome.style.display = 'block';
    gnome.style.visibility = 'visible';
    gnome.style.opacity = '1';
    gnome.style.position = 'absolute';
    gnome.style.zIndex = '100';
    gnome.style.bottom = '20px';
    gnome.style.right = '10%';
    gnome.style.width = '120px';
    gnome.style.animation = 'float 3s ease-in-out infinite';
    
    console.log('✅ הגמדה הוגדרה כנראית');
}

function checkGnomeVisibility() {
    const gnome = document.querySelector('.gnome-character');
    
    if (!gnome) {
        console.error('❌ הגמדה עדיין לא נמצאת!');
        createGnome();
        return;
    }
    
    // בדיקת נראות
    const rect = gnome.getBoundingClientRect();
    const isVisible = rect.width > 0 && rect.height > 0;
    
    console.log('בדיקת נראות הגמדה:', {
        קיימת: !!gnome,
        נראית: isVisible,
        רוחב: rect.width,
        גובה: rect.height,
        מיקום: { top: rect.top, left: rect.left }
    });
    
    if (!isVisible) {
        console.warn('⚠️ הגמדה לא נראית - מתקן...');
        ensureGnomeVisible(gnome);
    }
}

// הוספת קליק לגמדה לגלילה למעלה
document.addEventListener('click', function(e) {
    if (e.target.closest('.gnome-character')) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});
</script>
