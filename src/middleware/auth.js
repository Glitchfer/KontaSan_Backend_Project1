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
          console.log("Yang ini A");
          console.log(error.expiredAt);
          return helper.response(response, 400, error.message);
        } else {
          if (result.user_status !== 0) {
            console.log(result);
            request.token = result;
            next();
          } else {
            console.log(result);
            return helper.response(
              response,
              400,
              "Invalid action, status inactive"
            );
          }
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
          console.log("Yang ini B");
          console.log(error.expiredAt);
          return helper.response(response, 400, error.message);
        } else {
          if (result.user_status !== 0) {
            if (result.user_role === 1) {
              request.token = result;
              next();
            } else {
              return helper.response(
                response,
                400,
                "Only admin who able to access this feature"
              );
            }
          } else {
            console.log(result);
            return helper.response(
              response,
              400,
              "Invalid action, status inactive"
            );
          }
        }
      });
    } else {
      return helper.response(response, 400, "Invalid token, Login required");
    }
  },
};
