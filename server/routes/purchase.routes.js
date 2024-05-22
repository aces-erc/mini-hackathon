const express = require("express");
const router = express.Router();

const {
  createPurchase,
  searchCustomers,
  searchProducts,
} = require("../controllers/purchase.controller");

router.post("/", createPurchase);
router.post("/find-customer", searchCustomers);
router.post("/find-products", searchProducts);

module.exports = router;
