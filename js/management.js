// משתנים לדף ניהול
let currentPage = 1;
let itemsPerPage = 5;
let filteredJobs = [...jobs];

// אתחול דף הניהול
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('jobsTableBody')) {
        displayJobsTable();
        setupPagination();
    }
});

// הצגת טבלת משרות
function displayJobsTable() {
    const tbody = document.getElementById('jobsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageJobs = filteredJobs.slice(start, end);
    
    if (pageJobs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px;">לא נמצאו משרות</td></tr>`;
        return;
    }
    
    pageJobs.forEach(job => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${job.jobNumber || '-'}</td>
            <td>${job.title}</td>
            <td>${job.company || '-'}</td>
            <td>${job.category || '-'}</td>
            <td>${job.location || '-'}</td>
            <td class="${job.status === 'פעיל' ? 'status-active' : 'status-inactive'}">${job.status || 'לא פעיל'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-view" onclick="viewJob(${job.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-edit" onclick="editJob(${job.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-delete" onclick="deleteJob(${job.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

// הגדרת דפדוף
function setupPagination() {
    const pagination = document.getElementById('jobsPagination');
    if (!pagination) return;
    
    const pageCount = Math.ceil(filteredJobs.length / itemsPerPage);
    pagination.innerHTML = '';
    
    // כפתור הקודם
    if (pageCount > 1) {
        const prevBtn = document.createElement('div');
        prevBtn.className = 'page-item';
        prevBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                displayJobsTable();
                setupPagination();
            }
        };
        pagination.appendChild(prevBtn);
    }
    
    // מספרי עמודים
    for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement('div');
        pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageItem.textContent = i;
        pageItem.onclick = () => {
            currentPage = i;
            displayJobsTable();
            setupPagination();
        };
        pagination.appendChild(pageItem);
    }
    
    // כפתור הבא
    if (pageCount > 1) {
        const nextBtn = document.createElement('div');
        nextBtn.className = 'page-item';
        nextBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        nextBtn.onclick = () => {
            if (currentPage < pageCount) {
                currentPage++;
                displayJobsTable();
                setupPagination();
            }
        };
        pagination.appendChild(nextBtn);
    }
}

// סינון טבלת משרות
function filterJobsList() {
    const searchTerm = document.getElementById('searchJobsInput').value.toLowerCase();
    const category = document.getElementById('categoryFilterAdmin').value;
    const status = document.getElementById('statusFilterAdmin').value;
    
    filteredJobs = jobs.filter(job => {
        const matchesSearch = !searchTerm || 
            job.title.toLowerCase().includes(searchTerm) ||
            (job.company && job.company.toLowerCase().includes(searchTerm)) ||
            (job.jobNumber && job.jobNumber.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !category || job.category === category;
        const matchesStatus = !status || job.status === status;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });
    
    currentPage = 1;
    displayJobsTable();
    setupPagination();
}

// איפוס סינונים
function clearJobsFilters() {
    document.getElementById('searchJobsInput').value = '';
    document.getElementById('categoryFilterAdmin').value = '';
    document.getElementById('statusFilterAdmin').value = '';
    
    filteredJobs = [...jobs];
    currentPage = 1;
    displayJobsTable();
    setupPagination();
}

// פתיחת מודל ייבוא
function openImportModal() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('import-section').style.display = 'none';
    document.getElementById('password').value = '';
    
    document.getElementById('import-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// סגירת מודל ייבוא
function closeImportModal() {
    document.getElementById('import-modal').style.display = 'none';
    document.body.style.overflow = '';
}

// בדיקת סיסמה
function checkLogin() {
    const password = document.getElementById('password').value;
    
    // בדיקת סיסמה - במקרה זה סיסמה קבועה לדוגמה
    if (password === '123456') {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('import-section').style.display = 'block';
    } else {
        alert('סיסמה שגויה, נסה שנית');
    }
}

// טיפול בהעלאת קובץ
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            let importedJobs = [];
            
            if (file.name.endsWith('.csv')) {
                // עיבוד קובץ CSV
                importedJobs = parseCSV(e.target.result);
            } else if (file.name.endsWith('.json')) {
                // עיבוד קובץ JSON
                importedJobs = JSON.parse(e.target.result);
            } else {
                throw new Error('פורמט קובץ לא נתמך. יש להשתמש בקובץ CSV או JSON.');
            }
            
            // הוספת המשרות למאגר
            if (Array.isArray(importedJobs) && importedJobs.length > 0) {
                let addedCount = 0;
                
                importedJobs.forEach(job => {
                    // יצירת מזהה ייחודי
                    const maxId = Math.max(...jobs.map(j => j.id), 0);
                    job.id = maxId + 1 + addedCount;
                    
                    // וידוא שדות חובה
                    if (!job.title) {
                        throw new Error('אחת המשרות חסרה כותרת. כל משרה חייבת להכיל כותרת.');
                    }
                    
                    // הוספת שדות ברירת מחדל אם חסרים
                    job.status = job.status || 'פעיל';
                    job.jobType = job.jobType || 'משרה מלאה';
                    job.category = job.category || 'אחר';
                    
                    // הוספה למאגר
                    jobs.push(job);
                    addedCount++;
                });
                
                alert(`יובאו ${addedCount} משרות בהצלחה!`);
                closeImportModal();
                
                // עדכון הטבלה
                filteredJobs = [...jobs];
                currentPage = 1;
                displayJobsTable();
                setupPagination();
            } else {
                throw new Error('לא נמצאו משרות בקובץ או שמבנה הקובץ שגוי.');
            }
        } catch (error) {
            alert(`שגיאה בייבוא: ${error.message}`);
            console.error('Import error:', error);
        }
    };
    
    reader.onerror = function() {
        alert('אירעה שגיאה בקריאת הקובץ.');
    };
    
    if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
    } else if (file.name.endsWith('.json')) {
        reader.readAsText(file);
    } else {
        alert('פורמט קובץ לא נתמך. יש להשתמש בקובץ CSV או JSON.');
    }
}

// עיבוד קובץ CSV
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    if (lines.length < 2) {
        throw new Error('קובץ CSV ריק או לא תקין.');
    }
    
    // זיהוי שמות העמודות
    const headers = lines[0].split(',').map(header => header.trim());
    
    // מיפוי שמות עמודות (תמיכה בעברית ואנגלית)
    const columnMap = {
        'מספר משרה': 'jobNumber',
        'כותרת': 'title',
        'חברה': 'company',
        'קטגוריה': 'category',
        'עיר': 'city',
        'אזור': 'region',
        'מיקום': 'location',
        'סוג משרה': 'jobType',
        'תיאור': 'description',
        'דרישות': 'requirements',
        'סטטוס': 'status',
        // אנגלית
        'job number': 'jobNumber',
        'title': 'title',
        'company': 'company',
        'category': 'category',
        'city': 'city',
        'region': 'region',
        'location': 'location',
        'job type': 'jobType',
        'description': 'description',
        'requirements': 'requirements',
        'status': 'status'
    };
    
    // המרת שמות עמודות למפתחות
    const mappedHeaders = headers.map(header => columnMap[header.toLowerCase()] || header);
    
    // עיבוד שורות הנתונים
    const jobs = [];
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue; // דילוג על שורות ריקות
        
        const values = lines[i].split(',').map(value => value.trim());
        
        if (values.length !== headers.length) {
            console.warn(`שורה ${i} מכילה מספר עמודות שונה מהכותרת ותידלג.`);
            continue;
        }
        
        const job = {};
        mappedHeaders.forEach((key, index) => {
            job[key] = values[index];
        });
        
        jobs.push(job);
    }
    
    return jobs;
}

// הורדת תבנית CSV
function downloadTemplate() {
    const headers = ['מספר משרה', 'כותרת', 'חברה', 'קטגוריה', 'עיר', 'אזור', 'סוג משרה', 'תיאור', 'דרישות', 'סטטוס'];
    const sample = ['JS001', 'מפתח/ת Full Stack', 'חברת טכנולוגיה בע"מ', 'פיתוח ותוכנה', 'תל אביב', 'מרכז', 'משרה מלאה', 'תיאור המשרה כאן', 'דרישות התפקיד כאן', 'פעיל'];
    
    let csvContent = headers.join(',') + '\n' + sample.join(',');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'template.csv');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ייצוא משרות
function exportJobs() {
    // יצירת תוכן CSV
    const headers = ['מספר משרה', 'כותרת', 'חברה', 'קטגוריה', 'עיר', 'אזור', 'מיקום', 'סוג משרה', 'תיאור', 'דרישות', 'סטטוס'];
    
    let csvContent = headers.join(',') + '\n';
    
    jobs.forEach(job => {
        const row = [
            job.jobNumber || '',
            job.title || '',
            job.company || '',
            job.category || '',
            job.city || '',
            job.region || '',
            job.location || '',
            job.jobType || '',
            job.description ? `"${job.description.replace(/"/g, '""')}"` : '',
            job.requirements ? `"${job.requirements.replace(/"/g, '""')}"` : '',
            job.status || ''
        ];
        
        csvContent += row.join(',') + '\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'jobs_export.csv');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// פתיחת מודל הוספת משרה
function openAddJobModal() {
    document.getElementById('edit-modal-title').textContent = 'הוספת משרה חדשה';
    
    // איפוס הטופס
    document.getElementById('job-edit-form').reset();
    document.getElementById('edit-job-id').value = '';
    
    // ערכי ברירת מחדל
    document.getElementById('edit-job-status').value = 'פעיל';
    document.getElementById('edit-job-type').value = 'משרה מלאה';
    
    // יצירת מספר משרה חדש
    const jobNumbers = jobs.map(job => job.jobNumber || '').filter(num => num);
    let newNum = 1;
    
    if (jobNumbers.length > 0) {
        // ניסיון למצוא מספר סידורי בפורמט JSxxx
        const jsNumbers = jobNumbers
            .filter(num => /^JS\d+$/.test(num))
            .map(num => parseInt(num.replace('JS', '')));
        
        if (jsNumbers.length > 0) {
            newNum = Math.max(...jsNumbers) + 1;
        }
    }
    
    document.getElementById('edit-job-number').value = `JS${newNum.toString().padStart(3, '0')}`;
    
    // הצגת המודל
    document.getElementById('job-edit-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// סגירת מודל עריכת משרה
function closeEditModal() {
    document.getElementById('job-edit-modal').style.display = 'none';
    document.body.style.overflow = '';
}

// עריכת משרה קיימת
function editJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    document.getElementById('edit-modal-title').textContent = 'עריכת משרה';
    
    // מילוי הטופס בנתוני המשרה
    document.getElementById('edit-job-id').value = job.id;
    document.getElementById('edit-job-number').value = job.jobNumber || '';
    document.getElementById('edit-job-title').value = job.title || '';
    document.getElementById('edit-job-company').value = job.company || '';
    document.getElementById('edit-job-category').value = job.category || 'אחר';
    document.getElementById('edit-job-city').value = job.city || '';
    document.getElementById('edit-job-region').value = job.region || 'מרכז';
    document.getElementById('edit-job-type').value = job.jobType || 'משרה מלאה';
    document.getElementById('edit-job-status').value = job.status || 'פעיל';
    document.getElementById('edit-job-description').value = job.description || '';
    document.getElementById('edit-job-requirements').value = job.requirements || '';
    
    // הצגת המודל
    document.getElementById('job-edit-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// שמירת משרה (הוספה או עדכון)
function saveJob(event) {
    event.preventDefault();
    
    const jobId = document.getElementById('edit-job-id').value;
    const isNewJob = !jobId;
    
    // קבלת נתונים מהטופס
    const jobData = {
        jobNumber: document.getElementById('edit-job-number').value,
        title: document.getElementById('edit-job-title').value,
        company: document.getElementById('edit-job-company').value,
        category: document.getElementById('edit-job-category').value,
        city: document.getElementById('edit-job-city').value,
        region: document.getElementById('edit-job-region').value,
        location: `${document.getElementById('edit-job-city').value} - ${document.getElementById('edit-job-region').value}`,
        jobType: document.getElementById('edit-job-type').value,
        description: document.getElementById('edit-job-description').value,
        requirements: document.getElementById('edit-job-requirements').value,
        status: document.getElementById('edit-job-status').value
    };
    
    // בדיקת שדות חובה
    if (!jobData.title) {
        alert('יש להזין כותרת למשרה');
        return false;
    }
    
    if (!jobData.company) {
        alert('יש להזין שם חברה');
        return false;
    }
    
    if (!jobData.description) {
        alert('יש להזין תיאור משרה');
        return false;
    }
    
    if (isNewJob) {
        // הוספת משרה חדשה
        const maxId = Math.max(...jobs.map(j => j.id), 0);
        jobData.id = maxId + 1;
        jobs.push(jobData);
        
        alert('המשרה נוספה בהצלחה!');
    } else {
        // עדכון משרה קיימת
        const jobIndex = jobs.findIndex(j => j.id === parseInt(jobId));
        if (jobIndex !== -1) {
            jobData.id = parseInt(jobId);
            jobs[jobIndex] = jobData;
            
            alert('המשרה עודכנה בהצלחה!');
        }
    }
    
    // עדכון הטבלה
    filteredJobs = [...jobs];
    displayJobsTable();
    setupPagination();
    
    // סגירת המודל
    closeEditModal();
    
    return false;
}

// מחיקת משרה
function deleteJob(jobId) {
    if (!confirm('האם אתה בטוח שברצונך למחוק משרה זו?')) {
        return;
    }
    
    const jobIndex = jobs.findIndex(j => j.id === jobId);
    if (jobIndex !== -1) {
        jobs.splice(jobIndex, 1);
        
        // עדכון הטבלה
        filteredJobs = [...jobs];
        displayJobsTable();
        setupPagination();
        
        alert('המשרה נמחקה בהצלחה!');
    }
}

// צפייה במשרה (פתיחת המודל מדף הבית)
function viewJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    window.open('index.html#job-' + jobId, '_blank');
}
