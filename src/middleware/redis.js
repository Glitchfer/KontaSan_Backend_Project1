const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper/index");

module.exports = {
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`productbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log(`data dengan product Id: ${id} tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          "Get Product By Id Success",
          JSON.parse(result)
        );
      } else {
        console.log(
          `data dengan product Id: ${id} belum tersedia di dalam redis`
        );
        next();
      }
    });
  },
  getAllProductRedis: (request, response, next) => {
    let { page, limit } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);
    client.get(`productwithpage:${page}:${limit}`, (error, result) => {
      if (!error && result != null) {
        console.log(
          `data product dengan page ${page} dan limit ${limit} tersedia di dalam redis`
        );
        return helper.response(
          response,
          200,
          "Get Success",
          JSON.parse(result)
        );
      } else {
        console.log(
          `data product dengan page ${page} dan limit ${limit} belum tersedia di dalam redis`
        );
        next();
      }
    });
  },
  sortProductByRedis: (request, response, next) => {
    let { sort_by } = request.query;
    const sortBy = {
      sort_by,
    };
    client.get(`productsortby:${sort_by}`, (error, result) => {
      if (!error && result != null) {
        console.log(`data sort by ${sort_by} tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          `Sort Product By ${sort_by} Success`,
          JSON.parse(result)
        );
      } else {
        console.log(`data sort by ${sort_by} belum tersedia di dalam redis`);
        next();
      }
    });
  },
  searchProductRedis: (request, response, next) => {
    let { name } = request.query;
    let { page, limit } = request.query;
    client.get(`productsearchby:${name}:${page}:${limit}`, (error, result) => {
      if (!error && result != null) {
        console.log(`data search by ${name} tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          `Get Product By Word: ${name}`,
          JSON.parse(result)
        );
      } else {
        console.log(`data search by ${name} belum tersedia di dalam redis`);
        next();
      }
    });
  },
  getAllCategoryRedis: (request, response, next) => {
    client.get("categorygetall", (error, result) => {
      if (!error && result != null) {
        console.log(`data category tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          "Get Success",
          JSON.parse(result)
        );
      } else {
        console.log(`data category belum tersedia di dalam redis`);
        next();
      }
    });
  },
  getCategoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`categoryby:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log(`data dengan category Id: ${id} tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          "Get Category By Id Success",
          JSON.parse(result)
        );
      } else {
        console.log(
          `data dengan category Id: ${id} belum tersedia di dalam redis`
        );
        next();
      }
    });
  },
  getCategoryProductRedis: (request, response, next) => {
    client.get(`categoryproduct`, (error, result) => {
      if (!error && result != null) {
        console.log(`data ctg product tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          "Get Product Success",
          JSON.parse(result)
        );
      } else {
        console.log(`data ctg product belum tersedia di dalam redis`);
        next();
      }
    });
  },
  getInvoiceRedis: (request, response, next) => {
    const { url: url = request.params } = request.params;
    const par = url.params;
    let { calendar } = request.query;
    client.get(`trigger${par}calendar:${calendar}`, (error, result) => {
      if (!error && result != null) {
        console.log(
          `data invoice dengan calendar ${calendar} tersedia di dalam redis`
        );
        return helper.response(
          response,
          200,
          "Get Invoice Success",
          JSON.parse(result)
        );
      } else {
        console.log(
          `data invoice dengan calendar ${calendar} belum tersedia di dalam redis`
        );
        next();
      }
    });
  },
  getOrderRedis: (request, response, next) => {
    const { url: url = request.params } = request.params;
    const par = url.params;
    let { page, limit } = request.query;
    client.get(`trigger${par}:${page}:${limit}`, (error, result) => {
      if (!error && result != null) {
        console.log(
          `data order dengan page ${page} dan limit ${limit} tersedia di dalam redis`
        );
        return helper.response(
          response,
          200,
          "Get Success",
          JSON.parse(result)
        );
      } else {
        console.log(
          `data order dengan page ${page} dan limit ${limit} belum tersedia di dalam redis`
        );
        next();
      }
    });
  },
  getInvoiceByIdRedis: (request, response, next) => {
    const { url: url = request.params, id } = request.params;
    const par = url.params;
    client.get(`trigger${par}id:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log(`data invoice dengan id ${id} tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          "Get Invoice By Id Success",
          JSON.parse(result)
        );
      } else {
        console.log(
          `data invoice dengan id ${id} belum tersedia di dalam redis`
        );
        next();
      }
    });
  },
  getOrderByInvoiceIdRedis: (request, response, next) => {
    const { url: url = request.params, id } = request.params;
    const par = url.params;
    client.get(`trigger${par}invoiceid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log(
          `data order dengan invoice id ${id} tersedia di dalam redis`
        );
        return helper.response(
          response,
          200,
          "Get Orders By Invoice Id Success",
          JSON.parse(result)
        );
      } else {
        console.log(
          `data order dengan invoice id ${id} belum tersedia di dalam redis`
        );
        next();
      }
    });
  },
  getTodayIncomeRedis: (request, response, next) => {
    client.get(`historytodayincome`, (error, result) => {
      if (!error && result != null) {
        console.log(`data today income tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          "Get Success",
          JSON.parse(result)
        );
      } else {
        console.log(`data today income belum tersedia di dalam redis`);
        next();
      }
    });
  },
  getTotalOrdersRedis: (request, response, next) => {
    client.get(`historytotalorders`, (error, result) => {
      if (!error && result != null) {
        console.log(`data total orders tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          "Get History Total Orders Success",
          JSON.parse(result)
        );
      } else {
        console.log(`data total order belum tersedia di dalam redis`);
        next();
      }
    });
  },
  getThisYearIncomeRedis: (request, response, next) => {
    client.get(`historythisyearincome`, (error, result) => {
      if (!error && result != null) {
        console.log(`data this year income tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          "Get history this year income Success",
          JSON.parse(result)
        );
      } else {
        console.log(`data this year income belum tersedia di dalam redis`);
        next();
      }
    });
  },
  getRevenueRedis: (request, response, next) => {
    let { select } = request.query;
    client.get(`historyrevenuein:${select}`, (error, result) => {
      if (!error && result != null) {
        console.log(`data revenue in: ${select} tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          "Get Revenue Success",
          JSON.parse(result)
        );
      } else {
        console.log(`data revenue in: ${select} belum tersedia di dalam redis`);
        next();
      }
    });
  },
  getYesterdayIncomeRedis: (request, response, next) => {
    client.get(`incometoday`, (error, result) => {
      if (!error && result != null) {
        console.log(`data income today tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          "Get Success",
          JSON.parse(result)
        );
      } else {
        console.log(`data income today belum tersedia di dalam redis`);
        next();
      }
    });
  },
  getLastWeekOrdersRedis: (request, response, next) => {
    const { orders } = request.params;
    client.get(`incomeweeklyorders`, (error, result) => {
      if (!error && result != null) {
        console.log(`data weekly orders tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          "Get Success",
          JSON.parse(result)
        );
      } else {
        console.log(`data weekly orders belum tersedia di dalam redis`);
        next();
      }
    });
  },
  getLastYearIncomeRedis: (request, response, next) => {
    const { income } = request.params;
    client.get(`incomeyearly`, (error, result) => {
      if (!error && result != null) {
        console.log(`data yearly income tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          "Get Success",
          JSON.parse(result)
        );
      } else {
        console.log(`data yearly income belum tersedia di dalam redis`);
        next();
      }
    });
  },
  getIncomeProductRedis: (request, response, next) => {
    client.get(`incomeallproduct`, (error, result) => {
      if (!error && result != null) {
        console.log(`data all product tersedia di dalam redis`);
        return helper.response(
          response,
          200,
          "Get Success",
          JSON.parse(result)
        );
      } else {
        console.log(`data all product belum tersedia di dalam redis`);
        next();
      }
    });
  },
  clearDataProductRedis: (request, response, next) => {
    client.keys("product*", (error, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
          console.log(`semua data dengan key product terhapus dari redis`);
        });
      }
      next();
    });
    // client.flushall((error, result) => {
    //   console.log("Data didalam redis terhapus");
    //   console.log(result);
    // });
    // next();
  },
  clearDataCategoryRedis: (request, response, next) => {
    client.keys("category*", (error, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
          console.log(`semua data dengan key category terhapus dari redis`);
        });
      }
      next();
    });
  },
  clearDataTriggerRedis: (request, response, next) => {
    client.keys("trigger*", (error, keys) => {
      if (keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
          console.log(`semua data dengan key trigger terhapus dari redis`);
        });
      }
      next();
    });
  },
};
