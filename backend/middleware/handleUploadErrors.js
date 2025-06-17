// middleware/uploadErrorHandler.js
const multer = require('multer');

// זה middleware אמיתי - פונקציה אחת פשוטה!
const handleUploadErrors = (error, req, res, next) => {
  // אם אין שגיאה, תמשיך הלאה
  if (!error) {
    return next();
  }

  // טיפול בשגיאות multer
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: true,
        message: 'קובץ התמונה גדול מדי (מקסימום 5MB)',
        data: null
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        error: true,
        message: 'יותר מתמונה אחת הועלתה',
        data: null
      });
    }
  }
  
  // שגיאות מותאמות אישית
  if (error.message === 'רק קבצי תמונה מותרים!') {
    return res.status(400).json({
      error: true,
      message: error.message,
      data: null
    });
  }
  
  // שגיאה כללית
  return res.status(500).json({
    error: true,
    message: 'שגיאה בהעלאת התמונה',
    data: null
  });
};

module.exports = handleUploadErrors;