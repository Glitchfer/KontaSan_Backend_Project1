const connection = require("../config/mysql");
const { postHistory } = require("../controller/history");

module.exports = {
  getAllHistory: () => {
    //   THIS END POINT TO GET TODAYS INCOME
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT sum(invoice.sub_total) as todays_income FROM invoice WHERE DATE(updated_at) = DATE(NOW()) GROUP BY DATE(NOW())`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryById: () => {
    //   THIS END POINT TO GET TOTAL ORDERS
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) as Total_Orders FROM invoice WHERE WEEK(updated_at) = WEEK(NOW()) GROUP BY WEEK(NOW())`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getRevenue: (select) => {
    //   THIS END POINT TO GET TOTAL ORDERS
    switch (select) {
      case "hours":
        return new Promise((resolve, reject) => {
          connection.query(
            `SELECT DATE_FORMAT(updated_at, '%d/%m %T') as Date, sub_total as Total FROM invoice WHERE YEAR(updated_at) = YEAR(NOW())`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error));
            }
          );
        });
        break;
      case "year":
        return new Promise((resolve, reject) => {
          connection.query(
            `SELECT DATE_FORMAT(updated_at, '%d-%m-%Y') as Date, sub_total as Total FROM invoice WHERE YEAR(updated_at) = YEAR(NOW())`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error));
            }
          );
        });
        break;
      case "lastYear":
        return new Promise((resolve, reject) => {
          connection.query(
            `SELECT DATE_FORMAT(updated_at, '%d-%m-%Y') as Date, sub_total as Total FROM invoice WHERE YEAR(updated_at) = YEAR(NOW())-1`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error));
            }
          );
        });
        break;
    }
  },
  postHistory: () => {
    //   THIS END POINT TO GET THIS YEARS INCOME
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(invoice.sub_total) as ThisYears_Income FROM invoice WHERE YEAR(updated_at) = YEAR(NOW()) GROUP BY YEAR(NOW())`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
};
