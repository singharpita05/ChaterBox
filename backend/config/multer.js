// MULTER CONFIGURATION FOR HANDLING AVATAR UPLOADS WITH CLOUDINARY

import multer from 'multer';
import { storage } from './cloudinary.js';

// File filter - only accept images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

// Configure multer with memory storage (file buffer will be uploaded to Cloudinary)
const upload = multer({
  storage: storage, // Use memory storage from cloudinary.js
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: fileFilter,
});

export default upload;