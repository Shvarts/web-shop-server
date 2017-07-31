const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: false,
        default: 'Amazon'
    }
});

const ProductModel = mongoose.model('Product', schema);

module.exports = ProductModel;