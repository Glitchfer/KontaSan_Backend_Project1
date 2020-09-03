const {
  // getUsers,
  registerUser,
  checkUser,
  checkUserName,
} = require("../model/users");

const helper = require("../helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  // getUsers: async (request, response) => {
  //     try {
  //         const result = await getUsers();
  //         return helper.response(response, 200, "Get Success", result);
  //     } catch (error) {
  //         return helper.response(response, 400, "Bad Request", error);
  //     }
  // },
  registerUser: async (request, response) => {
    const { register } = request.params;
    const { user_email, user_password, user_role, user_name } = request.body;
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(user_password, salt);
    //   console.log("user password = " + user_password);
    //   console.log("user password bcrypt= " + encryptPassword);
    const setData = {
      user_email,
      user_password: encryptPassword,
      user_name,
      user_role: user_role === "#admin" ? 1 : 2,
      user_status: 0,
      user_created_at: new Date(),
    };
    try {
      const checkPassword = bcrypt.compareSync(
        user_password,
        "$2b$10$N0X3QRtZ7vMgZLVjHKKvrunzJJ4HILSnopuziHM517ewSnOr3Ugx6"
      );
      if (user_email === "" || user_name === "" || checkPassword === true) {
        return helper.response(
          response,
          400,
          "Invalid Input, All Of The Data Must Be Filled"
        );
      } else {
        if (user_password.length < 8) {
          return helper.response(
            response,
            400,
            `Password must be at least has minimum 8 character length`
          );
        } else {
          const checkName = await checkUserName(user_name);
          if (checkName.length > 0) {
            return helper.response(
              response,
              400,
              `Same name detected, please use other name`
            );
          } else {
            const checkDataUsers = await checkUser(user_email);
            if (checkDataUsers.length < 1) {
              const result = await registerUser(setData);
              return helper.response(response, 200, "Register Success", result);
            } else {
              return helper.response(response, 400, `Email already registered`);
            }
          }
        }
      }
    } catch (error) {
      // return helper.response(response, 400, "Bad Request", error);
      console.log(error);
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body;
      //  proses 1 check email user klo ada lanjut
      const checkDataUsers = await checkUser(user_email);
      if (checkDataUsers.length >= 1) {
        //   proses 2 check pass
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUsers[0].user_password
        );
        if (checkPassword === true) {
          //   proses 3 set JWT
          const {
            user_id,
            user_email,
            user_name,
            user_role,
            user_status,
          } = checkDataUsers[0];
          let payload = {
            user_id,
            user_email,
            user_name,
            user_role,
            user_status,
          };
          const token = jwt.sign(payload, "RAHASIA", { expiresIn: "1h" });
          payload = { ...payload, token };
          console.log(payload);
          return helper.response(response, 200, "Login success", payload);
        } else {
          return helper.response(response, 400, "Invalid password");
        }
      } else {
        return helper.response(response, 400, "Email not registered");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
