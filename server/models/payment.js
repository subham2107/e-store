const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema({
    
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }, 
    
    amount: Number,
    status: Boolean,
    method: String,
    order_details: String,
    payment_details:String,
    
});

module.exports = mongoose.model('Payment', paymentSchema);