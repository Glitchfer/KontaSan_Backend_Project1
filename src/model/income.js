const connection = require("../config/mysql");
const { postIncome } = require("../controller/income");

module.exports = {
  todayIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT sum(invoice.sub_total) as sub_total, COUNT(*) as total_order, DATE_FORMAT(CURRENT_DATE - INTERVAL 1 DAY, '%d-%m-%Y') as yesterday FROM invoice WHERE DATE(updated_at) = DATE(NOW()) - INTERVAL 1 DAY`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  weeklyOrders: (orders) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT sum(invoice.sub_total) as sub_total, COUNT(*) as total_order, DATE_FORMAT(CURRENT_DATE - INTERVAL 1 WEEK, '%d-%m-%Y') as last_week FROM invoice WHERE DATE(updated_at) = WEEK(NOW()) - INTERVAL 1 WEEK`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  thisYearIncome: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT sum(invoice.sub_total) as sub_total, COUNT(*) as total_order, DATE_FORMAT(DATE(NOW()) - INTERVAL 1 YEAR, '%Y') as last_year FROM invoice WHERE DATE(updated_at) = YEAR(NOW()) - INTERVAL 1 YEAR`,
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
