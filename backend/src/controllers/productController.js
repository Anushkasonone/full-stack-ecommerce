const { Product, Category } = require("../models");
const cloudinary = require("../config/cloudinary");

// CREATE PRODUCT
// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            stock,
            categoryId
        } = req.body;

        if (!name || price === undefined || !categoryId) {
            return res.status(400).json({
                success: false,
                message: "Name, price and categoryId are required"
            });
        }

        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        let imageUrl = null;

        // Upload image to Cloudinary if an image was provided
        if (req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "ecommerce-products"
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                stream.end(req.file.buffer);
            });

            imageUrl = uploadResult.secure_url;
        }

        const product = await Product.create({
            name,
            description,
            price,
            stock: stock || 0,
            image: imageUrl,
            categoryId
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error("CREATE PRODUCT ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create product"
        });
    }
};


// GET ALL PRODUCTS
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: {
                model: Category,
                attributes: ["id", "name"]
            }
        });

        res.json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
    }
};


// GET PRODUCT BY ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(
            req.params.id,
            {
                include: {
                    model: Category,
                    attributes: ["id", "name"]
                }
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            product
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch product"
        });
    }
};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await product.update(req.body);

        res.json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update product"
        });
    }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await product.destroy();

        res.json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error("CREATE PRODUCT ERROR:", error);

res.status(500).json({
    success: false,
    message: error.message
});
    }
};


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};