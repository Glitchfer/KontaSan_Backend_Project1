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
const {
  getInvoiceRedis,
  getOrderRedis,
  getInvoiceByIdRedis,
  getOrderByInvoiceIdRedis,
  clearDataTriggerRedis,
} = require("../middleware/redis");

// end point <--- untuk meng get data dari database
// GET
router.get(
  "/:params",
  authorization,
  getInvoiceRedis,
  getOrderRedis,
  getAllTrigger
);
router.get(
  "/:params/:id",
  authorization,
  getInvoiceByIdRedis,
  getOrderByInvoiceIdRedis,
  getTriggerById
);

// // POST
router.post("/:params", authorization, clearDataTriggerRedis, postTrigger);

// // PATCH/PUT (untuk meng update)
router.patch(
  "/:params/:id",
  authorization,
  clearDataTriggerRedis,
  patchTrigger
);

// // DELETE
router.delete(
  "/:params/:id",
  authorization2,
  clearDataTriggerRedis,
  deleteTrigger
);

// Export router

module.exports = router;
