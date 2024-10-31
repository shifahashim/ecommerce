const mysql = require('mysql2');
const { pool_options } = require('../../config/databaseConfig.js');

const pool = mysql.createPool(pool_options).promise();

const createOrderTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS order (
        order_id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36),
        order_status ENUM('pending', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
        total_amount DECIMAL(10, 2) NOT NULL,
        shipping_fee DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
      );`
    );
    console.log('Order table created successfully');
  } catch (err) {
    console.error('Error creating order table:', err.message);
  }
};

module.exports = createOrderTable;
