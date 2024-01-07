import { Schema, Types, model } from "mongoose";

const Users = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dpjieqbsk/image/upload/v1681376184/braintech/n5ktpikmscz1ngfe59go.jpg",
    },
  },
  { timestamps: true, versionKey: false }
);

export default model("users", Users);
