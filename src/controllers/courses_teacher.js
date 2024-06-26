import cloudinary from '../config/cloudinary.config.js';
import Courses from '../models/courses_teacher.js';
import { _countLessonInChapters } from './finishLesson.js';
import FinishLesson from '../models/finishLesson.js';
import statusCourse from '../models/statusCourse.js';
import courses_teacher from '../models/courses_teacher.js';

export const checkIsPublicCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const data = await courses_teacher.find({ _id: courseId });
        return res.status(200).json({
            message: 'Get Courses successfully',
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

export const getCourseByTeacher = async (req, res) => {
    const { _page = 1, _limit = 5, _sort = 'createdAt', _order = 'asc', teacherId = '' } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === 'desc' ? -1 : 1,
        },
        populate: [
            {
                path: 'cate_id',
                select: ['name'],
            },
        ],
    };

    try {
        const { docs: courses } = await Courses.paginate({ teacherId: teacherId }, options);
        if (courses.length === 0) {
            return res.status(404).json({
                message: 'Courses does not exist',
            });
        }
        return res.status(200).json({
            message: 'Get Courses successfully',
            courses,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

export const getCourseByTeacherIDs = async (req, res) => {
    const { id } = req.params;
    try {
        const { docs: courses } = await Courses.paginate({ teacherId: id });

        if (courses.length === 0) {
            return res.status(404).json({
                message: 'Courses does not exist',
            });
        }
        return res.status(200).json({
            message: 'Get Courses successfully',
            courses,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

export const getAll = async (req, res) => {
    try {
        let appendData = null;
        const courses = await Courses.find()
            .populate([
                {
                    path: 'cate_id',
                    select: ['name', 'code'],
                },
            ])

            .sort({ _id: -1 });

        if (courses?.length) {
            appendData = await Promise.all(
                courses.map(async (course) => {
                    const totalLessons = await _countLessonInChapters(course.chapters);
                    return { ...course._doc, totalLessons };
                }),
            );
        }

        res.send({
            message: 'Get all courses successfully',
            courses: appendData || courses,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};

export const getAllClient = async (req, res) => {
    try {
        const courses = await Courses.find({ isPublic: true })
            .populate([
                {
                    path: 'cate_id teacherId',
                    select: ['name', 'code', 'full_name'],
                },
            ])
            .sort({ _id: -1 });

        res.send({
            message: 'Get all courses successfully',
            courses,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.courseId;

        const selectedCourse = await Courses.findById(courseId).populate({
            path: 'chapters',
            select: ['name', 'isPublic', 'isFree', 'lessons'],
            populate: {
                path: 'lessons',
                select: ['name', 'url_video', 'isPublic'], // Chọn trường 'title' từ collection Lesson
            },
        });

        res.send({
            message: 'Get course successfully',
            course: selectedCourse,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};

export const getCourseLearning = async (req, res) => {
    try {
        const userId = req.userId;
        const courseId = req.params.courseId;

        const selectedCourse = await Courses.findById(courseId).populate({
            path: 'chapters',
            select: ['name', 'isPublic', 'isFree', 'lessons'],
            populate: {
                path: 'lessons',
                select: ['name', 'url_video', 'isPublic'],
            },
        });

        const lessonFn = await FinishLesson.find({ course_id: courseId, user_id: userId }).select(['lesson_id']);

        // Duyệt qua từng chapter và từng lesson để thêm trạng thái hoàn thành
        selectedCourse.chapters = selectedCourse.chapters.map((chapter) => {
            chapter.lessons = chapter.lessons.map((lesson) => {
                const isCompleted = lessonFn.some((l) => l.lesson_id.equals(lesson._id));
                return {
                    ...lesson,
                    _doc: { ...lesson._doc, isCompleted: isCompleted },
                };
            });
            return chapter;
        });

        // let nextLessonId = null;
        // let currentLessonId = null;

        // selectedCourse.chapters.forEach((chapter) => {
        //     const nextLessons = chapter.lessons.filter((lesson) => lesson._doc.isCompleted === false);
        //     if (nextLessons?.[0]) currentLessonId = nextLessons?.[0]._doc._id;
        //     if (nextLessons?.[1]) nextLessonId = nextLessons?.[1]._doc._id;
        // });

        res.send({
            message: 'Get course successfully',
            data: selectedCourse,
            // nextLessonId: nextLessonId,
            // currentLessonId: currentLessonId,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};

export const uploadImage = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            // Validate dữ liệu tải lên
            res.status(400).json({ message: 'Please upload an image.' });
            return null;
        }

        // ảnh mặt trước
        const frontImageB64 = Buffer.from(file.buffer).toString('base64');
        const frontImageDataURI = 'data:' + file.mimetype + ';base64,' + frontImageB64;

        const result = await cloudinary.uploader.upload_large(frontImageDataURI, {
            resource_type: 'image',
        });

        res.status(200).send({
            message: 'Upload Image successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};

export const uploadVideo = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            // Validate dữ liệu tải lên
            res.status(400).json({ message: 'Please upload an video.' });
            return null;
        }

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_large(
                'data:video/mp4;base64,' + file.buffer.toString('base64'),
                { resource_type: 'video' },
                (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                },
            );
        });

        res.status(200).send({
            message: 'Upload Video Successfully',
            playback_url: result.playback_url,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};

export const createCourse = async (req, res) => {
    try {
        const body = req.body;

        const course = await Courses.create(body);

        res.status(200).send({
            message: 'Create Course Success!',
            data: course,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const _id = req.params._id;

        const body = req.body;

        const course = await Courses.findByIdAndUpdate(_id, body, {
            new: true,
        });

        res.status(200).send({
            message: 'Update Course Success!',
            data: course,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};

export const updateCourseID = async (req, res) => {
    try {
        const _id = req.params.id;
        const body = req.body;
        console.log(12345, body);

        const course = await Courses.findByIdAndUpdate(_id, body, {
            new: true,
        });

        res.status(200).send({
            message: 'Update Course Success!',
            data: course,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const _id = req.params._id;

        await Courses.deleteOne({
            _id: _id,
        });

        res.status(200).send({
            message: 'Delete Course Success!',
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};

export const deleteCourseTeacher = async (req, res) => {
    try {
        const _id = req.params.id;

        await Courses.deleteOne({
            _id: _id,
        });

        res.status(200).send({
            message: 'Delete Course Success!',
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};
// user

export const getStudentsByTeacher = async (req, res) => {
    const { _page = 1, _limit = 5, _sort = 'createdAt', _order = 'asc', teacherId = '' } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === 'desc' ? -1 : 1,
        },
        populate: [
            {
                path: 'cate_id',
                select: ['name'],
            },
        ],
    };
    try {
        const { docs: courses } = await Courses.paginate({ teacherId: teacherId }, options);
        if (courses.length === 0) {
            return res.status(404).json({
                message: 'Courses does not exist',
            });
        }
        const courseIds = courses.map((course) => course._id);

        const data = await statusCourse
            .find({
                course_id: {
                    $in: courseIds,
                },
            })
            .populate([
                {
                    path: 'user_id',
                    select: ['name', 'full_name', 'avatar', 'email'],
                },
            ]);
        const newData = await Promise.all(
            data.map(async (item) => {
                const { name } = await courses_teacher.findById(item.course_id);
                return {
                    _id: item._id,
                    full_name: item.user_id.full_name,
                    email: item.user_id.email,
                    avatar: item.user_id.avatar,
                    course_id: name,
                };
            }),
        );
        return res.status(200).json({
            message: 'Get Courses successfully',
            newData,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};
