const Client = require("../config/db");

module.exports = class Product {
    async createProduct(p) {
        try {
            const { product_name, price, quantity } = p;
            const sql = `INSERT INTO products (product_name, price, quantity) VALUES ($1, $2, $3) RETURNING *`;
            const conn = await Client.connect();
            const result = await conn.query(sql, [product_name, price, quantity]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(error);
        }
    }
}