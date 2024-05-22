const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  dateBought: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    get: function () {
      const price = this.product.price;
      return price * this.quantity;
    },
  },
  paidAmount: {
    type: Number,
    default: 0,
  },
  dueAmount: {
    type: Number,
    default: function () {
      return this.totalAmount - this.paidAmount;
    },
  },
  status: {
    type: String,
    enum: ["paid", "due"],
    default: function () {
      return this.dueAmount === 0 ? "paid" : "due";
    },
  },
});

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  phone: {
    type: String,
    required: true,
  },
  purchases: [purchaseSchema],
});

module.exports = mongoose.model("Customer", customerSchema);
