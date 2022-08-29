const {verifyToken} = require("../utils/jwt.js");
const Product = require('../controllers/product.controller.js');
const productController = new Product();

const createProduct = async (req, res, next) => {
    const { product_name, price, quantity } = req.body;
    const product = {
        product_name,
        price,
        quantity
    }

    try {
        const newProduct = await productController.createProduct(product);
        return res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}
const productRoutes = (app) => {
    app.post("/products/create", verifyToken, createProduct)
}

module.exports = productRoutes;