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

// end point <--- untuk meng get data dari database
// GET
router.get("/", getAllHistory);
router.get("/orders", getHistoryById);

// POST
router.post("/", postHistory);
router.post("/revenue", getRevenue);

// PATCH/PUT (untuk meng update)
router.patch("/:id", patchHistory);

// DELETE
router.delete("/:id", deleteHistory);

// Export router

module.exports = router;
