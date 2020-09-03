const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper/index");

module.exports = {
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log(`data dengan Id: ${id} tersedia di dalam redis`);
        return helper.response(response, 200, JSON.parse(result));
      } else {
        console.log(`data dengan Id: ${id} tidak tersedia di dalam redis`);
        next();
      }
    });
  },
  getAllProductRedis: (request, response, next) => {
    let { page, limit } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);
    client.get(`getallproduct`, (error, result) => {
      if (!error && result != null) {
        console.log("data tersedia di dalam redis");
        return helper.response(response, 200, JSON.parse(result));
        console.log(result);
      } else {
        console.log("data tidak tersedia di dalam redis");
        next();
      }
    });
  },
  sortProductByRedis: (request, response, next) => {
    let { sort_by } = request.query;
    const sortBy = {
      sort_by,
    };
    client.get(`sortby:${sort_by}`, (error, result) => {
      if (!error && result != null) {
        console.log(`data sort by ${sort_by} tersedia di dalam redis`);
        return helper.response(response, 200, JSON.parse(result));
      } else {
        console.log(`data sort by ${sort_by} tidak tersedia di dalam redis`);
        next();
      }
    });
  },
  searchProductRedis: (request, response, next) => {
    let { name } = request.query;
    let { page, limit } = request.query;
    client.get(`searchby:${name}`, (error, result) => {
      if (!error && result != null) {
        console.log(`data search by ${name} tersedia di dalam redis`);
        return helper.response(response, 200, JSON.parse(result));
      } else {
        console.log(`data search by ${name} tidak tersedia di dalam redis`);
        next();
      }
    });
  },
  clearDataProductRedis: (request, response, next) => {
    client.flushall((error, result) => {
      console.log("Data didalam redis terhapus");
      console.log(result);
    });
    next();
  },
};
