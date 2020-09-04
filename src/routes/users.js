// Import router
const router = require("express").Router();
// Import controller
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controller/users");
const { authorization2 } = require("../middleware/auth");

// GET
// router.get("/", getUsers);
router.get("/login", loginUser);

// POST
// router.post("/", thisYearIncome);
router.post("/register", registerUser);

// PATCH/PUT (untuk meng update)
router.patch("/:id", authorization2, updateUser);

// DELETE
router.delete("/:id", authorization2, deleteUser);

// Export router

module.exports = router;
