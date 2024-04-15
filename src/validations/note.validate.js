import Joi from "joi";

export const updateNoteSchema = (data) => {
    const schema = Joi.object({
        text: Joi.string().required().messages({
            "string.empty": "Vui lòng nhập nội dung",
            "any.required": "Đây là trường dữ liệu bắt buộc",
        })
    });

    const { error } = schema.validate(data);

    if (error) return { message: error.message };
};
export const createNoteSchema = (data) => {
    const schema = Joi.object({
        text: Joi.string().required().messages({
            "string.empty": "Vui lòng nhập nội dung",
            "any.required": "Đây là trường dữ liệu bắt buộc",
        })
    });

    const { error } = schema.validate(data);

    if (error) return { message: error.message };
};

