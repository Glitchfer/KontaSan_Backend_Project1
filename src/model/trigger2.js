const connection = require("../config/mysql");
const { postTrigger } = require("../controller/trigger");

module.exports = {
  getTrigger2: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM orders LIMIT ? OFFSET ?`,
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  // Get Trigger Count untuk params invoice dan orders digabung disini
  getTriggerCount: (par) => {
    switch (par) {
      case "orders":
        return new Promise((resolve, reject) => {
          connection.query(
            `SELECT COUNT(*) as total FROM orders`,
            (error, result) => {
              !error ? resolve(result[0].total) : reject(new Error(error));
            }
          );
        });
        break;
      case "invoice":
        return new Promise((resolve, reject) => {
          connection.query(
            `SELECT COUNT(*) as total FROM invoice`,
            (error, result) => {
              !error ? resolve(result[0].total) : reject(new Error(error));
            }
          );
        });
        break;
    }
  },
  getTrigger2ById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        // note: ganti jadi WHERE orders_id = ?
        "SELECT * FROM orders WHERE invoice_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getOrderByInvoiceId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM orders INNER JOIN product USING (product_id) WHERE invoice_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getProductPriceById: (product_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM product WHERE product_id = ?",
        product_id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postTrigger2: (setData3) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO orders SET ?",
        setData3,
        (error, result) => {
          if (!error) {
            const newResult = {
              orders_id: result.insertId,

              ...setData3,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  patchTrigger2: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE orders SET ? WHERE orders_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              orders_id: id,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  deleteTrigger2: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM orders WHERE invoice_id = ?",
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  getOrdersAll: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM orders WHERE order_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
