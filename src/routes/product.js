// Import router
const router = require('express').Router()
// Import controller
const {
    getAllProduct,
    getProductBy,
    postProduct,
    patchProduct,
    deleteProduct
} = require("../controller/product")

// end point
// GET
router.get("/", getAllProduct);
router.get("/:id", getProductBy);

// POST
router.post("/", postProduct)

// PATCH/PUT (untuk meng update)
router.patch("/:id", patchProduct)

// DELETE
router.delete("/:id", deleteProduct)


// Export router

module.exports = router;