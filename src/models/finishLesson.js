import { Schema, model } from 'mongoose';

const finishLesson = new Schema({
    lesson_id: {
        type: Schema.Types.ObjectId,
        ref: 'lessons',
        require: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true,
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'coursesteachers',
        require: true,
    },
});
export default model('finishlessons', finishLesson);
