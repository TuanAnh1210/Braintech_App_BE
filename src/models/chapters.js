import mongoose, { Schema, model } from 'mongoose';

const Chapters = new Schema({
    name: {
        type: String,
        require: true,
    },
    courses_id: {
        type: Schema.Types.ObjectId,
        ref: 'coursesteachers',
        required: true,
    },
    lessons: [
        {
            type: Schema.Types.ObjectId,
            ref: 'lessons',
            required: true,
        },
    ],
    isPublic: {
        type: Boolean,
        default: false,
        required: true,
    },
});

export default mongoose.model('chapters', Chapters);
