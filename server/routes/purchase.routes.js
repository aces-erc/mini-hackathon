const express = require("express");
const router = express.Router();

const {
  createPurchase,
  searchCustomers,
  searchProducts,
} = require("../controllers/purchase.controller");

router.post("/", createPurchase);
router.get("/find-customer", searchCustomers);
router.get("/find-products", searchProducts);

module.exports = router;
