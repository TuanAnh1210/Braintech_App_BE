import mongoose, { Schema } from 'mongoose';

const Notes = Schema(
    {
        text: {
            type: String,
            require: true,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            require: true,
        },
        lesson_id: {
            type: Schema.Types.ObjectId,
            ref: 'lessons',
            require: true,
        },
    },
    { timestamps: true, versionKey: false },
);

export default mongoose.model('notes', Notes);
