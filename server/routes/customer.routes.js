const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getCustomer,
  getAllCustomer,
  getTotalOfCustomer,
} = require("../controllers/customer.controller");

router.post("/", createCustomer);
router.get("/amount", getTotalOfCustomer);
router.get("/:id", getCustomer);
router.get("/", getAllCustomer);

module.exports = router;
