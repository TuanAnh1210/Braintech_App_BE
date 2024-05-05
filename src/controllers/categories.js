import Categories from '../models/categories.js';

export const getAll = async (req, res) => {
    try {
        const data = await Categories.find({});

        if (!data) {
            return res.status(400).send({
                message: 'Category does not exist',
                data: [],
            });
        }

        res.send({
            message: 'Get Categories successfully',
            data,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};
