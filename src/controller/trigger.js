const {
  getTrigger1,
  getTrigger1ById,
  getInvoiceId,
  postTrigger1,
  patchTrigger1,
  deleteTrigger1,
} = require("../model/trigger1");
const {
  getTrigger2,
  getTriggerCount,
  getTrigger2ById,
  getOrderByInvoiceId,
  getProductPriceById,
  postTrigger2,
  patchTrigger2,
  deleteTrigger2,
} = require("../model/trigger2");
const qs = require("querystring");
const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper");

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatedPage = {
      page: page - 1,
    };
    const resultPrevLink = {
      ...currentQuery,
      ...generatedPage,
    };
    return qs.stringify(resultPrevLink);
  } else {
    return null;
  }
};
const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatedPage = {
      page: page + 1,
    };
    const resultNextLink = {
      ...currentQuery,
      ...generatedPage,
    };
    return qs.stringify(resultNextLink);
  } else {
    return null;
  }
};
module.exports = {
  getAllTrigger: async (request, response) => {
    const { url: url = request.params } = request.params;
    const par = url.params;
    let { calendar, page, limit } = request.query;
    const times = { calendar };
    page = parseInt(page);
    limit = parseInt(limit);
    const totalData = await getTriggerCount(par);
    const totalPage = Math.ceil(totalData / limit);
    const offset = page * limit - limit;
    const prevLink = getPrevLink(page, request.query);
    const nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/trigger/${par}?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/trigger/${par}?${nextLink}`,
    };
    try {
      if (page < 1 || page > totalPage) {
        return helper.response(response, 404, "Page does not exist");
      } else {
        if (par == "invoice") {
          const result = await getTrigger1(calendar);
          client.setex(
            `trigger${par}calendar:${calendar}`,
            120,
            JSON.stringify(result)
          );
          return helper.response(response, 200, "Get Success", result);
        } else if (par == "orders") {
          const result = await getTrigger2(limit, offset);
          client.setex(
            `trigger${par}:${page}:${limit}`,
            120,
            JSON.stringify(result)
          );
          return helper.response(
            response,
            200,
            "Get Success",
            result,
            pageInfo
          );
        } else {
          return helper.response(response, 404, "Params does not exist");
        }
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  getTriggerById: async (request, response) => {
    try {
      const { url: url = request.params, id } = request.params;
      const par = url.params;
      if (par == "invoice") {
        const result = await getTrigger1ById(id);
        client.setex(`trigger${par}id:${id}`, 120, JSON.stringify(result));
        if (result.length > 0) {
          return helper.response(
            response,
            200,
            "Get Invoice By Id Success",
            result
          );
        } else {
          return helper.response(
            response,
            404,
            `Invoice By Id: ${id} Not Found`
          );
        }
      } else if (par == "orders") {
        const result = await getOrderByInvoiceId(id);
        client.setex(
          `trigger${par}invoiceid:${id}`,
          120,
          JSON.stringify(result)
        );
        if (result.length > 0) {
          return helper.response(
            response,
            200,
            "Get Orders By Invoice Id Success",
            result
          );
        } else {
          return helper.response(
            response,
            404,
            `Orders By Id: ${id} Not Found`
          );
        }
      } else {
        return helper.response(response, 400, "Params does not exist");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postTrigger: async (request, response) => {
    try {
      const { url: url = request.params } = request.params;
      const par = url.params;
      // const invoNum = result.invoice_number; //<-- get id
      if (par == "invoice") {
        const setData1 = {
          invoice_number: (invoice_number = Math.round(
            Math.random() * 99999 + 10000
          )),
          created_at: new Date(),
        };
        const result = await postTrigger1(setData1);
        return helper.response(response, 200, "Invoice Created", result);
      } else if (par == "orders") {
        let {
          cashier_name,
          product_id,
          item_quantity,
          invoice_id,
        } = request.body;
        item_quantity = parseInt(item_quantity);
        const setData2 = {
          cashier_name,
          product_id,
          item_quantity,
        };
        const getProductPrice = await getProductPriceById(product_id);
        const productPrice = getProductPrice[0].product_price;
        const setData3 = {
          //setData3 masih error, belum tau nempatin yg benernya
          total_price: productPrice * item_quantity,
          payment: "CASH",
          invoice_id,
          date: new Date(),
        };
        const setData4 = {
          ...setData2,
          ...setData3,
        };
        const checkInvoiceId = await getInvoiceId(invoice_id);
        if (
          cashier_name === "" ||
          cashier_name >= 0 ||
          Number.isNaN(item_quantity) ||
          item_quantity < 1
        ) {
          console.log("Invalid Input, All Of The Data Must Be Filled");
          return helper.response(
            response,
            400,
            `Invalid Input, All Of The Data Must Be Filled`
          );
        } else {
          if (checkInvoiceId.length > 0) {
            const result = await postTrigger2(setData4); //*
            return helper.response(response, 200, "Orders Created", result);
          } else {
            return helper.response(
              response,
              404,
              `Orders By Invoice Id: ${invoice_id} Not Found`
            );
          }
        }
      } else {
        return helper.response(response, 400, "Params does not exist");
      }
    } catch (error) {
      return helper.response(
        response,
        400,
        `Bad Request/ Product Doesn't Exsist`,
        error
      );
    }
  },
  patchTrigger: async (request, response) => {
    try {
      const { id, url: url = request.params } = request.params;
      const par = url.params;
      if (par == "invoice") {
        // cek banyaknya item yang berbeda di tabel order yang menggunakan invoice_id yang sama,
        // untuk memanggil datanya ditabel invoice
        const getOrder = await getOrderByInvoiceId(id);
        const findTotalPayment = getOrder.map(function (value) {
          return value.total_price;
        });
        let totalPrice = 0;
        for (let i = 0; i <= findTotalPayment.length - 1; i++) {
          totalPrice += findTotalPayment[i];
        }
        const tax = {
          subData1: totalPrice * 0.1,
        };

        // ======== sampel untuk input json ==============
        // let {
        //   orders
        // } = request.body;
        // const setData = {
        //   setData1,
        //   orders: orders = [{
        //     product_id,
        //     qty
        //   }],
        //   total_price: totalPrice,
        //   tax: tax.subData1,
        //   sub_total: totalPrice + tax.subData1,
        //   updated_at: new Date(),
        // };
        // =================================================

        const setData = {
          total_price: totalPrice,
          tax: tax.subData1,
          sub_total: totalPrice + tax.subData1,
          updated_at: new Date(),
        };
        const checkId = await getTrigger1ById(id);
        if (checkId.length > 0) {
          if (getOrder.length > 0) {
            const result = await patchTrigger1(setData, id);
            return helper.response(response, 201, "Invoice Updated", result);
          } else {
            return helper.response(
              response,
              404,
              `Invalid Update, Order by invoice_id: ${id} not found`
            );
          }
        } else {
          return helper.response(
            response,
            404,
            `Invoice or Orders By invoice Id: ${id} Not Found`
          );
        }
      } else if (par == "orders") {
        const {
          // cashier_name,
          product_id,
          item_quantity,
          // total_price,
          invoice_id,
        } = request.body;
        const getProductPrice = await getProductPriceById(product_id);
        const productPrice = getProductPrice[0].product_price;
        const setData2 = {
          // cashier_name,
          product_id,
          item_quantity,
          total_price: productPrice * item_quantity,
          // payment: "CASH",
          invoice_id,
          date: new Date(),
        };
        const checkInvoiceId = await getInvoiceId(invoice_id);
        if (checkInvoiceId.length > 0) {
          const result = await patchTrigger2(setData2, id);
          return helper.response(response, 200, "Orders Updated", result);
        } else {
          return helper.response(
            response,
            404,
            `Invoice By Id: ${invoice_id} Not Found`
          );
        }
      } else {
        return helper.response(response, 400, "Params does not exist");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteTrigger: async (request, response) => {
    try {
      const { id, url: url = request.params } = request.params;
      const par = url.params;
      if (par == "invoice") {
        const checkId = await getTrigger1ById(id);
        if (checkId.length > 0) {
          const result = await deleteTrigger1(id);
          return helper.response(response, 201, "Orders Deleted", result);
        } else {
          return helper.response(
            response,
            404,
            `Orders By Id: ${id} Not Found`
          );
        }
      } else if (par == "orders") {
        const checkId = await getTrigger2ById(id);
        if (checkId.length > 0) {
          const result = await deleteTrigger2(id);
          return helper.response(response, 201, "Orders Deleted", result);
        } else {
          return helper.response(
            response,
            404,
            `Orders By Id: ${id} Not Found`
          );
        }
      } else {
        return helper.response(response, 400, "Params does not exist");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
