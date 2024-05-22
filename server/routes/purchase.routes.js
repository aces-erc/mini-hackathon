const express = require("express");
const router = express.Router();

const { createPurchase } = require("../controllers/purchase.controller");

router.post("/", createPurchase);

module.exports = router;
