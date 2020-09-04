const connection = require("../config/mysql");
const { registerUser } = require("../controller/users");

module.exports = {
  //   getUsers: () => {
  //     return new Promise((resolve, reject) => {
  //       connection.query(
  //         `SELECT sum(invoice.sub_total) as sub_total, COUNT(*) as total_order, DATE_FORMAT(CURRENT_DATE - 1, '%d-%m-%Y') as yesterday FROM invoice WHERE DATE(updated_at) = DATE(NOW())- 1`,
  //         (error, result) => {
  //           !error ? resolve(result) : reject(new Error(error));
  //         }
  //       );
  //     });
  //   },
  registerUser: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData,
          };
          delete newResult.user_password;
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user_id, user_email, user_password, user_name, user_role, user_status FROM user WHERE user_email = ?",
        email,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  checkUserName: (name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT user_id, user_email, user_password, user_name, user_role, user_status FROM user WHERE user_name = ?",
        name,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  updateUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE user SET ? WHERE user_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              category_id: id,
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
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_id = ?",
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM user WHERE user_id = ?",
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
