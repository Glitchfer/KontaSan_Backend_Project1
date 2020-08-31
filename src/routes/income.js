// Import router
const router = require("express").Router();
// Import controller
const {
  todayIncome,
  weeklyOrders,
  thisYearIncome,
  postIncome,
} = require("../controller/income");

// end point <--- untuk meng get data dari database
// GET
router.get("/", todayIncome);
router.get("/orders", weeklyOrders);

// POST
router.post("/income", thisYearIncome);
router.post("/", postIncome);

// Export router

module.exports = router;
