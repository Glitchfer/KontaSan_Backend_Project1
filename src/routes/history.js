// Import router
const router = require("express").Router();
// Import controller
const {
  getAllHistory,
  getHistoryById,
  postHistory,
  getRevenue,
  // patchHistory,
  // deleteHistory,
} = require("../controller/history");
const { authorization } = require("../middleware/auth");
const {
  getTodayIncomeRedis,
  getTotalOrdersRedis,
  getThisYearIncomeRedis,
  getRevenueRedis,
} = require("../middleware/redis");

// end point <--- untuk meng get data dari database
// GET
router.get("/", authorization, getTodayIncomeRedis, getAllHistory);
router.get("/orders", authorization, getTotalOrdersRedis, getHistoryById);

// POST
router.post("/", authorization, getThisYearIncomeRedis, postHistory);
router.post("/revenue", authorization, getRevenueRedis, getRevenue);

// PATCH/PUT (untuk meng update)
// router.patch("/:id", authorization, patchHistory);

// DELETE
// router.delete("/:id", authorization, deleteHistory);

// Export router

module.exports = router;
