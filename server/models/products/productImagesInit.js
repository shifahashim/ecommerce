const mysql = require('mysql2');
const { pool_options } = require('../../config/databaseConfig.js');

const pool = mysql.createPool(pool_options).promise();

const createProductImageTable = async () => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS product_image (
                image_id VARCHAR(36) PRIMARY KEY,
                product_id VARCHAR(36),
                image_url VARCHAR(255) NOT NULL,
                FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
            );`
        );
        console.log("Product Image table created successfully");
    } catch (err) {
        console.error("Error creating product_image table:", err); 
    }
}

module.exports = createProductImageTable;
