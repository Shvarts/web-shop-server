const productController = require('../controllers/product.controller');
const express = require('express');
const routes = express.Router();

// CRUD routes
routes.get('/', productController.getAllProducts);
routes.post('/create', productController.createProduct);
routes.put('/update/:id', productController.updateProduct);
routes.delete('/delete/:id', productController.deleteProduct);


module.exports = routes;