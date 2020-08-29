// Import router
const router = require("express").Router();
// Import controller
const {
  getAllTrigger,
  getTriggerById,
  postTrigger,
  patchTrigger,
  deleteTrigger,
} = require("../controller/trigger");

// end point <--- untuk meng get data dari database
// GET
router.get("/:params", getAllTrigger);
router.get("/:params/:id", getTriggerById);

// // POST
router.post("/:params", postTrigger);

// // PATCH/PUT (untuk meng update)
router.patch("/:params/:id", patchTrigger);

// // DELETE
router.delete("/:params/:id", deleteTrigger);

// Export router

module.exports = router;
