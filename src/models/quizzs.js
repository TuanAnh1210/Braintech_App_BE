import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Quizzs = new Schema({
    title: {
        type: String,
        require: true,
    },
    answers: [
        {
            type: {
                code_answer: String,
                title_answer: String,
                answer: Boolean,
            },
            require: true,
        },
    ],
    lesson_id: {
        type: Schema.Types.ObjectId,
        ref: 'lessons',
        required: true,
    },
});

// Quizzs.pre('save', async function (next) {
//     try {
//         this.answers.code_answer = uuidv4();
//         next();
//     } catch (err) {
//         next(err);
//     }
// });

export default model('quizzs', Quizzs);