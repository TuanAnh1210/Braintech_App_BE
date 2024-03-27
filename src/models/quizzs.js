import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const Quizzs = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lesson_id: {
      type: Schema.Types.ObjectId,
      ref: "lessons",
      required: true,
    },
    answer: [
      {
        solution: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

Quizzs.plugin(mongoosePaginate);

export default mongoose.model("quizzs", Quizzs);
