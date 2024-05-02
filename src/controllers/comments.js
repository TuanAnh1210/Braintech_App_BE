import Comment from '../models/comment';
import Lessons from '../models/lessons';
import User from '../models/users';

export const getAllComments = async (req, res) => {
    try {
        const commentDatas = await Comment.find();
        let comments = [];
        for (let item of commentDatas) {
            const { full_name } = await User.findById(item.user_id);
            const { name } = await Lessons.findById(item.lesson_id);
            comments.push({ _id: item._id, text: item._doc.text, user: full_name, lessonName: name });
        }
        res.status(200).send({
            message: 'Lấy thành công toàn bộ bình luận',
            data: comments,
        });
    } catch (e) {
        res.status(500).send({
            message: e.message,
        });
    }
};

export const getAllCommentsByLesson = async (req, res) => {
    try {
        const userId = req.userId;
        const lesson_id = req.params.id;

        const comments = await Comment.find({ lesson_id: lesson_id }).populate({
            path: 'user_id',
            select: ['full_name'],
        });

        // Duyệt qua từng chapter và từng lesson để thêm trạng thái hoàn thành
        const result = comments.map((cmt) => {
            const isMyComment = cmt.user_id._id.toString() === userId;
            return {
                ...cmt,
                _doc: { ...cmt._doc, isMyComment: isMyComment },
            };
        });

        res.status(200).send({
            message: 'Lấy thành công toàn bộ bình luận',
            data: result.map((r) => r._doc),
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
        const { phone, full_name } = await User.findById(comments.user_id);
        const { name } = await Lessons.findById(comments.lesson_id);
        res.status(200).send({
            message: 'Lấy thành công bình luận',
            data: { text: comments._doc.text, phone: phone, user: full_name, lessonName: name },
        });
    } catch (e) {
        res.status(500).send({
            message: e.message,
        });
    }
};

export const postComment = async (req, res) => {
    try {
        const userId = req.userId;
        const { content, lesson_id } = req.body;

        const newComment = new Comment({
            lesson_id: lesson_id,
            user_id: userId,
            text: content,
        });

        await newComment.save();

        res.status(200).send({
            message: 'Thêm bình luận thành công',
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
        const userId = req.userId;
        const findCmt = await Comment.findById(req.params.id);
        if (findCmt) {
            const result = await Comment.deleteOne({ _id: req.params.id, user_id: userId });
            return res.status(200).json({
                error: 0,
                data: findCmt,
                result: result,
                message: 'Xóa thành công',
            });
        } else {
            res.status(404).json({
                error: 1,
                message: 'Không tìm thấy bình luận',
            });
        }
    } catch (error) {
        console.log('Error: delete comment', error);
        res.status(500).json({
            error: 1,
            message: error,
        });
    }
};

export const editComment = async (req, res) => {
    try {
        const userId = req.userId;
        const id = req.params.id;

        const { content } = req.body;

        const findCmt = await Comment.findOne({ _id: id, user_id: userId });

        if (findCmt) {
            const result = await Object.assign(findCmt, {
                text: content,
            });

            await result.save();

            return res.status(200).json({
                error: 0,
                data: findCmt,
                result: result,
                message: 'Sửa thành công',
            });
        } else {
            res.status(404).json({
                error: 1,
                message: 'Không tìm thấy bình luận',
            });
        }
    } catch (error) {
        console.log('Error: update comment', error);
        res.status(500).json({
            error: 1,
            message: error,
        });
    }
};
