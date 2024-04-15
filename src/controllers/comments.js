import Comment from "../models/comment";

export const getAllCommentsByLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find();
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
export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findById(id);
    console.log(comments);
    res.status(200).send({
      message: "Lấy thành công bình luận",
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
export const deleteComment = async (req, res) => {
  try {
    const findCmt = await Comment.findById(req.params.id);
    if (findCmt) {
      const result = await Comment.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        error: 0,
        data: findCmt,
        result: result,
        message: "Xóa thành công",
      });
    } else {
      res.status(404).json({
        error: 1,
        message: "Không tìm thấy bình luận",
      });
    }
  } catch (error) {
    console.log("Error: delete comment", error);
    res.status(500).json({
      error: 1,
      message: error,
    });
  }
};
export const editComment = async (req, res) => {
  try {
    const findCmt = await Comment.findById(req.params.id);
    const data = req.body;
    if (findCmt) {
      const result = await User.patch({ _id: req.params.id }, data);
      return res.status(200).json({
        error: 0,
        data: findCmt,
        result: result,
        message: "Sửa thành công",
      });
    } else {
      res.status(404).json({
        error: 1,
        message: "Không tìm thấy bình luận",
      });
    }
  } catch (error) {
    console.log("Error: update comment", error);
    res.status(500).json({
      error: 1,
      message: error,
    });
  }
};
