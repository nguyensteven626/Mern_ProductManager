//importing controller
const ProductController = require('../controllers/product.controllers');
// console.log(JokeController);

module.exports = app => {
    app.get('/api/hello', (request, response) => {
        response.json({message: "hello"})
    })
    app.get('/api/products', ProductController.findAllProducts);
    app.get('/api/products/:id', ProductController.findOneSingleProduct);
    app.put('/api/products/update/:id', ProductController.updateExistingProduct);
    app.post('/api/products/new', ProductController.createNewProduct);
    app.delete('/api/products/delete/:id', ProductController.deleteAnExistingProduct);
}