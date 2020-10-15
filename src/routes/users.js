// Import router
const router = require("express").Router();
// Import controller
const {
  registerUser,
  loginUser,
  patchLogout,
  patchUser,
  deleteUser,
  sendEmail,
} = require("../controller/users");
const { authorization2 } = require("../middleware/auth");

// GET

// POST
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/sendemail", sendEmail);

// PATCH/PUT (untuk meng update)
router.patch("/", patchLogout);
router.patch("/:id", authorization2, patchUser);
// DELETE
router.delete("/:id", authorization2, deleteUser);
// Export router

module.exports = router;
