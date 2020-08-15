// Import router
const router = require('express').Router()
// Import controller
const {
    getAllProduct,
    getProductById,
    postProduct,
    patchProduct,
    deleteProduct
} = require("../controller/product")

// end point <--- untuk meng get data dari database
// GET
router.get("/", getAllProduct);
router.get("/:id", getProductById);

// POST
router.post("/", postProduct)

// PATCH/PUT (untuk meng update)
router.patch("/:id", patchProduct)

// DELETE
router.delete("/:id", deleteProduct)


// Export router

module.exports = router;