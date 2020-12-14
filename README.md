<h1 align="center">ExpressJS - #KontaSan_Project RESTfull API</h1>

Kontasan is a website-based POS application used to help cashier in managing orders. Particularly from backend side, this project is to providing API for Kontasa app to run its system. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name konta_san, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost // Database Host
DB_USER=root // Database Root
DB_PASS= // Password set for database is empty
DB_DATABASE=konta_san // Database
PORT=3001 // PORT
IP=127.0.0.1 // IP

```

## End Point

**1. GET**

- `/product?page=1&limit=5`(Get all product)

- `/product/:id`(GET product by id)

- `/trigger/order`(GET all order)

- `/trigger/invoice`(GET all invoice)

- `/trigger/invoice/:id`(GET invoice by id)

- `/trigger/order/:id`(GET order by id )

- `/income`(GET today income)

- `/income/orders`(GET weekly orders)

- `/history`(GET all history)

- `/history/orders`(GET history by id)

- `/category`(GET all category)

- `/category/:id`(GET category by id)

**2. POST**

- `/product` (Post product)

  - body `{ "product_name": "Capucinno", "category_id": 2, "product_harga": 6000 , "product_status" : 1 | 0}`

- `/category` (Post category)

  - body `{ "category_name": "Beverage"}`

- `/history` (Post history)

- `/history/revenue` (Get Revenue)

  - Query `{ "select": "hours" | "year" | "lastYear"}`

- `/income` (Post income)

- `/income/income` (Get this year income)

- `/trigger/invoice` (Post invoice)

- `/trigger/orders` (Post order)

  - Body `{ "cashier_name": "rey", "product_id": 1, "item_quantity": 2, "invoice_id": 103}`

- `/users/register` (Register)

  - Body `{ "user_email": "rey1234@gmail.com", "user_password": "adaadaada", "user_role": "#Admin", "user_name": "Rey"}`

- `/users/login` (Login)

  - Body `{ "user_email": "rey1234@gmail.com", "user_password": "adaakudisini"}`

**3. PATCH**

- `/product/:id` (Update product by id)

  - Body `{"product_name": "Teriyaki", "category_id": 1, "product_harga": 24000, "product_status": 1 | 0}`

- `/users` (Logout)

  - Query `{ "activity_id": 101, "user_id": 6}`

- `/users/:id` (Update user data)

  - Body `{ "user_password": "bebas", "user_status": 1 | 0}`

- `/trigger/invoice/:id` (Update invoice)

- `/trigger/orders/:id` (Update orders)

  - Body `{ "product_id": 4, "item_quantity": 2, "invoice_id": 105}`

- `/category/:id` (Update category)

  - Body `{ "category_name": "Souvenir"}`

**4. DELETE**

- `/product/:id` (Delete product by id)

- `/users/:id` (Delete user)

- `/category/:id` (Delete category)

- `/trigger/order/:id` (Delete orders)

- `/trigger/invoice/:id` (Delete invoice)

**Documentation API**

https://documenter.getpostman.com/view/12208824/TVRq1RHv

## Front-end

[https://github.com/Glitchfer/KontaSan_FrontEnd_Project2](https://github.com/Glitchfer/KontaSan_FrontEnd_Project2)

## License

© [Arif Rahman](https://github.com/Glitchfer)
