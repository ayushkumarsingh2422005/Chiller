import multer from "multer";
import path from "path";
import fs from "fs";

// Function to create a dynamic multer instance with a folder path
const dynamicMulter = (folderPath) => {
  // Set storage engine for Multer
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `public/${folderPath}`;
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "-"); // Replace spaces with hyphens
      cb(null, `${baseName}-${Date.now()}${ext}`);
    },
  });  

  // File filter to allow only images
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  };

  // Initialize multer
  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  });
};

export default dynamicMulter;
