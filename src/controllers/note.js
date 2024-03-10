import Notes from "../models/note";

export const getAllByClient = async (req, res) => {
  try {
    const { user_id } = req.params;
    const list = await Notes.find({ user_id: user_id });
    // console.log(list);
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
