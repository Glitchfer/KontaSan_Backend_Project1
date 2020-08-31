const connection = require("../config/mysql");
const { postIncome } = require("../controller/income");

module.exports = {
  todayIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT sum(invoice.sub_total) as sub_total, COUNT(*) as total_order, DATE_FORMAT(CURRENT_DATE - 1, '%d-%m-%Y') as yesterday FROM invoice WHERE DATE(updated_at) = DATE(NOW())- 1`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  weeklyOrders: (orders) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) as total_order, sum(invoice.sub_total) as sub_total, WEEK(NOW()) - 1 as last_week FROM invoice WHERE WEEK(updated_at) = WEEK(NOW())- 1`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  thisYearIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT sum(invoice.sub_total) as sub_total, COUNT(*) as total_order, YEAR(NOW()) - 1 as last_year FROM invoice WHERE YEAR(updated_at) = YEAR(NOW())- 1`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  postIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM product`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
};
