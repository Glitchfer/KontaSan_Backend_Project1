// Import router
const router = require('express').Router()
// Import controller
const {
    getAllProduct,
    getProductById,
    getProductByName,
    postProduct,
    patchProduct,
    deleteProduct
} = require("../controller/product")

// end point <--- untuk meng get data dari database
// GET
router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.get("/:params/:name", getProductByName);

// POST
router.post("/", postProduct)

// PATCH/PUT (untuk meng update)
router.patch("/:id", patchProduct)

// DELETE
router.delete("/:id", deleteProduct)


// Export router

module.exports = router;