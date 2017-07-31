const ProductModel = require('../models/product');

class ProductController {
    constructor() {
        if (!ProductController.instance) {
            ProductController.instance = this;
        }
        return ProductController.instance;
    }

    getAllProducts(req, res) {
        // Callback

        // ProductModel.find({}, (err, products) => {
        //     if (err) {
        //         console.error(err);
        //     }
        //     res.json(products);
        //     console.log(`Products list ${products}`);
        // })

        // Promise
        let promise = new Promise((resolve, reject) => {
            ProductModel.find({}, (err, products) => {
                if (err) {
                    reject(err);
                }
                resolve(products);
            })
        });

        promise
            .then(result => {
                res.json(result);
                console.log(`Products list: ${result}`);
            })
            .catch(error => {
                console.log(error);
            });

        return promise;
    }
}

const instance = new ProductController();
Object.freeze(instance);

module.exports = instance;