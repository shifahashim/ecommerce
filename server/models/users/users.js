const mysql = require('mysql2');
const { pool_options } = require('../../config/databaseConfig.js');

const pool = mysql.createPool(pool_options).promise();

const createUserTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS user (
        user_id VARCHAR(36) PRIMARY KEY,
        fullname VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL, 
        phonenumber VARCHAR(15),
        address_line_1 TEXT,
        address_line_2 TEXT,
        city VARCHAR(50),
        state VARCHAR(50),
        postal_code VARCHAR(20),
        country VARCHAR(50),
        userrole ENUM('customer', 'admin') NOT NULL DEFAULT 'customer'
      );
      `
    );
    console.log('User table created successfully');
  } catch (err) {
    console.error('Error creating user table:', err.message);
  }
};

module.exports = createUserTable;
