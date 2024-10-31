const mysql = require('mysql2');
const { pool_options } = require('../../config/databaseConfig.js');

const pool = mysql.createPool(pool_options).promise();

const createShopsTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS shops (
        shop_id VARCHAR(36) PRIMARY KEY,
        shop_name VARCHAR(100) NOT NULL,
        shop_owner VARCHAR(100) NOT NULL,
        phone_number VARCHAR(15),
        email VARCHAR(100) NOT NULL UNIQUE,
        address_line_1 TEXT NOT NULL,
        address_line_2 TEXT,
        city VARCHAR(50) NOT NULL,
        state VARCHAR(50) NOT NULL,
        postal_code VARCHAR(20),
        country VARCHAR(50) NOT NULL
      );
      `
    );
    console.log('Shops table created successfully');
  } catch (err) {
    console.error('Error creating shops table:', err.message);
  }
};

module.exports = createShopsTable;
