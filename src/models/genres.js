import mongoose from "mongoose";
const { Schema } = mongoose;

const Genres = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Genres", Genres);
