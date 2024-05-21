// import { createNoteSchema, updateNoteSchema } from '../validations/note.validate.js';

import Noti from '../models/noti.js';

export const getAllNotiByUserId = async (req, res) => {
    try {
        console.log(req.params.userId, 'req day nha ban oi');

        const userId = req.params.userId;

        // const notes = await Notes.find({ user_id: userId }).populate({
        //     path: 'lesson_id',
        //     select: ['name'],
        // });

        const noti = await Noti.find({ user_id: userId });

        res.status(200).send({
            message: 'Lấy thành công dữ liệu',
            data: noti,
        });
    } catch (e) {
        res.status(500).send({
            message: e.message,
        });
    }
};

export const addNotify = async (req, res) => {
    try {
        await Noti.create(req.body);
        return res.status(200).json({
            message: 'Tặng mã thành công',
        });
    } catch (e) {
        res.status(500).send({
            message: e.message,
        });
    }
};
