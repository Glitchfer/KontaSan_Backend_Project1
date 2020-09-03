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
  // getProductRedis,
  clearDataProductRedis,
} = require("../middleware/redis");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (request, file, callback) => {
    console.log(file);
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

let upload = multer({ storage: storage });

// end point
// GET
router.get("/", authorization, /*tambahkan redis*/ getAllProduct);
router.get("/:id", authorization, getProductByIdRedis, getProductBy);

// POST
router.post("/", authorization2, upload.single("img"), postProduct);

// PATCH/PUT (untuk meng update)
router.patch(
  "/:id",
  authorization2,
  clearDataProductRedis,
  upload.single("img"),
  patchProduct
);

// DELETE
router.delete("/:id", authorization2, clearDataProductRedis, deleteProduct);

// Export router

module.exports = router;
