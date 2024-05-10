import { Schema, Types, model } from 'mongoose';
import Voucher from './voucher';

import { hashPassword } from '../helper/utils.js';

const User = new Schema(
    {
        full_name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            default: null,
        },
        password: {
            type: String,
        },
        avatar: {
            type: String,
            default: 'https://res.cloudinary.com/dpjieqbsk/image/upload/v1681376184/braintech/n5ktpikmscz1ngfe59go.jpg',
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isTeacher: {
            type: Boolean,
            default: false,
        },
        vouchers: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'voucher',
                },
            ],
            require: true,
            default: [],
        },
    },
    { timestamps: true, versionKey: false },
);

User.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await hashPassword(user.password);
    }
    next();
});

export default model('users', User);
