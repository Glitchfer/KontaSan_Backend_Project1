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
const {
  getYesterdayIncomeRedis,
  getLastWeekOrdersRedis,
  getLastYearIncomeRedis,
  getIncomeProductRedis,
} = require("../middleware/redis");

// end point <--- untuk meng get data dari database
// GET
router.get("/", authorization, getYesterdayIncomeRedis, todayIncome);
router.get("/orders", authorization, getLastWeekOrdersRedis, weeklyOrders);

// POST
router.post("/income", authorization, getLastYearIncomeRedis, thisYearIncome);
router.post("/", authorization2, getIncomeProductRedis, postIncome);

// Export router

module.exports = router;
