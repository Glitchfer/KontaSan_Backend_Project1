const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper/index");

module.exports = {
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data tersedia di dalam redis");
        return helper.response(response, 200, JSON.parse(result));
      } else {
        console.log("data tidak tersedia di dalam redis");
        next();
      }
    });
  },
  //   getProductRedis: (
  //     request,
  //     response,
  //     next
  //   ) => {} /*<-- tambahkan untuk get yg lain*/,
  clearDataProductRedis: (request, response, next) => {
    client.flushall((error, result) => {
      console.log(result);
    });
    next();
  },
};
