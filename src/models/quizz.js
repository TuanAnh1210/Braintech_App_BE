import { Schema, model } from 'mongoose';

const Quizzs = new Schema({
    name: {
        type: String,
        require: true,
    },
    pathVideo: {
        type: String,
        require: true,
    },
    chapter_id: {
        type: Schema.Types.ObjectId,
        ref: 'chapters',
        required: true,
    },
});

export default model('lessons', Quizzs);
