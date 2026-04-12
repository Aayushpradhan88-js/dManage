//Cloudinary Configuration Service 

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} from '../../../config/env'

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key:CLOUDINARY_API_KEY,
  api_secret:CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async(req, file)=> ({
        folder: "SaaS"
    })
});

export {cloudinary, storage};