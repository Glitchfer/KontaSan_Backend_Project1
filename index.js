require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routerNavigation = require("./src");
const cors = require("cors");
const app = express();

// midleware setting

app.use(cors());

// bodyParser setting
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    //<-- digunakan untuk mengambil data di urlencoded
    extended: false, //<-- bisa berupa true/false, jika berdasarkan QS value akan true
  })
);

// Morgan setting
app.use(morgan("dev")); //<-- dev merupakan format yg ada didalam morgan, yang berfungsi untuk menampilkan akses dari user
app.use(express.static("uploads"));
// cors setting, untuk membatasi akses kepada orang luar
app.use((request, response, next) => {
  response.header(
    "Access-Control-Allow-Origin",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:5500",
    "http://172.31.59.4:3001",
    "http://localhost:8080/",
    "http://192.168.100.7:8080/",
    "https://backend-kontasan.fwdev.online/"
  );
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  next();
});

// routernavigation setting
app.use("/", routerNavigation);

app.get("*", (request, response) => {
  response.status(404).send("path not found");
});

app.listen(process.env.PORT, process.env.IP, () => {
  //<----- menjalankan pada port tertentu
  console.log(
    `Express app sudah berjalan di port ${process.env.PORT} dan IP ${process.env.IP}`
  );
});
