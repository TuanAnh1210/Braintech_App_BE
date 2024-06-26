import statusCourse from '../models/statusCourse.js';
import Courses from '../models/courses_teacher.js';

import finishLesson from '../models/finishLesson.js';

export const getAllOrByTime = async (req, res) => {
    const start = req.query?.fromDate;
    const end = req.query?.toDate;

    const pipeline = [
        ...(start
            ? [
                  {
                      $match: {
                          createdAt: {
                              $gte: new Date(+start),
                              $lte: end ? new Date(+end) : new Date(),
                          },
                      },
                  },
              ]
            : []),
        {
            $group: {
                _id: '$course_id',
                subscribers: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: Courses.collection.name,
                localField: '_id',
                foreignField: '_id',
                as: 'course_info',
            },
        },
        {
            $unwind: {
                path: '$course_info',
                preserveNullAndEmptyArrays: true,
            },
        },

        {
            $project: {
                subscribers: 1,
                price: '$course_info.price',
                cate_id: '$course_info.cate_id',
                name: '$course_info.name',
                isPublic: '$course_info.isPublic',
                chapters: '$course_info.chapters',
                revenue: { $multiply: ['$course_info.price', '$subscribers'] },
            },
        },
    ];

    try {
        const data = await statusCourse.aggregate(pipeline);
        res.send({
            message: 'Get data successfully',
            data,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};
export const getAllSttCourse = async (req, res) => {
    try {
        const data = await statusCourse.find({}).populate([
            {
                path: 'course_id',
                select: ['name', 'thumb', 'description', 'cate_id'],
            },
        ]);
        res.send({
            message: 'Get data successfully',
            data,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};

export const addCourseToSttCourse = async (req, res) => {
    try {
        const { course_id } = req.body;
        const userId = req.userId;
        const exist = await statusCourse.findOne({ course_id: course_id });

        if (!exist) {
            const data = new statusCourse({
                course_id: course_id,
                user_id: userId,
            });

            await data.save();

            res.status(200).send({
                message: 'Bắt đầu học',
            });
        } else {
            res.status(200).send({
                message: 'Bạn đã thêm khóa học này rồi',
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
export const updateSttCourse = async (req, res) => {
    try {
        const { course_id } = req.body;
        const userId = req.userId;

        const exist = await statusCourse.findOne({ course_id: course_id, user_id: userId });
        await statusCourse.findByIdAndUpdate(exist._id, { isFinish: true }, { new: true });
        res.status(200).send({
            message: 'Khóa học đã được hoàn thành',
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};
export const deleteSttCourse = async (req, res) => {
    try {
        const id = req.params.id;

        const deleteStatusCourse = await statusCourse.findByIdAndDelete(id);
        const { course_id, user_id } = deleteStatusCourse;
        const deleteFinishLesson = await finishLesson.deleteMany({
            user_id: user_id,
            course_id: course_id,
        });
        return res.status(200).send({
            message: 'Khóa học đã được hoàn thành',
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};
export const countUserByCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const counts = await statusCourse.count({ course_id: courseId });

        // const counts = await statusCourse.aggregate([
        //     { $match: { course_id: courseId } },
        //     { $group: { _id: '$course_id', count: { $sum: 1 } } },
        // ]);

        // const count = counts.length > 0 ? counts[0].count : 0;
        res.send({
            message: 'Get count successfully',
            count: counts,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
