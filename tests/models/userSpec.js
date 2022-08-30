const Auth = require("../../src/controllers/auth.controller")

describe("Auth model", () => {
    const authController = new Auth();
    describe("Auth Model Methods Existence", () => {
        it('should have create method', () => {
            expect(authController.create).toBeDefined();
        })

        it('should have authenticate method', () => {
            expect(authController.authenticate).toBeDefined();
        })
    });
})