import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 8);
};

export const comparePassword = async (password1, password2) => {
  return bcrypt.compareSync(password1, password2);
};

const CreateJwt = (data, time = "3d") => {
  const payload = { data };
  const key = process.env.JWT_SECRET;

  let token = "";

  try {
    token = jwt.sign(payload, key, { expiresIn: time });
  } catch (error) {
    console.log(error);
  }
  return token;
};

export default CreateJwt;
