import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

const Courses = new Schema({
  name: {
    type: String,
    required: true,
  },
  // casts: [{ type: Schema.Types.ObjectId, ref: "Cast", required: true }],
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
  cate_id: { type: Schema.Types.ObjectId, ref: "Categories", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Courses", Courses);
