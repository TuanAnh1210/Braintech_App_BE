import mongoose from "mongoose";
const { Schema } = mongoose;

const Categories = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("categories", Categories);
