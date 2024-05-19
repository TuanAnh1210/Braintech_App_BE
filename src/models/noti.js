import mongoose, { Schema } from 'mongoose';

const Noti = Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            require: true,
        },

        content: {
            type: String,
            require: true,
        },
        info: {
            type: String,
            require: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false },
);

export default mongoose.model('noti', Noti);
