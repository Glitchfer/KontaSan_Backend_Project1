const connection = require('../config/mysql')
const {
    postTrigger
} = require('../controller/trigger')

module.exports = {
    getAllTrigger2: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM orders`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getTrigger2ById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM orders WHERE orders_id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getOrderByInvoiceId: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM orders WHERE invoice_id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getProductPriceById: (product_id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product WHERE product_id = ?", product_id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    postTrigger2: (setData3) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO orders SET ?", setData3, (error, result) => {
                if (!error) {
                    const newResult = {
                        orders_id: result.insertId,

                        ...setData3
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    patchTrigger2: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE orders SET ? WHERE orders_id = ?", [setData, id], (error, result) => {
                if (!error) {
                    const newResult = {
                        orders_id: id,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    deleteTrigger2: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM orders WHERE orders_id = ?", id, (error, result) => {
                if (!error) {
                    const newResult = {
                        id: id
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })

        })
    }
}