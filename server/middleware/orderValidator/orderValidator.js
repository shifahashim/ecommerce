const orderValidator = (req, res, next) => {
    const { user_id, total_amount, product_id, quantity, admin_id } = req.body;
    
    // Check if all required fields are present
    if ( !total_amount || !product_id || !quantity || !admin_id) {
        return res.status(400).json({
            message: "Validation Error: Missing fields",
            required_fields: [
                "total_amount",
                "product_id",
                "quantity",
                "admin_id"
            ]
        });
    }
    
    // Proceed to the next middleware if validation passes
    next();
};

module.exports = orderValidator;
