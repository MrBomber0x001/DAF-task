const Client = require("../config/db");

module.exports = class Order {
    async addProduct(product_id, order_id, quantity) {
        try {
            const orderSql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(orderSql, [order_id]);
            const order = result.rows[0];
            if (order.status !== 'accepted') {
                throw new Error(`Could not add product: ${product_id} to order: ${order_id} because order is closed!`);
            }
            conn.release();
        } catch (error) {
            throw new Error(`${error}`);
        }
        try {
            const sql = 'INSERT INTO order_details (quantity, order_id, product_id) VALUES ($1, $2, $3)'
            const conn = await Client.connect();
            const result = await conn.query(sql, [quantity, order_id, product_id]);
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(e);
        }
    }
    async getAllOrdersByUserId(userId) {
        try {
            const sql = `
        SELECT o.id AS id, o.user_id, o.status as status, u.firstname, 
        JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.product_name, 'price', p.price, 'quantity', p.quantity)) AS products
        FROM orders as o
        LEFT JOIN order_details AS od ON o.id = od.order_id
        LEFT JOIN products As p ON od.product_id = p.id
        LEFT JOIN users AS u ON u.id = o.user_id
        WHERE o.user_id = $1
        GROUP BY o.id, u.firstname, o.status, o.user_id
            `
            const conn = await Client.connect();
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(error);
        }
    }

    async createOrder(o) {
        try {
            const { user_id, status, total_price } = o;
            const sql = `INSERT INTO orders (user_id, status, total_price, created_at) VALUES ($1, $2, $3, $4) RETURNING *`;
            const conn = await Client.connect();
            const result = await conn.query(sql, [user_id, status, total_price, new Date()]);
            const sql2 = `INSERT INTO users_orders (user_id, order_id) VALUES ($1, $2)`;
            await conn.query(sql2, [user_id, result.rows[0].id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateStatus(status, orderId) {
        try {
            const conn = await Client.connect();
            const sql = `UPDATE orders SET status=$1 WHERE id=$2 RETURNING *`;
            const result = await conn.query(sql, [status, orderId]);
        } catch (error) {
            throw new Error(error);
        }
    }
}


