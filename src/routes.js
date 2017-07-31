const express = require('express');
const routes = express.Router();
const productController = require('../controllers/product.controller');

routes.get('/', productController.getAllProducts);

module.exports = routes;