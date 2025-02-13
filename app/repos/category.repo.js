const { BLOG_STATUS } = require("../config/const");
const { db } = require("../lib/db");
const { AppError } = require("../lib/helpers");

class CategoryRepo {
    get = async () => {
        return await db.categories.find();
    };

    /**
     *
     * @param {string} slug
     */
    getBlogsByCategoryName = async (slug) => {
        const data = await db.categories.aggregate([
            {
                $match: { title: slug },
            },
            {
                $lookup: {
                    from: "blogs",
                    localField: "_id",
                    foreignField: "categories",
                    as: "blogs",
                    pipeline: [
                        {
                            $match: { status: BLOG_STATUS.PUBLISHED },
                        },
                        {
                            $lookup: {
                                from: "comments",
                                localField: "_id",
                                foreignField: "blogId",
                                as: "comments",
                                pipeline: [
                                    {
                                        $lookup: {
                                            from: "users",
                                            localField: "authorId",
                                            foreignField: "_id",
                                            as: "author",
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "authorId",
                                foreignField: "_id",
                                as: "author",
                            },
                        },
                        {
                            $lookup: {
                                from: "categories",
                                localField: "categories",
                                foreignField: "_id",
                                as: "categories",
                            },
                        },
                    ],
                },
            },
        ]);

        return data;
    };

    /**
     * @param {string} id
     */
    getById = async (id) => {
        return await db.categories.findOne({ _id: id });
    };

    /**
     * @param {string} title
     */
    getByTitle = async (title) => {
        return await db.categories.findOne({
            title: title.toLowerCase(),
        });
    };

    create = async (data) => {
        return await db.categories.create(data);
    };

    /**
     * @param {string} id
     */
    delete = async (id) => {
        const blogs = await db.blogs.find({
            categories: id,
        });
        if (blogs.length > 0)
            throw new AppError("Category is in use", "BAD_REQUEST");

        return await db.categories.deleteOne({
            _id: id,
        });
    };
}

module.exports = new CategoryRepo();
