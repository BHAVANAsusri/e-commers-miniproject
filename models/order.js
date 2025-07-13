const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // optional, only if users are registered
  },
  items: [
    {
      name: String,
      price: Number,
      description: String
    }
  ],
  total: Number,
  address: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
