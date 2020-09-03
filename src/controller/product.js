const {
  // getAllProduct,
  join,
  getProduct,
  getProductCount,
  getProductCountByName,
  getProductByName2,
  getProductById,
  getProductByName,
  sortProductByName,
  sortProductByCategory,
  sortProductByPrice,
  sortProductByRecent,
  sortProductByNumTable,
  postProduct,
  patchProduct,
  deleteProduct,
  // deleteProduct
} = require("../model/product");
const qs = require("querystring");
const helper = require("../helper");
const redis = require("redis");
const client = redis.createClient();
const { isNumber } = require("util");

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatePage = {
      page: page - 1,
    };
    const resultPrevLink = {
      ...currentQuery,
      ...generatePage,
    };
    return qs.stringify(resultPrevLink);
  } else {
    return null;
  }
};
const getnextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatePage = {
      page: page + 1,
    };
    const resultNextLink = {
      ...currentQuery,
      ...generatePage,
    };
    return qs.stringify(resultNextLink);
  } else {
    return null;
  }
};
module.exports = {
  getAllProduct: async (request, response) => {
    let { page, limit } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const totalData = await getProductCount();
    const totalPage = Math.ceil(totalData / limit);
    let offset = page * limit - limit;
    let prevLink = getPrevLink(page, request.query);
    let nextLink = getnextLink(page, totalPage, request.query);
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/product?${nextLink}`,
    };
    try {
      if (page < 1 || page > totalPage) {
        return helper.response(response, 404, "Page does not exist");
      } else {
        const result = await getProduct(limit, offset);
        // console.log(JSON.stringify(request.query));
        // console.log(request.query);
        // client.set(`getproduct:${JSON.stringify(request.query)}`, JSON.stringify(result));
        return helper.response(response, 200, "Get Success", result, pageInfo);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getProductBy: async (request, response) => {
    try {
      const { id } = request.params;
      if (request.params.id > 0) {
        const result = await getProductById(id);
        client.setex(`getproductbyid:${id}`, 120, JSON.stringify(result));
        if (result.length > 0) {
          return helper.response(
            response,
            200,
            "Get Product By Id Success",
            result
          );
        } else {
          return helper.response(
            response,
            404,
            `Product By Id: ${id} Not Found`
          );
        }
      } else if (request.params.id === "search") {
        let { name } = request.query;
        let { page, limit } = request.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const totalData = await getProductCountByName(name);
        const totalPage = Math.ceil(totalData / limit);
        let offset = page * limit - limit;
        let prevLink = getPrevLink(page, request.query);
        let nextLink = getnextLink(page, totalPage, request.query);
        const srcByName = {
          name,
        };
        const pageInfo = {
          page,
          totalPage,
          limit,
          totalData,
          prevLink:
            prevLink && `http://127.0.0.1:3001/product/search?${prevLink}`,
          nextLink:
            nextLink && `http://127.0.0.1:3001/product/search?${nextLink}`,
        };
        const getByName = await getProductByName(name, limit, offset);
        const result = getByName.map(function (value) {
          return value;
        });
        if (page < 1 || page > totalPage) {
          return helper.response(response, 404, "Page does not exist");
        } else {
          if (result.length > 0) {
            return helper.response(
              response,
              200,
              `Get Product By Word: ${name}`,
              result,
              pageInfo
            );
          } else {
            return helper.response(response, 404, `${name} Not Found`);
          }
        }
      } else if (request.params.id === "sort") {
        let { sort_by } = request.query;
        const sortBy = {
          sort_by,
        };
        if (sort_by === "name") {
          const result = await sortProductByName();
          return helper.response(
            response,
            200,
            "Sort Product By Name Success",
            result
          );
        } else if (sort_by === "food") {
          const result = await sortProductByCategory(1);
          return helper.response(
            response,
            200,
            "Sort Product By Category of Food Success",
            result
          );
        } else if (sort_by === "drink") {
          const result = await sortProductByCategory(2);
          return helper.response(
            response,
            200,
            "Sort Product By Category of Beverage Success",
            result
          );
        } else if (sort_by === "cake") {
          const result = await sortProductByCategory(5);
          return helper.response(
            response,
            200,
            "Sort Product By Category of Dessert Success",
            result
          );
        } else if (sort_by === "cheap") {
          const result = await sortProductByPrice(sort_by);
          return helper.response(
            response,
            200,
            "Sort Product By Chepest Price Success",
            result
          );
        } else if (sort_by === "expensive") {
          const result = await sortProductByPrice(sort_by);
          return helper.response(
            response,
            200,
            "Sort Product By Expensive Price Success",
            result
          );
        } else if (sort_by === "recent") {
          const result = await sortProductByRecent();
          return helper.response(
            response,
            200,
            "Sort Product By Recent Update Success",
            result
          );
        } else if (sort_by <= 7) {
          const result = await sortProductByNumTable(sort_by);
          return helper.response(
            response,
            200,
            "Sort Product By The Number of Table Success",
            result
          );
        } else {
          return helper.response(response, 404, "Keyword not available");
        }
      } else {
        return helper.response(
          response,
          400,
          `Params does not exist, only available for params 'search' & 'id number'`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postProduct: async (request, response) => {
    try {
      let {
        product_name,
        product_price,
        product_status,
        category_id,
        img,
      } = request.body;
      product_price = Number(product_price);
      product_status = parseInt(product_status);
      category_id = parseInt(category_id);
      const setData = {
        product_name,
        product_price,
        product_created_at: new Date(),
        product_status,
        category_id,
        img: request.file === undefined ? "#" : request.file.filename,
      };
      if (
        product_name === "" ||
        product_name >= 0 ||
        product_price < 1 ||
        Number.isNaN(product_price) ||
        Number.isNaN(product_status) ||
        product_status > 1 ||
        Number.isNaN(category_id)
      ) {
        return helper.response(
          response,
          400,
          "Invalid Input, All Of The Data Must Be Filled"
        );
      } else {
        const checkName = await getProductByName2(product_name);
        if (checkName.length < 1) {
          const result = await postProduct(setData);
          return helper.response(response, 200, "Product Created", result);
        } else {
          return helper.response(
            response,
            404,
            `Same Product Detected, Please Try Again With Other Name`
          );
        }
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const {
        product_name,
        product_price,
        product_status,
        category_id,
        img,
      } = request.body;

      const setData = {
        product_name,
        product_price,
        product_updated_at: new Date(),
        product_status,
        category_id,
        img: request.file === undefined ? "#" : request.file.filename,
      };
      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        const result = await patchProduct(setData, id);
        return helper.response(response, 201, "Product Updated", result);
      } else {
        return helper.response(response, 404, `Product By Id: ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const checkId = await getProductById(id);

      if (checkId.length > 0) {
        const result = await deleteProduct(id);
        return helper.response(response, 201, "Product Deleted", result);
      } else {
        return helper.response(response, 404, `Product By Id: ${id} Not Found`);
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", result);
    }
  },
};
