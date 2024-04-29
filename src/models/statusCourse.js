import { Schema, model } from "mongoose";

const statusCourse = new Schema(
  {
    course_id: {
      type: Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("statusCourse", statusCourse);
