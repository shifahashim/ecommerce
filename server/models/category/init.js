const mysql = require('mysql2');
const {pool_options} = require('../../config/databaseConfig.js');

const pool = mysql.createPool(pool_options).promise();
const createCategoryTable = async()=>{
    try{
        await pool.query(
            `  CREATE TABLE IF NOT EXISTS category (
                category_id VARCHAR(36) PRIMARY KEY,
                category_name VARCHAR(255) NOT NULL UNIQUE,
                image VARCHAR(255)
            );
        `
        );
        console.log("category table created successfully");
    }
    catch(err){
        console.error("error creating category table:",err.message)
    }
}

module.exports=createCategoryTable;


//const sql='DROP TABLE product;'
//pool.query(sql);
