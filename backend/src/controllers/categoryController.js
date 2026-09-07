const { Category } = require("../models");

// CREATE CATEGORY
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        const category = await Category.create({
            name,
            description
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create category"
        });
    }
};


// GET ALL CATEGORIES
const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        res.json({
            success: true,
            categories
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch categories"
        });
    }
};


// EXPORT
module.exports = {
    createCategory,
    getCategories
};