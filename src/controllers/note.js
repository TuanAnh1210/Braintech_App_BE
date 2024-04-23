import Notes from "../models/note";
import { createNoteSchema, updateNoteSchema } from "../validations/note.validate";

export const getAllByClient = async (req, res) => {
  try {
    const { user_id } = req.params;
    const list = await Notes.find({ user_id: user_id });

    res.status(200).send({
      message: "Lấy thành công dữ liệu",
      data: list,
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};

export const createNote = async (req, res) => {

  try {

    const { content } = req.body;
    const { lesson_id } = req.body;
    const { user_id } = req.body;

    const newNote = new Notes({
      text: content,
      lesson_id: lesson_id,
      user_id: user_id,
    });
    await newNote.save();
    res.status(200).send({
      message: "Thêm thành công ghi chú",
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};
export const updateNote = async (req, res) => {

  try {
    // const error = updateNoteSchema(req.body);
    // console.log(error);
    // if (error) {
    //   return res.status(400).json({
    //     error: 1,
    //     message: error.message,
    //   });
    // }


    await Notes.findByIdAndUpdate(req.params.note_id, req.body, {
      new: true,
    });
    res.status(200).send({
      message: "Chỉnh sửa thành công ghi chú",
    });

  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};
export const deleteNote = async (req, res) => {
  try {
    const findNote = await Notes.findByIdAndDelete(req.params.note_id)

    res.status(200).send({
      message: "Xóa thành công ghi chú",
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};
