const {query} = require('../../services/db.js')
const {v4:uuid} = require('uuid');


const getAll = async () => {
    const res = await query(`
    SELECT p.product_id, p.name, p.price, p.brand_name, MIN(pi.image_url) AS image
    FROM product p
    LEFT JOIN product_image pi ON p.product_id = pi.product_id
    GROUP BY p.product_id, p.name, p.price, p.brand_name;
    `);

    if (res.length < 1) {
        throw { status: 404, message: "No products found" };
    }

    return res;
};

const getforAdmin = async (admin_id) => {
    const res = await query(`
    SELECT p.product_id, p.name, p.price, p.brand_name, MIN(pi.image_url) AS image
    FROM product p
    LEFT JOIN product_image pi ON p.product_id = pi.product_id WHERE p.admin_id=?
    GROUP BY p.product_id, p.name, p.price, p.brand_name ;
    `,[admin_id]);

    if (res.length < 1) {
        throw { status: 404, message: "No products found" };
    }

    return res;
};


const get = async (id) => {
    const res = await query(`
        SELECT p.*, GROUP_CONCAT(pi.image_url) AS images
        FROM product p
        LEFT JOIN product_image pi ON p.product_id = pi.product_id
        WHERE p.product_id = ?
        GROUP BY p.product_id
    `, [id]);

    if (res.length === 0) {
        throw { status: 404, message: "Product not found" };
    }

    // Split the images field by commas and convert it to an array
    res[0].images = res[0].images ? res[0].images.split(',') : [];

    return res;
};

const getByCategoryName = async (categoryId) => {
    const res = await query( `
    SELECT p.product_id, p.name, p.price, p.brand_name, MIN(pi.image_url) AS image
    FROM product p
    LEFT JOIN product_image pi ON p.product_id = pi.product_id
    WHERE p.category_id = ?
    GROUP BY p.product_id, p.name, p.price, p.brand_name;
    `, [categoryId]);

    console.log(res);
 
    if (res.length < 1) {
        throw { status: 404, message: "Product not found" };
    }
    return res;
};



const add=async(admin_id,productDetails)=>{
    const product_id = uuid();
    const{name,description,price,stock_quantity,size,color,
        material,brand_name,category_id}= productDetails;
    const res = await query(`INSERT INTO product (product_id,name, description, price, stock_quantity, size, color, material,brand_name,category_id,admin_id)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)`,[product_id,name,description,price,stock_quantity,size,color,
        material,brand_name,category_id,admin_id])
    return { product_id,...res};
}

const remove = async (id) => {
    const removed = await query(`DELETE FROM product WHERE product_id=?;`, [id]);
    if (removed.affectedRows === 0) {
        throw { status: 404, message: "Product not found" };
    }
};

const update = async (id, productDetails) => {
    const res = await query(
      `UPDATE product
       SET name = ?, description = ?, price = ?, stock_quantity = ?, size = ?, color = ?, material = ?, brand_name = ?, category_id = ?, admin_id = ?
       WHERE product_id = ?`,
      [
        productDetails.name,
        productDetails.description,
        productDetails.price,
        productDetails.stock_quantity,
        productDetails.size,
        productDetails.color,
        productDetails.material,
        productDetails.brand_name,
        productDetails.category_id,
        productDetails.admin_id,
        id,
      ]
    );
    return res;
  };
  

module.exports={
    getAll,
    get,
    getByCategoryName,
    add,
    remove,
    update,
    getforAdmin
}