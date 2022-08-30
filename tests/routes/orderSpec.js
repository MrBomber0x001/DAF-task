const supertest = require("supertest")
const app = require("../../src/app.js");
const Auth = require("../../src/controllers/auth.controller.js");

const request = supertest(app);

let token1 = '';
const authController = new Auth();
describe("Order CRUD API endpoints", () => {
    const user = {
        firstname: "test",
        middlename: "test1",
        lastname: "test2",
        phone: 0121121212,
        email: "test@gmail.com",
        password: "test1234"
    }
    beforeAll(async () => {
        const { token } = await authController.create(user);
        token1 = token;
    })
    afterAll(async () => {
        const conn = await Client.connect();
        const sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
        await conn.query(sql);
        conn.release();
    })

    it('should return 201 for creating order', async () => {
        const response = await request.post('/orders/create').set('Content-Type', 'application/json').set(`Authorization`, `Bearer ${token1}`).send({
            user_id: 1,
            status: "accepted",
            total_price: 12
        });
        expect(response.status).toBe(201)
        expect(response.body).toEqual({
            success: true,
            message: "Order Placed Successfully",
            data: Object({
                id: 1, user_id: 1, total_price:
                    '12', status: 'accepted', created_at: response.body.data.created_at
            })
        })
    })
})