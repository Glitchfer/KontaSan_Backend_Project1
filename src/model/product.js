const connection = require('../config/mysql')
const {
    postProduct
} = require('../controller/product')

module.exports = {
    getProduct: (limit, offset) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT product_id, product_name, product_price, product_status, category_name,
            category_id, product_created_at, product_updated_at FROM product INNER JOIN category USING (category_id)
            LIMIT ? OFFSET ?`, [limit, offset], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getProductCount: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT COUNT(*) as total FROM product", (error, result) => {
                !error ? resolve(result[0].total) : reject(new Error(error))
            })
        })
    },
    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product WHERE product_id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getProductByName: (name) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product WHERE product_name LIKE "%"?"%"`, name, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    sortProductByName: (value) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product ORDER BY product_name ASC`, value, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    sortProductByCategory: (value) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product WHERE category_id = ? ORDER BY product_name ASC", value, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    sortProductByPrice: (value) => {
        switch (value) {
            case "cheap":
                return new Promise((resolve, reject) => {
                    connection.query("SELECT * FROM product ORDER BY product_price ASC", (error, result) => {
                        !error ? resolve(result) : reject(new Error(error))
                    })
                })
                break;
            case "expensive":
                return new Promise((resolve, reject) => {
                    connection.query("SELECT * FROM product ORDER BY product_price DESC", (error, result) => {
                        !error ? resolve(result) : reject(new Error(error))
                    })
                })
                break;
        }
    },
    sortProductByRecent: (value) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product ORDER BY product_updated_at DESC`, value, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    sortProductByNumTable: (value) => {
        switch (value) {
            case "1":
                return new Promise((resolve, reject) => {
                    connection.query(`SELECT * FROM product ORDER BY product_id ASC`, value, (error, result) => {
                        !error ? resolve(result) : reject(new Error(error))
                    })
                })
                break;
            case "2":
                return new Promise((resolve, reject) => {
                    connection.query(`SELECT * FROM product ORDER BY product_name ASC`, value, (error, result) => {
                        !error ? resolve(result) : reject(new Error(error))
                    })
                })
                break;
            case "3":
                return new Promise((resolve, reject) => {
                    connection.query(`SELECT * FROM product ORDER BY product_price ASC`, value, (error, result) => {
                        !error ? resolve(result) : reject(new Error(error))
                    })
                })
                break;
            case "4":
                return new Promise((resolve, reject) => {
                    connection.query(`SELECT * FROM product ORDER BY product_status ASC`, value, (error, result) => {
                        !error ? resolve(result) : reject(new Error(error))
                    })
                })
                break;
            case "5":
                return new Promise((resolve, reject) => {
                    connection.query(`SELECT * FROM product ORDER BY product_created_at DESC`, value, (error, result) => {
                        !error ? resolve(result) : reject(new Error(error))
                    })
                })
                break;
            case "6":
                return new Promise((resolve, reject) => {
                    connection.query(`SELECT * FROM product ORDER BY product_updated_at DESC`, value, (error, result) => {
                        !error ? resolve(result) : reject(new Error(error))
                    })
                })
                break;
            case "7":
                return new Promise((resolve, reject) => {
                    connection.query(`SELECT * FROM product ORDER BY category_id ASC`, value, (error, result) => {
                        !error ? resolve(result) : reject(new Error(error))
                    })
                })
                break;
        }
    },
    postProduct: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO product SET ?", setData, (error, result) => {
                if (!error) {
                    const newResult = {
                        product_id: result.insertId,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    patchProduct: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE product SET ? WHERE product_id = ?", [setData, id], (error, result) => {
                if (!error) {
                    const newResult = {
                        product_id: id,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM product WHERE product_id = ?", id, (error, result) => {
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