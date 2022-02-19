const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({

    productList: [
        {
            productId: Number,
            title: String,
            oneProductPrice: Number,
            quantityPrice: Number,
            cartQuantity: Number,
            description: String,
            category: String,
            image: String,
            rating: {
                rate: Number,
                count: Number
            }

        }
    
    ],
    
    totalCartPrice: Number,

    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Cart', cartSchema);