import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import { __dirname } from '../server.js';

const router = Router();

const upload = multer({
    limits: {
        fileSize: 1 * 1024 * 1024,
    },
});

router.post('/image', upload.single('image'), async (req, res) => {
    try {
        const imageName = Date.now() + '.png';
        const imagePath = path.join(__dirname, `/public/${imageName}`);
        await sharp(req.file.buffer).toFile(imagePath);
        res.status(200).json({ url: `http://localhost:8080/${imageName}` });
    } catch (err) {
        console.log(err);
    }
});

export default router;
