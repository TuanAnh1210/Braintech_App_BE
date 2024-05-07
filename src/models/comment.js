import mongoose, { Schema } from "mongoose";

const Comment = Schema({
  text: {
    type: String,
    require: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  lesson_id: {
    type: Schema.Types.ObjectId,
    ref: "lessons",
    require: true,
  },
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: "comments",
    require: false,
    default: null
  }
});

export default mongoose.model("comments", Comment);
