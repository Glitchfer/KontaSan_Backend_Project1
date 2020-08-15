const {
    getAllHistory,
    getHistoryById,
    postHistory,
    patchHistory,
    deleteHistory

} = require('../model/history')

const helper = require('../helper')

module.exports = {
    getAllHistory: async (request, response) => {
        try {
            const result = await getAllHistory();
            return helper.response(response, 200, "Get Success", result)
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    getHistoryById: async (request, response) => {
        try {

            const {
                id
            } = request.params
            const result = await getHistoryById(id);
            if (result.length > 0) {
                return helper.response(response, 200, "Get History By Id Success", result)
            } else {
                return helper.response(response, 404, `History By Id: ${id} Not Found`)
            }

        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    postHistory: async (request, response) => {
        try {
            const {
                invoice_number,
                revenue
            } = request.body

            const setData = {
                date: new Date(), //note: date connect with date on invoice table
                invoice_number,
                revenue
            }
            const result = await postHistory(setData)
            return helper.response(response, 200, "Product Created", result)
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    patchHistory: async (request, response) => {
        try {
            const {
                id
            } = request.params
            const {
                invoice_number,
                revenue
            } = request.body
            const setData = {
                date: new Date(), //note: date connect with date on invoice table
                invoice_number,
                revenue
            }
            const checkId = await getHistoryById(id)
            if (checkId.length > 0) {
                const result = await patchHistory(setData, id)
                return helper.response(response, 201, "History Updated", result)
            } else {
                return helper.response(response, 404, `History By Id: ${id} Not Found`)
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)

        }
    },
    deleteHistory: async (request, response) => {
        try {
            const {
                id
            } = request.params
            const checkId = await getHistoryById(id)

            if (checkId.length > 0) {
                const result = await deleteHistory(id)
                return helper.response(response, 201, "History Deleted", result)
            } else {
                return helper.response(response, 404, `History By Id: ${id} Not Found`)
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", result)
        }
    }
}