const supertest = require("supertest");
const app = require("../../src/app.js");

const request = supertest(app);

describe("Testing Basic Endpoint server", () => {
    it('GET the / endpoint', async () => {
        const response = await request.get("/");
        expect(response.status).toBe(200);
    })
})