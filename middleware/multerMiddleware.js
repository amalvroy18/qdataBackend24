const multer = require('multer');

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        const filename = `file-${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});

// File filter configuration (allow all files)
const fileFilter = (req, file, callback) => {
    callback(null, true); // Accept all files
};

const multerConfig = multer({
    storage,
    fileFilter
});

module.exports = multerConfig;










