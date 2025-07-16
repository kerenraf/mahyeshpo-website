// api/send-application.js
const nodemailer = require('nodemailer');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

// הגדרת תיקיית העלאת קבצים זמנית
const uploadDir = path.join(process.cwd(), 'tmp');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

module.exports = async (req, res) => {
  // הגדרת CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // טיפול בבקשת OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // וודא שהבקשה היא POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'שיטה לא נתמכת' });
  }

  try {
    // הגדרת פורמידבל לטיפול בטופס מולטיפארט
    const form = formidable({
      uploadDir: uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB מקסימום
      multiples: true
    });

    // פירוק הטופס וקבלת הנתונים
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // בדיקת שדות חובה
    if (!fields.fullName || !fields.phone) {
      return res.status(400).json({ success: false, message: 'נא למלא את כל שדות החובה' });
    }

    // אימות תקינות מספר טלפון
    const phoneRegex = /^05\d{1}[-]?\d{7}$|^05\d{1}[-]?\d{3}[-]?\d{4}$/;
    if (!phoneRegex.test(fields.phone)) {
      return res.status(400).json({ success: false, message: 'מספר טלפון לא תקין' });
    }

    // בדיקת קובץ קורות חיים
    if (!files.cvFile) {
      return res.status(400).json({ success: false, message: 'לא נמצא קובץ קורות חיים' });
    }

    // formidable v2+ מחזיר מערך עבור כל שדה קובץ
    const cvFile = files.cvFile[0];
    if (!cvFile) {
      return res.status(400).json({ success: false, message: 'לא נמצא קובץ קורות חיים' });
    }

    // הגדרת טרנספורטר לשליחת מייל
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // קריאת תוכן הקובץ
    const fileContent = fs.readFileSync(cvFile.filepath);
    const fileName = path.basename(cvFile.filepath);

    // הכנת תוכן המייל
    const subject = `מועמדות חדשה למשרה: ${fields.jobTitle || 'לא צוין'}`;
    const htmlMessage = `
      <html dir="rtl">
      <body>
        <h2 style="color:#F69898;">התקבלה מועמדות חדשה</h2>
        <p><strong>שם מלא:</strong> ${fields.fullName}</p>
        <p><strong>טלפון:</strong> ${fields.phone}</p>
        <p><strong>משרה:</strong> ${fields.jobTitle || 'לא צוין'}</p>
        ${fields.jobId ? `<p><strong>מזהה משרה:</strong> ${fields.jobId}</p>` : ''}
        <p><strong>תאריך הגשה:</strong> ${new Date().toLocaleString('he-IL')}</p>
        <p><strong>קורות חיים:</strong> קובץ מצורף</p>
      </body>
      </html>
    `;

    // שליחת המייל
    const info = await transporter.sendMail({
      from: `"מה יש פה?" <${process.env.SMTP_USER}>`,
      to: 'kcs@kerencs.com',
      subject: subject,
      html: htmlMessage,
      attachments: [
        {
          filename: cvFile.originalFilename || fileName,
          content: fileContent,
        },
      ],
    });

    // מחיקת הקובץ הזמני
    fs.unlinkSync(cvFile.filepath);

    // החזרת תשובה חיובית
    return res.status(200).json({ success: true, message: 'המועמדות נשלחה בהצלחה!' });
  } catch (error) {
    console.error('שגיאה בטיפול בטופס:', error);
    return res.status(500).json({ success: false, message: 'שגיאה בשליחת המועמדות' });
  }
};
