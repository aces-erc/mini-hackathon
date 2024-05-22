const Customer = require("../models/customer.model");
const Product = require("../models/product.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createPurchase = async (req, res) => {
  const { customerName, productName, paidAmount, quantity } = req.body;

  const customer = await Customer.findOne({
    name: { $regex: customerName, $options: "i" },
  });
  if (!customer) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Customer not found. Please add customer." });
  }

  const product = await Product.findOne({
    name: { $regex: productName, $options: "i" },
  });
  if (!product) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Product not found. Please add product." });
  }

  // Validate input data
  if (typeof paidAmount !== "number" || typeof quantity !== "number") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid input data. Please provide valid numbers." });
  }

  const totalAmount = product.price * quantity;

  const dueAmount = totalAmount - paidAmount;

  const newPurchase = {
    product: product._id,
    quantity,
    totalAmount,
    paidAmount,
    dueAmount,
  };

  customer.purchases.push(newPurchase);

  await customer.save();

  res.status(StatusCodes.OK).json({ msg: "Purchase created successfully." });
};

module.exports = { createPurchase };
