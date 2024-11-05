const orders = require('../models/orders/order');

const AddNewOrder= async (req, res) => {
    try {
        
        const user = await orders.add(req.params.user_id,req.body); 
        res.status(201).json({ success: true, message: "order placed successfully", userId: user.user_id });
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error adding user', error: err.message });
        }
    }
};

const getAllOrders = async(req,res)=>{
    try{
        const product =await orders.get(req.params.admin_id);
        res.status(200).json({ success: true, product: product});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Error fetching products', error: err.message });
    }
}

module.exports={
    AddNewOrder,
    getAllOrders
}

