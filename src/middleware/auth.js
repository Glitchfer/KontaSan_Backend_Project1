const jwt = require("jsonwebtoken");
const helper = require("../helper");

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization;
    if (token) {
      // validasi token jwt
      token = token.split(" ")[1];
      jwt.verify(token, "RAHASIA", (error, result) => {
        console.log(error);
        if (
          (error && error.name === "JsonWebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(response, 400, error.message);
        } else {
          console.log(result);
          request.token = result;
          next();
        }
      });
    } else {
      return helper.response(response, 400, "Invalid token, Login required");
    }
  },
  authorization2: (request, response, next) => {
    let token = request.headers.authorization;
    if (token) {
      // validasi token jwt
      token = token.split(" ")[1];
      jwt.verify(token, "RAHASIA", (error, result) => {
        console.log(error);
        if (
          (error && error.name === "JsonWebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(response, 400, error.message);
        } else {
          if (result.user_role === 1) {
            console.log("otorisasi admin");
            console.log(result);
            request.token = result;
            next();
          } else {
            return helper.response(
              response,
              400,
              "Only admin who able to access this feature"
            );
          }
        }
      });
    } else {
      return helper.response(response, 400, "Invalid token, Login required");
    }
  },
};
