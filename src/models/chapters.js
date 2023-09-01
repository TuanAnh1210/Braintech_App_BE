import mongoose, { Schema, model } from "mongoose";

const Chapters = new Schema({
  name: {
    type: String,
    require: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  },
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: "lessons",
      required: true,
    },
  ],
});

export default mongoose.model("chapters", Chapters);
