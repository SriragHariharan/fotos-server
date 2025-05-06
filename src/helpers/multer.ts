import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create an absolute path to the uploads folder
const uploadsDir = path.resolve(__dirname, '..', 'uploads');

// Ensure the uploads folder exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const uploadMultipleFiles = upload.array('images', 10);
