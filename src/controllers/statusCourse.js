import statusCourse from '../models/statusCourse';
import courses from '../models/courses';

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
                from: courses.collection.name,
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

export const addCourseToSttCourse = async (req, res) => {
    try {
        const { course_id, user_id } = req.body;

        const exist = await statusCourse.findOne({ course_id: course_id });
        if (!exist) {
            const data = new statusCourse({
                course_id: course_id,
                user_id: user_id,
            });

            await data.save();

            res.status(200).send({
                message: 'Bắt đầu học',
            });
        } else {
            await statusCourse.findByIdAndUpdate(exist._id, { isFinish: true }, { new: true });
            res.status(200).send({
                message: 'Khóa học đã được hoàn thành',
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};
