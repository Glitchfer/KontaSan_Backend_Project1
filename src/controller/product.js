const {
    getAllProduct,
    getProductById,
    postProduct,
    patchProduct,
    deleteProduct
    // deleteProduct
} = require('../model/product')

const helper = require('../helper')

module.exports = {
    getAllProduct: async (request, response) => {
        try {
            const result = await getAllProduct();
            return helper.response(response, 200, "Get Success", result)
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    getProductById: async (request, response) => {
        try {
            // const id = request.params.id <-- dapat dipersingkat
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
            const result = await postProduct(setData)
            return helper.response(response, 200, "Product Created", result)
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
                product_name,
                product_price,
                product_status,
                category_id
            } = request.body

            const setData = {
                product_name,
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