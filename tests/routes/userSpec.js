const supertest = require("supertest");
const app = require("../../src/app.js");
const request = supertest(app);

let token1 = '';

describe('User Authentication API', () => {
    const user = {
        email: "mrbomberboy123@gmail.com",
        firstname: "Yousef",
        middlename: "Mahmoud",
        lastname: "Meska",
        password: "4cex01bk",
        phone: 01211212
    }

    afterAll(async () => {
        const conn = await Client.connect();
        const SQL = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1';
        await conn.query(SQL);
        conn.release();
    })
    it('should return 201 ok for creating', async () => {
        const response = await request.post('/auth/signup').set('Content-Type', 'application/json')
            .send(user)
        expect(response.status).toBe(201);
    })
})