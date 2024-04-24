import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 8);
};

export const comparePassword = async (password1, password2) => {
    return bcrypt.compareSync(password1, password2);
};

const CreateJwt = (data, time = '3d') => {
    const payload = { data };
    const key = process.env.JWT_SECRET;

    let token = '';

    try {
        token = jwt.sign(payload, key, { expiresIn: time });
    } catch (error) {
        console.log(error);
    }
    return token;
};

export default CreateJwt;

export const sortObject = (obj) => {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
};

export const nextTimestamp = (m) => {
    const timeEnd = +new Date() + 1000 * (60 * +m + 0) + 500;
    return +timeEnd;
};
