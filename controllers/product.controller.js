const ProductModel = require('../models/product');

class ProductController {
    constructor() {
        if (!ProductController.instance) {
            ProductController.instance = this;
        }
        return ProductController.instance;
    }

    getAllProducts(req, res) {
        ProductModel.find({}, (error, products) => {
            if (error) {
                console.error(error);
            }
            res.json(products);
            console.log(`Products list ${products}`);
        });

        // Promise
        // let promise = new Promise((resolve, reject) => {
        //     ProductModel.find({}, (err, products) => {
        //         if (err) {
        //             reject(err);
        //         }
        //         resolve(products);
        //     })
        // });
        //
        // promise
        //     .then(result => {
        //         res.json(result);
        //         console.log(`Products list: ${result}`);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }

    createProduct(req, res) {
        let product = new ProductModel({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            owner: req.body.owner
        });

        product.save((error, product) => {
            if (error) {
                console.log(error);
                res
                    .status(500)
                    .send(error);
            }
            console.log('Product successfully saved to db');
            res.json(product);
        });
    }

    updateProduct(req, res) {
        let id = req.params.id;
        ProductModel.findById(id, (error, product) => {
            if (error) {
                console.log(error);
                res.send(error);
            }
            product.name = req.body.name || product.name;
            product.category = req.body.category || product.category;
            product.price = req.body.price || product.price;
            product.owner = req.body.owner || product.owner;

            product.save((error, product) => {
                if (error) {
                    res
                        .status(500)
                        .send(error);
                }
                res.send(product);
            })
        });
    }

    deleteProduct(req, res) {
        let id = req.params.id;
        ProductModel.remove({'_id': id}, (err, product) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.send(`Removed by id: ${id}`);
        });
    }
}

const instance = new ProductController();
Object.freeze(instance);

module.exports = instance;