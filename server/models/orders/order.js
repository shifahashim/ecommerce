const {query} = require('../../services/db.js')
const {v4:uuid} = require('uuid');

const add= async (user_id, orderDetails) => {
    const order_id = uuid();
    const {
        order_status = 'pending',
        total_amount,
        shipping_fee,
        product_id,
        quantity,
        admin_id
    } = orderDetails;

    const res = await query(
        `INSERT INTO orders (
            order_id, 
            user_id, 
            order_status, 
            total_amount, 
            shipping_fee, 
            product_id, 
            quantity, 
            admin_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            order_id,
            user_id,
            order_status,
            total_amount,
            shipping_fee,
            product_id,
            quantity,
            admin_id
        ]
    );

    return { order_id, ...res };
};

const get = async (admin_id) => {
    const res = await query(`
        SELECT 
            order_id, 
            user_id, 
            order_status, 
            total_amount, 
            shipping_fee, 
            product_id, 
            quantity
        FROM 
            orders
        WHERE 
            admin_id = ?
    `, [admin_id]);

    if (res.length < 1) {
        throw { status: 404, message: "No orders found for this admin" };
    }

    return res;
};




module.exports = {add,
get
};
