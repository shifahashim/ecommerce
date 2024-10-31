const mysql = require('mysql2');
 const{ pool_options } = require('../config/databaseConfig.js');

const pool = mysql.createPool(pool_options).promise();

const query = async (sql,params)=>{
    try {
        const [results] = await pool.query(sql, params);
    
        if (results.length > 0) {
          return results;
        } else {
          return [];
        }
      } catch (error) {
        console.error("db.js: Database query error:", error);
        throw new Error("Database query failed: " + error.message);
      }
}

module.exports ={query}