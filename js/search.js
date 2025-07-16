// פונקציה להצגת משרות
function displayJobs(jobsToShow = jobs) {
    const container = document.getElementById('jobsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const filteredJobs = jobsToShow.filter(job => job.status === 'פעיל');
    
    if (filteredJobs.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #cccccc;">לא נמצאו משרות</p>';
        return;
    }
    
    filteredJobs.forEach((job, index) => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.classList.add('fade-up');
        
        // הוספת השהיה לאנימציה
        if (index < 5) {
            jobCard.classList.add(`delay-${index % 5}`);
        }
        
        jobCard.onclick = () => openJobModal(job);
        
        // הבטחת סטנדרטיזציה של הקטגוריה וקבלת קלאס צבע
        const categoryColorClass = categoryColors[job.category] || 'category-other';
        
        jobCard.innerHTML = `
            ${job.jobNumber ? `<div class="job-number">${job.jobNumber}</div>` : ''}
            <div class="job-badge ${categoryColorClass}">${job.category}</div>
            <div class="job-title">${job.title}</div>
            <div class="job-company">${job.company || ''}</div>
            <div class="job-location">${job.location || ''}</div>
            <div class="job-description">${(job.description || '').substring(0, 150)}${job.description && job.description.length > 150 ? '...' : ''}</div>
            <div class="gnome-character" style="position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%) scale(0.7);">
                <img src="images/gnome.png" alt="גמדה מציעה מידע נוסף">
                <div class="gnome-tooltip">לחצו לפרטים נוספים על המשרה!</div>
            </div>
        `;
        
        container.appendChild(jobCard);
    });
}

// פונקציה לחיפוש משרות
function searchJobs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const region = document.getElementById('regionFilter').value;
    
    const filteredJobs = jobs.filter(job => {
        // בדיקת התאמה לחיפוש טקסט חופשי
        const matchesSearch = !searchTerm || 
            job.title.toLowerCase().includes(searchTerm) ||
            (job.company && job.company.toLowerCase().includes(searchTerm)) ||
            (job.description && job.description.toLowerCase().includes(searchTerm));
        
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

// פונקציה לאיפוס סינון
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('regionFilter').value = '';
    displayJobs(jobs);
}

// פונקציה לפתיחת מודל משרה
function openJobModal(job) {
    document.getElementById('modal-job-company').textContent = job.company || '';
    document.getElementById('modal-job-location').textContent = job.location || '';
    document.getElementById('modal-job-type').textContent = job.jobType || '';
    document.getElementById('modal-job-category').textContent = job.category || '';
    document.getElementById('modal-job-description').textContent = job.description || '';
    document.getElementById('modal-job-requirements').textContent = job.requirements || '';
    
    const titleElement = document.getElementById('modal-job-title');
    if (job.jobNumber) {
        titleElement.textContent = `${job.title} (מס' ${job.jobNumber})`;
    } else {
        titleElement.textContent = job.title;
    }
    
    // איפוס הטופס
    document.getElementById('application-form').reset();
    document.getElementById('file-name').textContent = '';
    document.getElementById('success-message').style.display = 'none';
    
    // שמירת פרטי המשרה בטופס
    document.getElementById('job-id-input').value = job.id;
    document.getElementById('job-title-input').value = job.title;
    
    // איפוס הודעות שגיאה
    const errorElements = document.querySelectorAll('.validation-error');
    errorElements.forEach(el => el.style.display = 'none');
    
    document.getElementById('job-modal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // מניעת גלילה ברקע
}
