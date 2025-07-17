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

// פונקציה לבדיקה אם המכשיר הוא מובייל
function isMobileDevice() {
    return (window.innerWidth <= 768) || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// פונקציה לעדכון הצעות החיפוש - עם התאמות למובייל
function updateSuggestions(matchingJobs, searchText, container) {
    // ניקוי ההצעות הקיימות
    container.innerHTML = '';
    
    if (matchingJobs.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    // יצירת סט של הצעות ייחודיות מכותרות המשרות המתאימות
    const suggestions = new Set();
    
    // יצירת מפה של מילים קשורות להצעות (להצגת מידע נוסף)
    const relatedTermsMap = new Map();
    
    // הוספת כותרות משרות
    matchingJobs.forEach(job => {
        if (job.title) {
            suggestions.add(job.title);
            
            // חיפוש הטיות קשורות לכותרת המשרה
            const words = job.title.toLowerCase().split(/\s+/);
            const relatedTerms = [];
            
            words.forEach(word => {
                if (inflectionDictionary[word] && inflectionDictionary[word].length > 0) {
                    // בחירת עד 3 הטיות רלוונטיות
                    const relevantInflections = inflectionDictionary[word].slice(0, 3);
                    relatedTerms.push(...relevantInflections);
                }
            });
            
            if (relatedTerms.length > 0) {
                relatedTermsMap.set(job.title, [...new Set(relatedTerms)]);
            }
        }
    });
    
    // הוספת קטגוריות
    matchingJobs.forEach(job => {
        if (job.category) {
            suggestions.add(job.category);
            
            // הוספת הטיות רלוונטיות לקטגוריה
            if (inflectionDictionary[job.category.toLowerCase()]) {
                const categoryRelated = inflectionDictionary[job.category.toLowerCase()].slice(0, 3);
                if (categoryRelated.length > 0) {
                    relatedTermsMap.set(job.category, categoryRelated);
                }
            }
        }
    });
    
    // הגבלה ל-5 הצעות לכל היותר
    const topSuggestions = Array.from(suggestions).slice(0, 5);
    
    if (topSuggestions.length > 0) {
        // יצירת אלמנטים להצעות
        topSuggestions.forEach(suggestion => {
            const suggestionWrapper = document.createElement('div');
            suggestionWrapper.className = 'search-suggestion-wrapper';
            
            const suggestionElement = document.createElement('div');
            suggestionElement.className = 'search-suggestion';
            
            // התאמות למובייל - מרווחים גדולים יותר למסך מגע
            const isMobile = isMobileDevice();
            suggestionElement.style.padding = isMobile ? '12px 16px' : '8px 12px';
            suggestionElement.style.fontSize = isMobile ? '16px' : '14px';
            suggestionElement.style.borderBottom = '1px solid #eee';
            suggestionElement.style.cursor = 'pointer';
            
            // הדגשת מילת החיפוש בתוך ההצעה
            if (searchText && suggestion.toLowerCase().includes(searchText.toLowerCase())) {
                const regex = new RegExp(`(${searchText})`, 'gi');
                suggestionElement.innerHTML = suggestion.replace(regex, '<strong>$1</strong>');
            } else {
                suggestionElement.textContent = suggestion;
            }
            
            // הוספת הצעה לעטיפה
            suggestionWrapper.appendChild(suggestionElement);
            
            // הוספת מילים קשורות אם יש
            if (relatedTermsMap.has(suggestion) && relatedTermsMap.get(suggestion).length > 0) {
                const relatedElement = document.createElement('div');
                relatedElement.className = 'related-terms';
                relatedElement.style.fontSize = isMobile ? '14px' : '12px';
                relatedElement.style.color = '#888';
                relatedElement.style.padding = isMobile ? '0 16px 12px 16px' : '0 12px 8px 12px';
                
                // טקסט למילים קשורות
                const relatedTerms = relatedTermsMap.get(suggestion);
                relatedElement.textContent = 'קשור: ' + relatedTerms.join(', ');
                
                // הוספת המילים הקשורות לעטיפה
                suggestionWrapper.appendChild(relatedElement);
            }
            
            // הוספת העטיפה למיכל
            container.appendChild(suggestionWrapper);
            
            // הוספת אפקט hover רק למחשב (לא למובייל)
            if (!isMobile) {
                suggestionWrapper.addEventListener('mouseover', function() {
                    this.style.backgroundColor = '#f5f5f5';
                });
                
                suggestionWrapper.addEventListener('mouseout', function() {
                    this.style.backgroundColor = 'white';
                });
            }
        });
        
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

// פונקציה לאתחול חיפוש דינמי - מותאם למובייל
function initDynamicSearch() {
    // הוספת סגנונות CSS למיכל ההצעות - כולל התאמות למובייל
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
            cursor: pointer;
        }
        
        .search-suggestion-wrapper {
            border-bottom: 1px solid #eee;
        }
        
        .search-suggestion-wrapper:last-child {
            border-bottom: none;
        }
        
        .search-suggestion-wrapper:hover {
            background-color: #f5f5f5;
        }
        
        .related-terms {
            font-size: 12px;
            color: #888;
            padding: 0 12px 8px 12px;
            cursor: pointer;
        }
        
        .search-suggestion strong {
            color: #f69898;
            font-weight: bold;
        }
        
        /* התאמות למובייל */
        @media (max-width: 768px) {
            #searchInput, 
            #categoryFilter, 
            #regionFilter, 
            #searchButton, 
            #clearButton {
                height: 44px;
                font-size: 16px; /* גודל פונט מומלץ למובייל למניעת זום אוטומטי */
            }
            
            .search-suggestions {
                max-height: 240px; /* גבוה יותר במובייל */
            }
            
            .search-suggestion {
                padding: 12px 16px; /* גדול יותר למסך מגע */
                font-size: 16px;
            }
            
            .related-terms {
                font-size: 14px;
                padding: 0 16px 12px 16px;
            }
            
            /* סגנונות ספציפיים לפילטרים */
            .search-filters {
                display: flex;
                flex-direction: column;
            }
            
            .search-filters select, 
            .search-filters input, 
            .search-filters button {
                margin-bottom: 8px;
                width: 100%;
            }
            
            /* כפתורים נוחים יותר ללחיצה במובייל */
            .search-filters button {
                padding: 12px 16px;
            }
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
        
        // התאמת שדה החיפוש למובייל
        if (isMobileDevice()) {
            searchInput.style.fontSize = '16px'; // מונע זום אוטומטי בספארי מובייל
            searchInput.style.height = '44px'; // גדול יותר לנוחות הקלדה
        }
        
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
        
        // טיפול בלחיצה/נגיעה על הצעה
        suggestionsContainer.addEventListener('click', function(e) {
            // מציאת האלמנט של ההצעה או העטיפה שלה
            let targetElement = e.target;
            while (targetElement && !targetElement.classList.contains('search-suggestion-wrapper') && 
                   !targetElement.classList.contains('search-suggestion') &&
                   !targetElement.classList.contains('related-terms')) {
                targetElement = targetElement.parentElement;
            }
            
            if (!targetElement) return;
            
            let suggestionText = '';
            
            // אם לחצו על המילים הקשורות, נשתמש בטקסט שלהן
            if (targetElement.classList.contains('related-terms')) {
                // אם המשתמש לחץ על מילה ספציפית בתוך ה-related-terms
                const clickedText = window.getSelection().toString().trim();
                if (clickedText && targetElement.textContent.includes(clickedText)) {
                    suggestionText = clickedText;
                } else {
                    // אם לא נבחר טקסט ספציפי, נשתמש במילה הראשונה אחרי "קשור: "
                    const relatedContent = targetElement.textContent.trim();
                    const match = relatedContent.match(/קשור:\s*([^,]+)/);
                    if (match && match[1]) {
                        suggestionText = match[1].trim();
                    }
                }
            } 
            // אם לחצו על העטיפה, נשתמש בטקסט של ההצעה שבתוכה
            else if (targetElement.classList.contains('search-suggestion-wrapper')) {
                const suggestionEl = targetElement.querySelector('.search-suggestion');
                if (suggestionEl) {
                    suggestionText = suggestionEl.textContent.trim();
                }
            }
            // אם לחצו על ההצעה עצמה
            else if (targetElement.classList.contains('search-suggestion')) {
                suggestionText = targetElement.textContent.trim();
            }
            
            // אם מצאנו טקסט, נבצע חיפוש
            if (suggestionText) {
                searchInput.value = suggestionText;
                suggestionsContainer.style.display = 'none';
                
                // ביצוע חיפוש עם ההצעה שנבחרה
                searchJobs();
                
                // במובייל - סגירת המקלדת
                if (isMobileDevice()) {
                    searchInput.blur();
                }
            }
        });
        
        // מאזיני אירועי מגע ספציפיים למובייל
        if (isMobileDevice()) {
            suggestionsContainer.addEventListener('touchstart', function(e) {
                // מציאת האלמנט הנכון - עטיפה או הצעה
                let targetElement = e.target;
                while (targetElement && !targetElement.classList.contains('search-suggestion-wrapper') && 
                       !targetElement.classList.contains('search-suggestion')) {
                    targetElement = targetElement.parentElement;
                }
                
                if (targetElement) {
                    // אם נמצא עטיפה, שנה את הרקע שלה
                    if (targetElement.classList.contains('search-suggestion-wrapper')) {
                        targetElement.style.backgroundColor = '#f0f0f0';
                    } 
                    // אם נמצאה הצעה, שנה את הרקע של ההורה שלה אם יש
                    else if (targetElement.classList.contains('search-suggestion') && 
                             targetElement.parentElement.classList.contains('search-suggestion-wrapper')) {
                        targetElement.parentElement.style.backgroundColor = '#f0f0f0';
                    } 
                    // אחרת שנה את הרקע של ההצעה עצמה
                    else if (targetElement.classList.contains('search-suggestion')) {
                        targetElement.style.backgroundColor = '#f0f0f0';
                    }
                }
            }, { passive: true });
            
            suggestionsContainer.addEventListener('touchend', function(e) {
                // מציאת האלמנט הנכון - עטיפה או הצעה
                let targetElement = e.target;
                while (targetElement && !targetElement.classList.contains('search-suggestion-wrapper') && 
                       !targetElement.classList.contains('search-suggestion')) {
                    targetElement = targetElement.parentElement;
                }
                
                if (targetElement) {
                    // אם נמצא עטיפה, שנה את הרקע שלה
                    if (targetElement.classList.contains('search-suggestion-wrapper')) {
                        targetElement.style.backgroundColor = 'white';
                    } 
                    // אם נמצאה הצעה, שנה את הרקע של ההורה שלה אם יש
                    else if (targetElement.classList.contains('search-suggestion') && 
                             targetElement.parentElement.classList.contains('search-suggestion-wrapper')) {
                        targetElement.parentElement.style.backgroundColor = 'white';
                    } 
                    // אחרת שנה את הרקע של ההצעה עצמה
                    else if (targetElement.classList.contains('search-suggestion')) {
                        targetElement.style.backgroundColor = 'white';
                    }
                }
            }, { passive: true });
        }
        
        // הסתרת ההצעות כשמקליקים מחוץ לאזור החיפוש
        document.addEventListener('click', function(e) {
            if (e.target !== searchInput && e.target !== suggestionsContainer) {
                suggestionsContainer.style.display = 'none';
            }
        });
        
        // הוספת מאזין לאירוע פוקוס לשדה החיפוש - שימושי במובייל
        searchInput.addEventListener('focus', function() {
            // אם יש כבר טקסט בשדה החיפוש, הצג את ההצעות
            if (this.value.trim().length >= 2) {
                const searchText = this.value.trim().toLowerCase();
                
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
            }
        });
    }
    
    // התאמת פילטרים למובייל
    adjustFiltersForMobile();
}

// פונקציה להתאמת הפילטרים למובייל
function adjustFiltersForMobile() {
    if (!isMobileDevice()) return;
    
    const filtersContainer = document.querySelector('.search-filters');
    if (filtersContainer) {
        filtersContainer.style.flexDirection = 'column';
        
        // מציאת כל הפילטרים והכפתורים
        const inputs = filtersContainer.querySelectorAll('input, select, button');
        inputs.forEach(input => {
            input.style.marginBottom = '8px';
            input.style.width = '100%';
            
            // התאמה ספציפית לכפתורים
            if (input.tagName === 'BUTTON') {
                input.style.padding = '12px 16px';
                input.style.fontSize = '16px';
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

// פונקציה לניקוי הפילטרים
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('regionFilter').value = '';
    
    // הסתרת ההצעות
    const suggestionsContainer = document.querySelector('.search-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
    
    // הצגת כל המשרות הפעילות
    const activeJobs = jobs.filter(job => job.status === 'פעיל');
    displayJobs(activeJobs);
}

// מאזיני אירועים לשינוי כיוון מסך במובייל
window.addEventListener('orientationchange', function() {
    // התאמת הפילטרים שוב לאחר שינוי כיוון המסך
    setTimeout(adjustFiltersForMobile, 300);
});

// מאזין לשינוי גודל החלון
window.addEventListener('resize', debounce(function() {
    // התאמת הפילטרים מחדש לאחר שינוי גודל החלון
    adjustFiltersForMobile();
}, 250));

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
