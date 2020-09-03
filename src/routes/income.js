// Import router
const router = require("express").Router();
// Import controller
const {
  todayIncome,
  weeklyOrders,
  thisYearIncome,
  postIncome,
} = require("../controller/income");
const { authorization, authorization2 } = require("../middleware/auth");

// end point <--- untuk meng get data dari database
// GET
router.get("/", authorization, todayIncome);
router.get("/orders", authorization, weeklyOrders);

// POST
router.post("/income", authorization, thisYearIncome);
router.post("/", authorization2, postIncome);

// Export router

module.exports = router;
