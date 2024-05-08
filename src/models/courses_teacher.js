import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const Courses = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        thumb: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        old_price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        cate_id: {
            type: Schema.Types.ObjectId,
            ref: 'categories',
            required: true,
        },
        chapters: [
            {
                type: Schema.Types.ObjectId,
                ref: 'chapters',
                require: true,
            },
        ],
        isPublic: {
            type: Boolean,
            default: false,
            required: true,
        },
        teacherId: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true,
            }
        ]
    },
    { timestamps: true, versionKey: false },
);

Courses.plugin(mongoosePaginate);

export default mongoose.model('coursesTeacher', Courses);
