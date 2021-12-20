const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    _id: Number,
    title: String,
    price: Number,
    quantity: Number,
    description: String,
    category: String,
    image: String,
    rating: {
        rate: Number,
        count: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Product', productSchema);