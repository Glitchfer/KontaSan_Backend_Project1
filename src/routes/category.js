// Import router
const router = require("express").Router();
// Import controller
const {
  getAllCategory,
  getCategoryById,
  getProduct,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../controller/category");
const { authorization, authorization2 } = require("../middleware/auth");
const {
  getAllCategoryRedis,
  getCategoryByIdRedis,
  getCategoryProductRedis,
  clearDataCategoryRedis,
} = require("../middleware/redis");
// end point <--- untuk meng get data dari database
// GET
router.get("/", authorization, getAllCategoryRedis, getAllCategory);
router.get("/:id", authorization, getCategoryByIdRedis, getCategoryById);

// POST
router.post("/product", authorization, getCategoryProductRedis, getProduct);
router.post("/", authorization2, clearDataCategoryRedis, postCategory);

// PATCH/PUT (untuk meng update)
router.patch("/:id", authorization2, clearDataCategoryRedis, patchCategory);

// DELETE
router.delete("/:id", authorization2, clearDataCategoryRedis, deleteCategory);

// Export router

module.exports = router;
