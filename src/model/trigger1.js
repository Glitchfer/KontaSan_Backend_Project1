const connection = require('../config/mysql')
const {
    postTrigger
} = require('../controller/trigger')

module.exports = {
    getTrigger1: (limit, offset) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM invoice INNER JOIN orders USING (invoice_id) LIMIT ? OFFSET ? `, [limit, offset], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getTrigger1ById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM invoice WHERE invoice_id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getInvoiceId: (invoice_id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM invoice WHERE invoice_id = ?", invoice_id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    postTrigger1: (setData1) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO invoice SET ?", setData1, (error, result) => {
                if (!error) {
                    const newResult = {
                        invoice_id: result.insertId,
                        ...setData1
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    patchTrigger1: (setData4, id) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE invoice SET ? WHERE invoice_id = ?", [setData4, id], (error, result) => {
                if (!error) {
                    const newResult = {
                        invoice_id: id,
                        ...setData4
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    deleteTrigger1: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM invoice WHERE invoice_id = ?", id, (error, result) => {
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