const Customer = require("../models/customer.model");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createCustomer = async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    throw new CustomError.BadRequestError("Provide all credentials");
  }
  const customer = await Customer.create(req.body);
  res.status(StatusCodes.OK).json({ customer });
};

const getAllCustomer = async (req, res) => {
  const customers = await Customer.find({});
  res.status(StatusCodes.OK).json({ customers });
};

const getCustomer = async (req, res) => {
  const customerId = req.params.id;
  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw new CustomError.BadRequestError("No customer with such ID found");
  }
  res.status(StatusCodes.OK).json({ customer });
};

//to calculate total due, total paid amount
const getTotalOfCustomer = async (req, res) => {
  const customers = await Customer.find();

  const amountsWithUser = [];

  customers.forEach((customer) => {
    let customerTotalDueAmount = 0;
    let customerTotalPaidAmount = 0;
    let customerTotalAmount = 0;

    customer.purchases.forEach((purchase) => {
      customerTotalDueAmount += purchase.dueAmount;
      customerTotalPaidAmount += purchase.paidAmount;
      customerTotalAmount = customerTotalDueAmount + customerTotalPaidAmount;
    });

    amountsWithUser.push({
      user: customer.name,
      totalDueAmount: customerTotalDueAmount,
      totalPaidAmount: customerTotalPaidAmount,
      totalAmount: customerTotalAmount,
    });
  });

  res.status(StatusCodes.OK).json(amountsWithUser);
};



const dueClearance=async(req,res)=>{
  
}



module.exports = {
  createCustomer,
  getAllCustomer,
  getCustomer,
  getTotalOfCustomer,
};
