import mongoose, { Schema } from 'mongoose';

const PaymentHistory = Schema(
    {
        transaction_id: {
            type: String,
            require: true,
        },
        amount: {
            type: Number,
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
        payment_url: {
            type: String,
            require: true,
        },
        transaction_content: {
            type: String,
        },
        status_message: {
            type: String,
            default: 'Giao dịch chưa hoàn tất',
        },
        status: {
            type: String,
            default: 'PENDING',
            require: true,
        },
        timestamp_expired: {
            type: Number,
            require: true,
        },
        completedAt: {
            type: Date,
            default: null,
            require: true,
        },
    },
    { timestamps: true, versionKey: false },
);

export default mongoose.model('paymenthistory', PaymentHistory);
