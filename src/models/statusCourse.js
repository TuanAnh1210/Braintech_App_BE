import { Schema, model } from 'mongoose';

const statusCourse = new Schema(
    {
        course_id: {
            type: Schema.Types.ObjectId,
            ref: 'coursesteachers',
            required: true,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        isFinish: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default model('statusCourse', statusCourse);
