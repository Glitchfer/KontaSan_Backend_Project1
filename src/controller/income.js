const {
  todayIncome,
  weeklyOrders,
  thisYearIncome,
  postIncome,
} = require("../model/income");
const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper");

module.exports = {
  todayIncome: async (request, response) => {
    try {
      const result = await todayIncome();
      client.setex("incometoday", 120, JSON.stringify(result));
      return helper.response(response, 200, "Get Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  weeklyOrders: async (request, response) => {
    try {
      const { orders } = request.params;
      const result = await weeklyOrders();
      client.setex("incomeweeklyorders", 120, JSON.stringify(result));
      return helper.response(response, 200, "Get Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  thisYearIncome: async (request, response) => {
    try {
      const { income } = request.params;
      const result = await thisYearIncome();
      client.setex("incomeyearly", 120, JSON.stringify(result));
      return helper.response(response, 200, "Get Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postIncome: async (request, response) => {
    try {
      const result = await postIncome();
      client.setex("incomeallproduct", 120, JSON.stringify(result));
      return helper.response(response, 200, "Get Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
