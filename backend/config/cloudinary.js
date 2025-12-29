const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// הגדרת אחסון לתמונות כלים
const toolsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tools',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 800, height: 600, crop: 'limit' },
      { quality: 'auto' }
    ]
  },
});

// הגדרת אחסון לתמונות הודעות
const popupsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'popups',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 800, height: 600, crop: 'limit' },
      { quality: 'auto' }
    ]
  },
});

// פונקציה ליצירת multer עם הגדרות אחסון
const createMulterUpload = (storage) => {
  return multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('רק קבצי תמונה מותרים!'), false);
      }
    }
  });
};

// יצירת multer instances
const toolUpload = createMulterUpload(toolsStorage);
const popupUpload = createMulterUpload(popupsStorage);

module.exports = { cloudinary, toolUpload, popupUpload };