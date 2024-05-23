const Customer = require("../models/customer.model");
const Product = require("../models/product.model");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment");
const CustomError = require("../errors");

const createPurchase = async (req, res) => {
  const { customerName, productName, paidAmount, quantity } = req.body;

  const customer = await Customer.findOne({
    name: { $regex: customerName, $options: "i" },
  });
  // if (!customerName) {
  //   customerName = "random";
  // }

  const product = await Product.findOne({
    name: { $regex: productName, $options: "i" },
  });
  if (!product) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Product not found. Please add product." });
  }

  const totalAmount = product.price * quantity;

  if (paidAmount > totalAmount) {
    throw new CustomError.BadRequestError("Cannot pay more than total amount");
  }

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

  res.status(StatusCodes.OK).json({ newPurchase, customerName });
};

const searchCustomers = async (req, res) => {
  const customers = await Customer.find({});
  if (!customers) {
    throw new CustomError.NotFoundError("Users not found");
  }
  res.status(StatusCodes.OK).json({ customers });
};

const searchProducts = async (req, res) => {
  const products = await Customer.find({});
  if (!products) {
    throw new CustomError.NotFoundError("Users not found");
  }
  res.status(StatusCodes.OK).json({ products });
};

const totalSalesOfDay = async (req, res) => {
  const startOfDay = moment().startOf("day");
  const endOfDay = moment().endOf("day");

  const sales = await Customer.aggregate([
    {
      $unwind: "$purchases",
    },
    {
      $match: {
        "purchases.dateBought": {
          $gte: startOfDay.toDate(),
          $lte: endOfDay.toDate(),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$purchases.totalAmount" },
        totalPaid: { $sum: "$purchases.paidAmount" },
        totalDue: { $sum: "$purchases.dueAmount" },
      },
    },
  ]);

  const { totalSales, totalPaid, totalDue } =
    sales.length > 0 ? sales[0] : { totalSales: 0, totalPaid: 0, totalDue: 0 };

  res.status(StatusCodes.OK).json({ totalSales, totalPaid, totalDue });
};

module.exports = {
  createPurchase,
  searchCustomers,
  searchProducts,
  totalSalesOfDay,
};
