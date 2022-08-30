const Product = require("../../src/controllers/product.controller");

const productController = new Product();
describe('Product Model', () => {
    describe("Product Model Methods Existence", () => {

        it('should have createProduct method', () => {
            expect(productController.createProduct).toBeDefined();
        })
    })
})