const {
  todayIncome,
  weeklyOrders,
  thisYearIncome,
  postIncome,
} = require("../model/income");

const helper = require("../helper");

module.exports = {
  todayIncome: async (request, response) => {
    try {
      const result = await todayIncome();
      return helper.response(response, 200, "Get Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  weeklyOrders: async (request, response) => {
    try {
      const { orders } = request.params;
      const result = await weeklyOrders();
      return helper.response(response, 200, "Get Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  thisYearIncome: async (request, response) => {
    try {
      const { income } = request.params;
      const result = await thisYearIncome();
      return helper.response(response, 200, "Get Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postIncome: async (request, response) => {
    try {
      const result = await postIncome();
      return helper.response(response, 200, "Get Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
