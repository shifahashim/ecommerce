const mysql = require('mysql2');
const { pool_options } = require('../../config/databaseConfig.js');

const pool = mysql.createPool(pool_options).promise();

const createCartTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS cart (
        cart_id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36),
        product_id VARCHAR(36),
        quantity INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
      );
      `
    );
    console.log('Cart table created successfully');
  } catch (err) {
    console.error('Error creating cart table:', err.message);
  }
};

module.exports = createCartTable;
