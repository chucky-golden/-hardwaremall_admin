const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    cloudinaryid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    countperimport: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    affiliate: {
        type: String,
        required: true
    },
}, { timestamps: true })


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product