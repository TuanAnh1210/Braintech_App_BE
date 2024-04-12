import { v2 as cloudinary } from 'cloudinary';

import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLN_CLOUD_NAME,
    api_key: process.env.CLN_API_KEY,
    api_secret: process.env.CLN_API_SECRET,
    use_filename: true,
});

export default cloudinary;
