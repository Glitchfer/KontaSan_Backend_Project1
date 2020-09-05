// Import router
const router = require("express").Router();
// Import controller
const {
  registerUser,
  loginUser,
  patchLogout,
  patchUser,
  deleteUser,
} = require("../controller/users");
const { authorization2 } = require("../middleware/auth");

// GET
router.get("/login", loginUser);

// POST
router.post("/register", registerUser);

// PATCH/PUT (untuk meng update)
router.patch("/", patchLogout);
router.patch("/:id", authorization2, patchUser);
// DELETE
router.delete("/:id", authorization2, deleteUser);
// Export router

module.exports = router;
