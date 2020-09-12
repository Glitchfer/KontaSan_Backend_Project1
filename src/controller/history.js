const {
  getAllHistory,
  getHistoryById,
  getRevenue,
  postHistory,
  // patchHistory,
  // deleteHistory,
} = require("../model/history");
const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper");

module.exports = {
  getAllHistory: async (request, response) => {
    try {
      const result = await getAllHistory();
      client.setex("historytodayincome", 120, JSON.stringify(result));
      return helper.response(response, 200, "Get Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getHistoryById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getHistoryById();
      client.setex("historytotalorders", 120, JSON.stringify(result));
      return helper.response(
        response,
        200,
        "Get History Total Orders Success",
        result
      );
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postHistory: async (request, response) => {
    try {
      const result = await postHistory();
      client.setex("historythisyearincome", 120, JSON.stringify(result));
      return helper.response(response, 200, "Get Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getRevenue: async (request, response) => {
    try {
      const { revenue } = request.params;
      let { select } = request.query;
      const type = { select };
      const result = await getRevenue(select);
      client.setex(`historyrevenuein:${select}`, 120, JSON.stringify(result));
      return helper.response(response, 200, "Get Revenue Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
