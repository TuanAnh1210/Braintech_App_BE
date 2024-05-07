import Comment from '../models/comment.js';
import Lessons from '../models/lessons.js';
import User from '../models/users.js';

export const getAllComments = async (req, res) => {
    try {

        const result = await Comment.aggregate([
            {
                $lookup: {
                    from: 'lessons',
                    localField: 'lesson_id',
                    foreignField: '_id',
                    as: 'lesson'
                }
            },
            {
                $unwind: '$lesson'
            },
            {
                $group: {
                    _id: '$lesson_id',
                    lessonName: { $first: '$lesson.name' },
                    totalComments: { $sum: 1 }
                }
            }
        ])

        res.status(200).send({
            message: 'Lấy thành công toàn bộ bình luận',
            data: result,
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: e.message,
        });
    }
};

export const getAllCommentsByLesson = async (req, res) => {
    try {
        const userId = req.userId;
        const lesson_id = req.params.id;
        const commentz = await Comment.find({ lesson_id: lesson_id, parent_id: null }).populate({
            path: 'user_id',
            select: ['full_name', 'avatar'],
        })
        const comments = commentz.map(r => r._doc)
        const getChildrenComments = async (comment) => {
            const children = await Comment.find({ parent_id: comment._id }).populate({
                path: 'user_id',
                select: ['full_name', 'avatar'],
            })
            if (children.length === 0) {
                return [];
            }
            const childComments = [];
            for (const child of children) {
                const subComments = await getChildrenComments(child);
                childComments.push({ ...child._doc, comments: subComments });
            }
            return childComments;
        }
        const cmtData = await Promise.all(comments.map(async (cmt) => {
            const isMyComment = cmt.user_id?._id == userId;
            const subComments = await getChildrenComments(cmt);
            return { ...cmt, isMyComment: isMyComment, comments: subComments };
        }));
        res.status(200).send({
            message: 'Lấy thành công toàn bộ bình luận',
            data: cmtData,
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: e.message,
        });
    }
};

export const getCommentById = async (req, res) => {
    try {
        const userId = req.userId;
        const lesson_id = req.params.id;
        const commentz = await Comment.find({ lesson_id: lesson_id }).populate({
            path: 'user_id',
            select: ['full_name'],
        }).populate({
            path: 'lesson_id',
            select: ['name']
        })
        const comments = commentz.map(r => r._doc)
        res.status(200).send({
            message: 'Lấy thành công toàn bộ bình luận',
            data: comments,
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: e.message,
        });
    }
};

export const postComment = async (req, res) => {
    try {
        const userId = req.userId;
        const { content, lesson_id, parent_id } = req.body;
        const newComment = new Comment({
            lesson_id: lesson_id,
            user_id: userId,
            text: content,
            parent_id: parent_id
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
