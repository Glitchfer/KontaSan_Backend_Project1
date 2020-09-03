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
const { authorization, authorization2 } = require("../middleware/auth");

// end point <--- untuk meng get data dari database
// GET
router.get("/:params", authorization, getAllTrigger);
router.get("/:params/:id", authorization, getTriggerById);

// // POST
router.post("/:params", authorization, postTrigger);

// // PATCH/PUT (untuk meng update)
router.patch("/:params/:id", authorization, patchTrigger);

// // DELETE
router.delete("/:params/:id", authorization2, deleteTrigger);

// Export router

module.exports = router;
