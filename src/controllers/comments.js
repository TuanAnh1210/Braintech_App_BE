import Comment from "../models/comment";

export const getAllCommentsByLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ lesson_id: id });
    res.status(200).send({
      message: "Lấy thành công toàn bộ bình luận",
      data: comments,
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};
export const postComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { lesson_id } = req.body;
    const { user_id } = req.body;
    const newComment = new Comment({
      lesson_id: lesson_id,
      user_id: user_id,
      text: content,
    });
    await newComment.save();
    res.status(200).send({
      message: "Thêm bình luận thành công",
      data: newComment,
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};
