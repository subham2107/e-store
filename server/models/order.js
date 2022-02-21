const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }, 
    
    userId: mongoose.ObjectId,
    productList: [
      {
        productId: Number,
        title: String,
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
    amount: Number,
    currency: String,
    status: String,
    
});

module.exports = mongoose.model('Order', orderSchema);