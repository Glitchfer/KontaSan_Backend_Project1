// Import router
const router = require("express").Router();
// Import controller
const { registerUser, loginUser } = require("../controller/users");

// end point <--- untuk meng get data dari database
// GET
// router.get("/", getUsers);
router.get("/login", loginUser);

// POST
// router.post("/", thisYearIncome);
router.post("/register", registerUser);

// Export router

module.exports = router;
