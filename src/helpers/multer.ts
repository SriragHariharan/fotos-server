import multer from 'multer';
import path from 'path';

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder for uploaded files
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    // Create a unique filename for each uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Preserve the original file extension
  }
});

// Create the multer upload middleware
const upload = multer({ storage: storage });

// Export the upload middleware for use in routes
export const uploadMultipleFiles = upload.array('images', 10); // Adjust the second parameter for max files