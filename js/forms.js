// אימות טופס הגשת מועמדות
function validateForm() {
    let isValid = true;
    const fullName = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // אימות שם מלא
    if (fullName === '') {
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('name-error').style.display = 'none';
    }
    
    // אימות מספר טלפון (פורמט ישראלי)
    const phoneRegex = /^05\d{1}[-]?\d{7}$|^05\d{1}[-]?\d{3}[-]?\d{4}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phone-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('phone-error').style.display = 'none';
    }
    
    return isValid;
}

// שליחת טופס הגשת מועמדות
function submitApplication(event) {
    event.preventDefault();
    
    if (validateForm()) {
        const form = document.getElementById('application-form');
        const formData = new FormData(form);
        
        // קבלת פרטי המשרה לכלול במייל
        const jobId = document.getElementById('job-id-input').value;
        const jobTitle = document.getElementById('job-title-input').value;
        const jobCompany = document.getElementById('modal-job-company').textContent;
        
        // הצגת מצב טעינה
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerText;
        submitButton.innerText = '...שולח';
        submitButton.disabled = true;
        
        // סימולציית שליחת הטופס (לשרת אמיתי תצטרכי קוד שונה)
        setTimeout(() => {
            // איפוס הכפתור
            submitButton.innerText = originalButtonText;
            submitButton.disabled = false;
            
            // הצגת הודעת הצלחה
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('success-message').scrollIntoView({ behavior: 'smooth' });
            
            // איפוס הטופס
            form.reset();
            document.getElementById('file-name').textContent = '';
            
            // יומן המציג מה היה נשלח למייל אמיתי
            console.log('מועמדות נשלחה למייל: kerenraf@gmail.com', {
                ...Object.fromEntries(formData),
                פרטי_משרה: {
                    מספר_משרה: jobId,
                    כותרת_משרה: jobTitle,
                    חברה: jobCompany
                }
            });
        }, 1500);
    }
    
    return false; // מניעת שליחה רגילה של הטופס
}

// שליחת טופס יצירת קשר
function submitContactForm(event) {
    event.preventDefault();
    
    // קבלת ערכי השדות
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // בדיקת תקינות בסיסית
    if (!name || !email || !subject || !message) {
        alert('אנא מלא את כל השדות');
        return false;
    }
    
    // יצירת אובייקט עם נתוני הטופס
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };
    
    // סימולציה של שליחת הטופס (באתר אמיתי יהיה כאן קוד שונה)
    console.log('שליחת פנייה ל-kerenraf@gmail.com:', formData);
    
    // הצגת הודעת הצלחה
    document.getElementById('contact-form').reset();
    document.getElementById('contact-success').style.display = 'block';
    document.getElementById('contact-success').scrollIntoView({ behavior: 'smooth' });
    
    // הסתרת ההודעה אחרי 5 שניות
    setTimeout(() => {
        document.getElementById('contact-success').style.display = 'none';
    }, 5000);
    
    return false;
}
