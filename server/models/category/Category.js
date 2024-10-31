const {query} = require('../../services/db.js')
const {v4:uuid} = require('uuid');

const getAll = async()=>{
    const res = await query(`SELECT * FROM category`);
    if(res.length < 1){
        throw { status: 404 , message:"category not found"};
    }
    return res;
}

const add = async(categoryDetails)=>{
    const { category_name, category_image } = categoryDetails;
    const res = await query(
        `INSERT INTO category (category_id, category_name, image) 
        VALUES (?, ?, ?)`,
        [uuid(),category_name, category_image])
    return res;
}

module.exports={
    getAll,
    add
}

