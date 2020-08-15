// Import router
const router = require('express').Router()
// Import controller
const {
    getAllCategory,
    getCategoryById,
    postCategory,
    patchCategory,
    deleteCategory
} = require("../controller/category")

// end point <--- untuk meng get data dari database
// GET
router.get("/", getAllCategory);
router.get("/:id", getCategoryById);

// POST
router.post("/", postCategory)

// PATCH/PUT (untuk meng update)
router.patch("/:id", patchCategory)

// DELETE
router.delete("/:id", deleteCategory)


// Export router

module.exports = router;