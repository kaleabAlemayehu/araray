import multer from 'multer';
import path from 'path';

const storage = process.env.NODE_ENV === 'production'
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'music/');
      },
      filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
      },
    });

const upload = multer({ storage });

export default upload;
