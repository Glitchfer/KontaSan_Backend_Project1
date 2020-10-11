const connection = require("../config/mysql");
const { postTrigger } = require("../controller/trigger");

module.exports = {
  getTrigger1: (calendar) => {
    switch (calendar) {
      case "week":
        return new Promise((resolve, reject) => {
          connection.query(
            // `SELECT * FROM invoice INNER JOIN orders USING (invoice_id) LIMIT ? OFFSET ? `
            // `SELECT invoice.invoice_id, invoice.invoice_number, orders.cashier_name, orders.product_id, product.product_name, orders.item_quantity, orders.total_price, invoice.total_price, invoice.tax, invoice.sub_total, invoice.updated_at FROM invoice JOIN orders ON invoice.invoice_id = orders.invoice_id JOIN product ON orders.product_id = product.product_id LIMIT ? OFFSET ? `
            `SELECT invoice.invoice_number, orders.cashier_name, GROUP_CONCAT(CONCAT_WS(  orders.item_quantity, product.product_name), ' ', CONCAT_WS(product.product_name, orders.item_quantity), 'x') AS 'orders', GROUP_CONCAT(orders.total_price) AS 'price', invoice.total_price, invoice.tax, invoice.sub_total, invoice.updated_at FROM invoice JOIN orders ON invoice.invoice_id = orders.invoice_id JOIN product ON orders.product_id = product.product_id WHERE YEARWEEK(updated_at) = YEARWEEK(NOW())  GROUP BY updated_at`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error));
            }
          );
        });
        break;
      case "day":
        return new Promise((resolve, reject) => {
          connection.query(
            `SELECT invoice.invoice_number, orders.cashier_name, GROUP_CONCAT(CONCAT_WS(  orders.item_quantity, product.product_name), ' ', CONCAT_WS(product.product_name, orders.item_quantity), 'x') AS 'orders', GROUP_CONCAT(orders.total_price) AS 'price', invoice.total_price, invoice.tax, invoice.sub_total, invoice.updated_at FROM invoice JOIN orders ON invoice.invoice_id = orders.invoice_id JOIN product ON orders.product_id = product.product_id WHERE DATE(updated_at) = DATE(NOW())  GROUP BY updated_at`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error));
            }
          );
        });
        break;
      case "month":
        return new Promise((resolve, reject) => {
          connection.query(
            `SELECT invoice.invoice_number, orders.cashier_name, GROUP_CONCAT(CONCAT_WS(  orders.item_quantity, product.product_name), ' ', CONCAT_WS(product.product_name, orders.item_quantity), 'x') AS 'orders', GROUP_CONCAT(orders.total_price) AS 'price', invoice.total_price, invoice.tax, invoice.sub_total, invoice.updated_at FROM invoice JOIN orders ON invoice.invoice_id = orders.invoice_id JOIN product ON orders.product_id = product.product_id WHERE CONCAT(YEAR(updated_at),'/',MONTH(updated_at))=CONCAT(YEAR(NOW()),'/',MONTH(NOW()))  GROUP BY updated_at`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error));
            }
          );
        });
        break;
    }
  },
  getTrigger1ById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM invoice INNER JOIN orders USING (invoice_id) WHERE invoice_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getInvoiceId: (invoice_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM invoice WHERE invoice_id = ?",
        invoice_id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postTrigger1: (setData1) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO invoice SET ?",
        setData1,
        (error, result) => {
          if (!error) {
            const newResult = {
              invoice_id: result.insertId,
              ...setData1,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  patchTrigger1: (setData4, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE invoice SET ? WHERE invoice_id = ?",
        [setData4, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              invoice_id: id,
              ...setData4,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  deleteTrigger1: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM invoice WHERE invoice_id = ?",
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
};
