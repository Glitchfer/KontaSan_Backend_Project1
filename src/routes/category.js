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
// end point <--- untuk meng get data dari database
// GET
router.get("/", authorization, getAllCategory);
router.get("/:id", authorization, getCategoryById);

// POST
router.post("/product", authorization, getProduct);
router.post("/", authorization2, postCategory);

// PATCH/PUT (untuk meng update)
router.patch("/:id", authorization2, patchCategory);

// DELETE
router.delete("/:id", authorization2, deleteCategory);

// Export router

module.exports = router;
