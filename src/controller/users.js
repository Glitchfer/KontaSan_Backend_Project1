const {
  // getUsers,
  registerUser,
  checkUser,
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
    const { user_email, user_password, user_name } = request.body;
    const salt = bcrypt.genSaltSync(10);
    const encryptPassword = bcrypt.hashSync(user_password, salt);
    //   console.log("user password = " + user_password);
    //   console.log("user password bcrypt= " + encryptPassword);
    const setData = {
      user_email,
      user_password: encryptPassword,
      user_name,
      user_role: 2,
      user_status: 0,
      user_created_at: new Date(),
    };
    try {
      const result = await registerUser(setData);
      return helper.response(response, 200, "Register Success", result);
      console.log(result);
      //   const checkName = await getUsers(user_name);
      //   if (checkName.length < 1) {
      //     const result = await registerUser(setData);
      //     return helper.response(response, 200, "Register Success", result);
      //   } else {
      //     return helper.response(response, 404, `User already registered`);
      //   }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
      console.log(error);
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body;
      const checkDataUsers = await checkUser(user_email);
      console.log(checkDataUsers);
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
