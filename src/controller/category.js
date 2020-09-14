const {
  getAllCategory,
  getCategoryById,
  getProduct,
  postCategory,
  patchCategory,
  deleteCategory,
} = require("../model/category");
const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper");

module.exports = {
  getAllCategory: async (request, response) => {
    try {
      const result = await getAllCategory();
      client.setex("categorygetall", 120, JSON.stringify(result));
      return helper.response(response, 200, "Get Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getCategoryById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await getCategoryById(id);
      client.setex(`categoryby:${id}`, 120, JSON.stringify(result));
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Get Category By Id Success",
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `Category By Id: ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProduct: async (request, response) => {
    try {
      const { product } = request.params;
      const result = await getProduct();
      client.setex(`categoryproduct`, 120, JSON.stringify(result));
      return helper.response(response, 200, "Get Product Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postCategory: async (request, response) => {
    try {
      const { category_name } = request.body;
      const setData = {
        category_name,
      };
      const result = await postCategory(setData);
      return helper.response(response, 200, "Category Created", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchCategory: async (request, response) => {
    try {
      const { id } = request.params;
      const { category_name } = request.body;
      const setData = {
        category_name,
      };
      const checkId = await getCategoryById(id);
      if (checkId.length > 0) {
        const result = await patchCategory(setData, id);
        return helper.response(response, 201, "Category Updated", result);
      } else {
        return helper.response(
          response,
          404,
          `Category By Id: ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteCategory: async (request, response) => {
    try {
      const { id } = request.params;
      const checkId = await getCategoryById(id);

      if (checkId.length > 0) {
        const result = await deleteCategory(id);
        return helper.response(response, 201, "Category Deleted", result);
      } else {
        return helper.response(
          response,
          404,
          `Category By Id: ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", result);
    }
  },
};
