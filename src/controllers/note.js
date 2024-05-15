import Notes from '../models/note.js';
import { createNoteSchema, updateNoteSchema } from '../validations/note.validate.js';

export const getAllBylessonId = async (req, res) => {
    try {
        const userId = req.userId;
        const lessonId = req.params.lessonId;

        const notes = await Notes.find({ user_id: userId, lesson_id: lessonId }).populate({
            path: 'lesson_id',
            select: ['name'],
        });

        res.status(200).send({
            message: 'Lấy thành công dữ liệu',
            data: notes,
        });
    } catch (e) {
        res.status(500).send({
            message: e.message,
        });
    }
};

export const createNote = async (req, res) => {
    try {
        const userId = req.userId;
        const { content, save_at, lesson_id } = req.body;

        const newNote = new Notes({
            text: content,
            save_at: save_at,
            lesson_id: lesson_id,
            user_id: userId,
        });

        await newNote.save();
        res.status(200).send({
            message: 'Thêm thành công ghi chú',
        });
    } catch (e) {
        res.status(500).send({
            message: e.message,
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const userId = req.userId;
        const noteId = req.params.note_id;
        const { text } = req.body;

        await Notes.updateOne({ _id: noteId, user_id: userId }, { text: text }, { new: true });

        res.status(200).send({
            message: 'Chỉnh sửa thành công ghi chú',
        });
    } catch (e) {
        res.status(500).send({
            message: e.message,
        });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const userId = req.userId;
        const noteId = req.params.note_id;

        await Notes.deleteOne({
            user_id: userId,
            _id: noteId,
        });

        res.status(200).send({
            message: 'Xóa thành công ghi chú',
        });
    } catch (e) {
        res.status(500).send({
            message: e.message,
        });
    }
};
