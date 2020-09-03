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
const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (request, file, callback) => {
//     callback(null, "./uploads/");
//   },
//   filename: (request, file, callback) => {
//     console.log(file);
//     callback(
//       null,
//       new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
//     );
//   },
// });
const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    console.log(file.mimetype);
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      callback(null, "./uploads/");
    } else {
      return callback("Invalid image format, only jpeg / png are allowed");
    }
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

let upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

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
