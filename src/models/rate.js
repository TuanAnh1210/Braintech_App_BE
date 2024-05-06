import { Schema, model } from 'mongoose';
const Rate = new Schema(
    {
        content: {
            type: String,
            require: true,
        },
        course_id: {
            type: Schema.Types.ObjectId,
            ref: 'courses',
            required: true,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        isReported: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
export default model('rates', Rate);
