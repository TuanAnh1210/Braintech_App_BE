import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/gif'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Only .gif, .jpg, .jpeg, and .png formats are allowed!'), false);
    }
};

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024, // Giới hạn kích thước file là 3MB
    },
    fileFilter: fileFilter,
});

export const uploadVideo = multer({
    storage: storage,
    limits: {
        fileSize: 200 * 1024 * 1024, // Giới hạn kích thước file là 3MB
    },
});
