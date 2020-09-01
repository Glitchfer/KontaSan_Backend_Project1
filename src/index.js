const routes = require("express").Router();

// import route disini
// misalkan ada file baru (mis. category.js) tambahkan disini juga
const product = require("./routes/product");
const category = require("./routes/category");
// const invoice = require("./routes/invoice")
// const orders = require("./routes/orders")
const history = require("./routes/history");
const trigger = require("./routes/trigger");
const tutorial = require("./routes/tutorial");
const income = require("./routes/income");
const users = require("./routes/users");

// buat middle disini
routes.use("/product", product);
routes.use("/category", category);
// routes.use("/invoice", invoice)
// routes.use("/orders", orders)
routes.use("/history", history);
routes.use("/trigger", trigger);
routes.use("/tutorial", tutorial);
routes.use("/income", income);
routes.use("/users", users);

module.exports = routes;
