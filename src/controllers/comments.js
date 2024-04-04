import Comment from "../models/comment";
import User from "../models/users"
import Lessons from "../models/lessons";
export const getAllCommentsByLesson = async (req, res) => {
  try {
    const commentDatas = await Comment.find();
    let comments = []
    for(let item of commentDatas){
      const { full_name } = await User.findById(item.user_id)
      const { name } = await Lessons.findById(item.lesson_id)
      comments.push({_id: item._id, content: item._doc.content, user: full_name, lessonName: name})
    }
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
    const { phone, full_name } = await User.findById(comments.user_id)
    const { name } = await Lessons.findById(comments.lesson_id)
    res.status(200).send({
      message: "Lấy thành công bình luận",
      data: {content: comments._doc.content, phone: phone, user: full_name, lessonName: name},
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
    const findCmt = await Comment.findById(req.params.id)
    if (findCmt){
      const result = await Comment.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        error: 0,
        data: findCmt,
        result: result,
        message: "Xóa thành công",
      });
    }
    else {
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
}
export const editComment = async (req, res) => {
  try {
    const findCmt = await Comment.findById(req.params.id)
    const data = req.body
    if (findCmt){
      const result = await User.patch({ _id: req.params.id },data);
      return res.status(200).json({
        error: 0,
        data: findCmt,
        result: result,
        message: "Sửa thành công",
      });
    }
    else {
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
}

