import mongoose from 'mongoose';
const { Schema } = mongoose;

const Vouchers = new Schema(
    {
        codeName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        discountAmount: {
            type: Number,
            required: true,
        },
        maxDiscountAmount: {
            type: Number,
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, versionKey: false },
);

// {
//     codeName: 'SUMMER2024',
//     quantity: 100,
//     discountAmount: 10,
//     maxDiscountAmount: 5,
//     startDate: '2020-05-01',
//     endDate: '2025-05-01',
//     status: 'ACTIVE',
// },

export default mongoose.model('voucher', Vouchers);
