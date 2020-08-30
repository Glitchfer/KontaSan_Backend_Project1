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
            // `SELECT DATE_FORMAT(updated_at, '%d-%m-%Y') as Date, sub_total as Total FROM invoice`
            `SELECT DATE_FORMAT(updated_at, '%d/%m %T') as Date, sub_total as Total FROM invoice`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error));
            }
          );
        });
        break;
      case "year":
        return new Promise((resolve, reject) => {
          connection.query(
            `SELECT DATE_FORMAT(updated_at, '%d-%m-%Y') as Date, sub_total as Total FROM invoice`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error));
            }
          );
        });
        break;
      case "lastYear":
        return new Promise((resolve, reject) => {
          connection.query(
            `SELECT DATE_FORMAT(updated_at, '%d-%m-%Y') as Date, sub_total as Total FROM invoice WHERE updated_at < 01-01-2020`,
            (error, result) => {
              !error ? resolve(result) : reject(new Error(error));
            }
          );
        });
        break;
    }
    // return new Promise((resolve, reject) => {
    //   connection.query(
    //     // `SELECT DATE_FORMAT(updated_at, '%d-%m-%Y') as Date, sub_total as Total FROM invoice`
    //     `SELECT DATE_FORMAT(updated_at, '%d-%m-%Y %T') as Date, sub_total as Total FROM invoice`,
    //     (error, result) => {
    //       !error ? resolve(result) : reject(new Error(error));
    //     }
    //   );
    // });
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
  patchHistory: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE history SET ? WHERE history_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              history_id: id,
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
  deleteHistory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM history WHERE history_id = ?",
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
