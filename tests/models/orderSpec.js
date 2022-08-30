const Client = require("../../src/config/db");
const Auth = require("../../src/controllers/auth.controller");
const Order = require("../../src/controllers/order.controller");
const Product = require("../../src/controllers/product.controller");

const store = new Order();


describe("Order Model", () => {
    describe("Order Model Methods Existance", () => {
        it('should have create method', () => {
            expect(store.createOrder).toBeDefined();
        })
        it('should have updateStatus method', () => {
            expect(store.updateStatus).toBeDefined();
        })
        it('should have getAllOrdersByUserId method', () => {
            expect(store.getAllOrdersByUserId).toBeDefined();
        })
    })
})

describe("Order Model Operations", () => {
    const authController = new Auth();
    const productController = new Product();

    const user = {
        email: 'yousefmeska123@gmail.com',
        firstname: 'yousef',
        middlename: 'mahmoud',
        lastname: 'meska',
        password: '4cex01bk',
        phone: 012112127
    }
    const product = {
        product_name: 'laptop Dell',
        price: 10,
        quantity: 2
    }
    beforeAll(async () => {
        const { token, createdUser } = await authController.create(user);
        console.log(token, createdUser);
        const productCreated = await productController.createProduct(product);
    })

    afterAll(async () => {
        const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1';
        const conn = await Client.connect();
        await conn.query(sql);
        conn.release();
    })

    it('should create order for user 1 with status accepted', async () => {
        const result = await store.createOrder({
            user_id: 1,
            status: "accepted",
            total_price: 10
        });
        expect(result).toEqual({
            id: result.id,
            user_id: result.user_id,
            status: result.status,
            total_price: result.total_price,
            created_at: result.created_at
        })
    })
})