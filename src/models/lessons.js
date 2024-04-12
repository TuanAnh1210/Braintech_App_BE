import { Schema, model } from 'mongoose';

const Lessons = new Schema({
    name: {
        type: String,
        require: true,
    },
    url_video: {
        type: String,
        require: true,
    },
    chapter_id: {
        type: Schema.Types.ObjectId,
        ref: 'chapters',
        required: true,
    },
    source_type: {
        type: String,
        default: 'youtube',
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
        required: true,
    },
});

export default model('lessons', Lessons);
