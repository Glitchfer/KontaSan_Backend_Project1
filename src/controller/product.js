const {
    // getAllProduct,
    getProduct,
    getProductCount,
    getProductById,
    getProductByName,
    sortProductByName,
    sortProductByCategory,
    sortProductByPrice,
    sortProductByRecent,
    sortProductByNumTable,
    postProduct,
    patchProduct,
    deleteProduct
    // deleteProduct
} = require('../model/product')
const qs = require("querystring")
const helper = require('../helper');
// const {
//     stringify
// } = require('qs');
const getPrevLink = (page, currentQuery) => {

    if (page > 1) {
        const generatePage = {
            page: page - 1
        }
        const resultPrevLink = {
            ...currentQuery,
            ...generatePage
        }
        return qs.stringify(resultPrevLink)
    } else {
        return null
    }
}
const getnextLink = (page, totalPage, currentQuery) => {

    if (page < totalPage) {
        const generatePage = {
            page: page + 1
        }
        const resultNextLink = {
            ...currentQuery,
            ...generatePage
        }
        return qs.stringify(resultNextLink)
    } else {
        return null
    }
}
module.exports = {
    getAllProduct: async (request, response) => {
        let {
            page,
            limit
        } = request.query
        page = parseInt(page)
        limit = parseInt(limit)
        const totalData = await getProductCount()
        const totalPage = Math.ceil(totalData / limit)
        let offset = page * limit - limit
        let prevLink = getPrevLink(page, request.query)
        let nextLink = getnextLink(page, totalPage, request.query)
        const pageInfo = {
            page,
            totalPage,
            limit,
            totalData,
            prevLink: prevLink && `http://127.0.0.1:3001/product?${prevLink}`,
            nextLink: nextLink && `http://127.0.0.1:3001/product?${nextLink}`
        }
        try {
            const result = await getProduct(limit, offset);
            return helper.response(response, 200, "Get Success", result, pageInfo)
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
            // console.log(result)
        }
    },
    getProductById: async (request, response) => {
        try {
            const {
                id
            } = request.params
            const result = await getProductById(id);
            if (result.length > 0) {
                return helper.response(response, 200, "Get Product By Id Success", result)
            } else {
                return helper.response(response, 404, `Product By Id: ${id} Not Found`)
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    getProductByName: async (request, response) => {
        try {
            const {
                name,
                url: url = request.params
            } = request.params
            const par = url.params;
            if (par == "name") {
                const getByName = await getProductByName(name);
                const result = getByName.map(function (value) {
                    return value
                })
                // console.log(getByName)
                if (result.length > 0) {
                    return helper.response(response, 200, `Get Product By Word: ${name}`, result)
                } else {
                    return helper.response(response, 404, `${name} Not Found`)
                }
            } else {
                return helper.response(response, 400, `Params does not exist, only available for params 'name'`)
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
            // console.log(error)
        }
    },
    sortProductBy: async (request, response) => {
        try {
            const {
                value,
            } = request.params
            const par = request.params.value
            if (par == "name") {
                const result = await sortProductByName();
                return helper.response(response, 200, "Sort Product By Name Success", result)
            } else if (par === "food") {
                const result = await sortProductByCategory(1);
                return helper.response(response, 200, "Sort Product By Category of Food Success", result)
            } else if (par === "drink") {
                const result = await sortProductByCategory(2);
                return helper.response(response, 200, "Sort Product By Category of Beverage Success", result)
            } else if (par === "cake") {
                const result = await sortProductByCategory(5);
                return helper.response(response, 200, "Sort Product By Category of Dessert Success", result)
            } else if (par === "cheap") {
                const result = await sortProductByPrice(value);
                return helper.response(response, 200, "Sort Product By Chepest Price Success", result)
            } else if (par === "expensive") {
                const result = await sortProductByPrice(value);
                return helper.response(response, 200, "Sort Product By Expensive Price Success", result)
            } else if (par === "recent") {
                const result = await sortProductByRecent();
                return helper.response(response, 200, "Sort Product By Recent Update Success", result)
            } else if (par <= 7) {
                const result = await sortProductByNumTable(value);
                return helper.response(response, 200, "Sort Product By The Number of Table Success", result)
            } else {
                return helper.response(response, 404, "Keyword not available")
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    postProduct: async (request, response) => {
        try {
            const {
                product_name,
                product_price,
                product_status,
                category_id
            } = request.body

            const setData = {
                product_name,
                product_price,
                product_created_at: new Date(),
                product_status,
                category_id
            }
            const checkName = await getProductByName(product_name)
            if (checkName.length < 1) {
                const result = await postProduct(setData)
                return helper.response(response, 200, "Product Created", result)
            } else {
                return helper.response(response, 404, `Same Product Detected, Please Try Again With Other Name`)
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    patchProduct: async (request, response) => {
        try {
            const {
                id
            } = request.params
            const {
                product_price,
                product_status,
                category_id
            } = request.body

            const setData = {
                product_price,
                product_updated_at: new Date(),
                product_status,
                category_id
            }
            const checkId = await getProductById(id)
            if (checkId.length > 0) {
                const result = await patchProduct(setData, id)
                return helper.response(response, 201, "Product Updated", result)
            } else {
                return helper.response(response, 404, `Product By Id: ${id} Not Found`)
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    deleteProduct: async (request, response) => {
        try {
            const {
                id
            } = request.params
            const checkId = await getProductById(id)

            if (checkId.length > 0) {
                const result = await deleteProduct(id)
                return helper.response(response, 201, "Product Deleted", result)
            } else {
                return helper.response(response, 404, `Product By Id: ${id} Not Found`)
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", result)
        }
    }
}