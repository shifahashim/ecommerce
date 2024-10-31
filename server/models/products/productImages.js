const {query} = require('../../services/db.js')
const {v4:uuid} = require('uuid');

const addImages = async(imageRecords,product_id)=>{
        const values = imageRecords.map(async(record)=>{
        const res= await query(
                `INSERT INTO product_image (image_id, product_id, image_url) 
                VALUES (?,?,?)`, 
               [uuid(),record.product_id,record.image_url]
            )
            return res;
        })
}

module.exports={
    addImages
}