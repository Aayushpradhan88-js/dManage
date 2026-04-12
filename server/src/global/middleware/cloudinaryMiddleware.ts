//Cloudinary middleware

import { Request } from 'express'
import multer from 'multer'
import { cloudinary, storage } from '../services/CloudinaryService'

// console.log("✅Cloudinary middleware triggered")
const upload = multer(
    {
        storage: storage,
        fileFilter: (req: Request, file: Express.Multer.File, cb) => {
            const allowableFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
            if (allowableFileTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error("Only supports image only"));
            };
        },
        limits: {
            fileSize: 4 * 1024 * 1024 // 4 MB
        }
    });

export default upload;