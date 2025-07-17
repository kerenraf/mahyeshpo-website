// מילון הטיות נפוצות בעברית (זכר/נקבה/רבים)
const inflectionDictionary = {
    // תפקידים והטיות
    "מנהל": ["מנהלת", "מנהלים", "מנהלות", "ניהול"],
    "מנהלת": ["מנהל", "מנהלים", "מנהלות", "ניהול"],
    "מפתח": ["מפתחת", "מפתחים", "מפתחות", "פיתוח"],
    "מפתחת": ["מפתח", "מפתחים", "מפתחות", "פיתוח"],
    "מתכנת": ["מתכנתת", "מתכנתים", "מתכנתות", "תכנות"],
    "מתכנתת": ["מתכנת", "מתכנתים", "מתכנתות", "תכנות"],
    "מורה": ["מורים", "מורות", "הוראה"],
    "מוכר": ["מוכרת", "מוכרים", "מוכרות", "מכירות"],
    "מוכרת": ["מוכר", "מוכרים", "מוכרות", "מכירות"],
    "אחראי": ["אחראית", "אחראים", "אחראיות", "אחריות"],
    "אחראית": ["אחראי", "אחראים", "אחראיות", "אחריות"],
    "עובד": ["עובדת", "עובדים", "עובדות", "עבודה"],
    "עובדת": ["עובד", "עובדים", "עובדות", "עבודה"],
    "מהנדס": ["מהנדסת", "מהנדסים", "מהנדסות", "הנדסה"],
    "מהנדסת": ["מהנדס", "מהנדסים", "מהנדסות", "הנדסה"],
    "מעצב": ["מעצבת", "מעצבים", "מעצבות", "עיצוב"],
    "מעצבת": ["מעצב", "מעצבים", "מעצבות", "עיצוב"],
    "מנקה": ["מנקים", "מנקות", "ניקיון"],
    "אח": ["אחות", "אחים", "אחיות"],
    "אחות": ["אח", "אחים", "אחיות"],
    "נהג": ["נהגת", "נהגים", "נהגות", "נהיגה"],
    "נהגת": ["נהג", "נהגים", "נהגות", "נהיגה"],
    "מזכיר": ["מזכירה", "מזכירים", "מזכירות"],
    "מזכירה": ["מזכיר", "מזכירים", "מזכירות"],
    
    // תחומי עבודה והטיות
    "מכירות": ["מכירה", "מוכר", "מוכרת"],
    "שיווק": ["משווק", "משווקת", "שיווקי", "שיווקית"],
    "תכנות": ["מתכנת", "מתכנתת", "תכנות", "קוד", "פיתוח"],
    "פיתוח": ["מפתח", "מפתחת", "פיתוח", "תוכנה"],
    "הייטק": ["טכנולוגיה", "מחשבים", "תוכנה", "פיתוח"],
    "הוראה": ["מורה", "מורים", "מורות", "חינוך", "הדרכה"],
    "לוגיסטיקה": ["שילוח", "מחסן", "מחסנאי", "מחסנאית"],
    "מסעדה": ["מסעדנות", "שף", "שפית", "טבח", "טבחית", "מלצר", "מלצרית"],
    "רפואה": ["רופא", "רופאה", "אח", "אחות", "בריאות"],
    "אבטחה": ["מאבטח", "מאבטחת", "שמירה", "שומר", "שומרת"],
    
    // מילים נרדפות שכיחות
    "משרה": ["תפקיד", "עבודה", "משרות", "ג'וב", "גוב"],
    "עבודה": ["תפקיד", "משרה", "ג'וב", "גוב"],
    "משכורת": ["שכר", "תשלום", "תגמול"],
    "שכר": ["משכורת", "תשלום", "תגמול"],
    "נסיון": ["ניסיון", "וותק", "ידע"],
    "ניסיון": ["נסיון", "וותק", "ידע"],
    
    // מילות קישור ומילות יחס להתעלמות
    "של": [],
    "עם": [],
    "את": [],
    "בתחום": [],
    "ב": [],
    "ל": [],
    "דרוש": ["דרושה", "דרושים", "דרושות"],
    "דרושה": ["דרוש", "דרושים", "דרושות"]
};

// פונקציה להרחבת מילות החיפוש עם הטיות וצורות חלופיות
function expandSearchTerms(searchText) {
    if (!searchText) return [];
    
    // פיצול לפי רווחים
    const terms = searchText.toLowerCase().trim().split(/\s+/);
    const expandedTerms = new Set();
    
    // הוספת המילים המקוריות לסט
    terms.forEach(term => expandedTerms.add(term));
    
    // הרחבת כל מילה עם הטיות אפשריות
    terms.forEach(term => {
        // הוספת מילה ללא ו' החיבור/ה' הידיעה אם קיימת
        if (term.startsWith('ו') && term.length > 1) {
            expandedTerms.add(term.substring(1));
        }
        if (term.startsWith('ה') && term.length > 1) {
            expandedTerms.add(term.substring(1));
        }
        if (term.startsWith('ש') && term.length > 1) {
            expandedTerms.add(term.substring(1));
        }
        if (term.startsWith('ב') && term.length > 1) {
            expandedTerms.add(term.substring(1));
        }
        if (term.startsWith('ל') && term.length > 1) {
            expandedTerms.add(term.substring(1));
        }
        
        // הוספת הטיות מהמילון
        if (inflectionDictionary[term]) {
            inflectionDictionary[term].forEach(inflection => {
                expandedTerms.add(inflection.toLowerCase());
            });
        }
    });
    
    return Array.from(expandedTerms);
}

// פונקציית עזר להגבלת קצב הקריאות לפונקציה (debounce)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// פונקציה לעדכון הצעות החיפוש
function updateSuggestions(matchingJobs, searchText, container) {
    // ניקוי ההצעות הקיימות
    container.innerHTML = '';
    
    if (matchingJobs.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    // יצירת סט של הצעות ייחודיות מכותרות המשרות המתאימות
    const suggestions = new Set();
    
    // הוספת כותרות משרות
    matchingJobs.forEach(job => {
        if (job.title) {
            suggestions.add(job.title);
        }
    });
    
    // הוספת קטגוריות
    matchingJobs.forEach(job => {
        if (job.category) {
            suggestions.add(job.category);
        }
    });
    
    // הגבלה ל-5 הצעות לכל היותר
    const topSuggestions = Array.from(suggestions).slice(0, 5);
    
    if (topSuggestions.length > 0) {
        // יצירת אלמנטים להצעות
        topSuggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('div');
            suggestionElement.className = 'search-suggestion';
            suggestionElement.textContent = suggestion;
            suggestionElement.style.padding = '8px 12px';
            suggestionElement.style.borderBottom = '1px solid #eee';
            suggestionElement.style.cursor = 'pointer';
            
            // הדגשת מילת החיפוש בתוך ההצעה
            if (searchText && suggestion.toLowerCase().includes(searchText.toLowerCase())) {
                const regex = new RegExp(`(${searchText})`, 'gi');
                suggestionElement.innerHTML = suggestion.replace(regex, '<strong>$1</strong>');
            }
            
            // הוספת הצעה למיכל
            container.appendChild(suggestionElement);
            
            // הוספת אפקט hover
            suggestionElement.addEventListener('mouseover', function() {
                this.style.backgroundColor = '#f5f5f5';
            });
            
            suggestionElement.addEventListener('mouseout', function() {
                this.style.backgroundColor = 'white';
            });
        });
        
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

// פונקציה לאתחול חיפוש דינמי
function initDynamicSearch() {
    // הוספת סגנונות CSS למיכל ההצעות
    const style = document.createElement('style');
    style.textContent = `
        .search-suggestions {
            display: none;
            position: absolute;
            width: 100%;
            max-height: 200px;
            overflow-y: auto;
            background: white;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 4px 4px;
            z-index: 100;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .search-suggestion {
            padding: 8px 12px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
        }
        
        .search-suggestion:hover {
            background-color: #f5f5f5;
        }
        
        .search-suggestion strong {
            color: #f69898;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);

    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        // יצירת אלמנט להצעות חיפוש
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        
        // הוספת מיכל ההצעות אחרי שדה החיפוש
        searchInput.parentNode.style.position = 'relative';
        searchInput.parentNode.appendChild(suggestionsContainer);
        
        // מאזין לאירוע הקלדה בשדה החיפוש
        searchInput.addEventListener('input', debounce(function() {
            const searchText = this.value.trim().toLowerCase();
            
            if (searchText.length < 2) {
                suggestionsContainer.style.display = 'none';
                return;
            }
            
            // הרחבת מילות החיפוש
            const expandedTerms = expandSearchTerms(searchText);
            
            // סינון משרות לפי החיפוש המורחב
            const matchingJobs = jobs.filter(job => {
                // בדיקה בסיסית למילות חיפוש מקוריות
                const basicMatch = !searchText || 
                    job.title.toLowerCase().includes(searchText) ||
                    (job.company && job.company.toLowerCase().includes(searchText)) ||
                    (job.description && job.description.toLowerCase().includes(searchText));
                
                if (basicMatch) return true;
                
                // בדיקה מורחבת לכל ההטיות
                for (const term of expandedTerms) {
                    if (
                        job.title.toLowerCase().includes(term) ||
                        (job.company && job.company.toLowerCase().includes(term)) ||
                        (job.description && job.description.toLowerCase().includes(term))
                    ) {
                        return true;
                    }
                }
                
                return false;
            }).filter(job => job.status === 'פעיל');
            
            // הצגת הצעות בהתבסס על המשרות המתאימות
            updateSuggestions(matchingJobs, searchText, suggestionsContainer);
            
            // הרצת החיפוש באופן אוטומטי אם יש תוצאות
            if (matchingJobs.length > 0) {
                // הצגת התוצאות
                displayJobs(matchingJobs);
            }
        }, 300)); // השהייה של 300 מילישניות למניעת חיפושים מיותרים
        
        // טיפול בלחיצה על הצעה
        suggestionsContainer.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('search-suggestion')) {
                searchInput.value = e.target.textContent;
                suggestionsContainer.style.display = 'none';
                
                // ביצוע חיפוש עם ההצעה שנבחרה
                searchJobs();
            }
        });
        
        // הסתרת ההצעות כשמקליקים מחוץ לאזור החיפוש
        document.addEventListener('click', function(e) {
            if (e.target !== searchInput && e.target !== suggestionsContainer) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }
}

// פונקציה לחיפוש משרות - גרסה משודרגת
function searchJobs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const region = document.getElementById('regionFilter').value;
    
    // הרחבת מילות החיפוש עם הטיות
    const expandedTerms = expandSearchTerms(searchTerm);
    
    const filteredJobs = jobs.filter(job => {
        // בדיקת התאמה לחיפוש טקסט חופשי
        let matchesSearch = !searchTerm;
        
        if (searchTerm) {
            // בדיקת התאמה בסיסית
            matchesSearch = job.title.toLowerCase().includes(searchTerm) ||
                (job.company && job.company.toLowerCase().includes(searchTerm)) ||
                (job.description && job.description.toLowerCase().includes(searchTerm));
            
            // בדיקה מורחבת עם הטיות אם לא נמצאה התאמה בסיסית
            if (!matchesSearch && expandedTerms.length > 0) {
                for (const term of expandedTerms) {
                    if (
                        job.title.toLowerCase().includes(term) ||
                        (job.company && job.company.toLowerCase().includes(term)) ||
                        (job.description && job.description.toLowerCase().includes(term))
                    ) {
                        matchesSearch = true;
                        break;
                    }
                }
            }
        }
        
        // בדיקת התאמה לקטגוריה
        const matchesCategory = !category || job.category === category;
        
        // בדיקה מורחבת של התאמה לאזור - בודקת גם בשדה location וגם בשדה region
        const matchesRegion = !region || 
            job.region === region || 
            (job.location && job.location.includes(region));
        
        return matchesSearch && matchesCategory && matchesRegion;
    });
    
    displayJobs(filteredJobs);
}

// אתחול מערכת החיפוש הדינמי בטעינת העמוד
document.addEventListener('DOMContentLoaded', function() {
    // אתחול מערכת החיפוש הדינמי
    initDynamicSearch();
    
    // הוספת מאזיני אירועים לכפתורי חיפוש
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', searchJobs);
    }
    
    const clearButton = document.getElementById('clearButton');
    if (clearButton) {
        clearButton.addEventListener('click', clearFilters);
    }
    
    // אתחול תצוגת המשרות
    displayJobs();
});
