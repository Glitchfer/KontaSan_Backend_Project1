// Import router
const router = require("express").Router();
// Import controller
const {
  getAllHistory,
  getHistoryById,
  postHistory,
  getRevenue,
  patchHistory,
  deleteHistory,
} = require("../controller/history");
const { authorization } = require("../middleware/auth");

// end point <--- untuk meng get data dari database
// GET
router.get("/", authorization, getAllHistory);
router.get("/orders", authorization, getHistoryById);

// POST
router.post("/", authorization, postHistory);
router.post("/revenue", authorization, getRevenue);

// PATCH/PUT (untuk meng update)
// router.patch("/:id", authorization, patchHistory);

// DELETE
// router.delete("/:id", authorization, deleteHistory);

// Export router

module.exports = router;
