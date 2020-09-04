// Import router
const router = require("express").Router();
// Import controller
const {
  getAllProduct,
  getProductBy,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../controller/product");
const { authorization, authorization2 } = require("../middleware/auth");
const {
  getProductByIdRedis,
  getAllProductRedis,
  searchProductRedis,
  sortProductByRedis,
  clearDataProductRedis,
} = require("../middleware/redis");
const uploadFilter = require("../middleware/multer");

// end point
// GET
router.get("/", authorization, getAllProductRedis, getAllProduct);
router.get(
  "/:id",
  authorization,
  getProductByIdRedis,
  searchProductRedis,
  sortProductByRedis,
  getProductBy
);

// POST
router.post(
  "/",
  authorization2,
  uploadFilter,
  clearDataProductRedis,
  postProduct
);

// PATCH/PUT (untuk meng update)
router.patch(
  "/:id",
  authorization2,
  clearDataProductRedis,
  uploadFilter,
  patchProduct
);

// DELETE
router.delete("/:id", authorization2, clearDataProductRedis, deleteProduct);

// Export router

module.exports = router;
