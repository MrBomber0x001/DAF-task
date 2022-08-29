const { verifyToken } = require('../utils/jwt.js');
const Order = require('../controllers/order.controller.js');

const store = new Order();

const create = async (req, res, next) => {
    const order = {
        user_id: req.userId,
        status: req.body.status,
        total_price: req.body.total_price
    };

    try {
        const newOrder = await store.createOrder(order);
        return res.status(201).json({ success: true, message: "Order Placed Successfully", data: newOrder });
    } catch (error) {
        return res.status(400).send({ success: false, message: error.message });
    }
}


const getAllOrders = async (req, res, next) => {
    try {
        const orders = await store.getAllOrdersByUserId(parseInt(req.params.userId));
        return res.status(200).json({ success: true, data: orders });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

const updateStatus = async (req, res, next) => {
    try {
        const { status } = req.query;
        const updatedOrder = await store.updateStatus(status, parseInt(req.params.orderId));
        return res.status(200).json({ success: true, data: updatedOrder })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

const addProductToOrder = async (req, res, next) => {
    const { orderId, productId } = req.params;
    const { quantity } = req.body;

    try {
        const addedProduct = await store.addProduct(productId, orderId, quantity)
        return res.status(200).json({ success: true, message: "Product added to the order!", data: addedProduct });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}
const orderRoutes = (app) => {
    // app.get("/orders", verifyToken, index);
    // app.get("/orders/:id", verifyToken, show);
    app.post("/orders/create", verifyToken, create)
    app.get("/orders/users/:userId", verifyToken, getAllOrders);
    app.put("/orders/:orderId", updateStatus);
    app.post("/orders/:orderId/products/:productId", verifyToken, addProductToOrder);

}
module.exports = orderRoutes;