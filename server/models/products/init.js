const mysql = require('mysql2');
const { pool_options } = require('../../config/databaseConfig.js');

const pool = mysql.createPool(pool_options).promise();

const createProductTable = async () => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS product (
                product_id VARCHAR(36) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                stock_quantity INT NOT NULL,
                size ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL') NOT NULL,  
                color VARCHAR(100),
                material VARCHAR(255),
                brand_name VARCHAR(255),
                category_id VARCHAR(36),
                admin_id VARCHAR(36),
                FOREIGN KEY (category_id) REFERENCES category(category_id)
                FOREIGN KEY (admin_id) REFERENCES user(user_id) ON DELETE CASCADE;
            );`
        );
        console.log("Product table created successfully");
    } catch (err) {
        console.error("Error creating product table:", err); 
    }
}

module.exports = createProductTable;