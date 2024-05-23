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

//for searching the customer in every keystroke
const searchCustomers = async (req, res) => {
  const { partialName } = req.body;

  try {
    const customers = await Customer.find({
      name: { $regex: partialName, $options: "i" },
    }).select("name");

    res.status(StatusCodes.OK).json(customers);
  } catch (error) {
    console.error("Error searching customers:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "An error occurred while searching customers.",
    });
  }
};

//for searching product in every key stroke
const searchProducts = async (req, res) => {
  const { partialName } = req.body;

  try {
    const products = await Product.find({
      name: { $regex: partialName, $options: "i" },
    }).select("name");

    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "An error occurred while searching products.",
    });
  }
};

module.exports = { createPurchase, searchCustomers, searchProducts };
