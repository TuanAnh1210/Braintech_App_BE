import { Schema, Types, model } from "mongoose";

const statusCourse = new Schema(
  {
    course_id: {
      type: Types.ObjectId,
      ref: "courses",
      require: true,
    },
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      require: true,
    },
    status_learn: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("statusCourse", statusCourse);
