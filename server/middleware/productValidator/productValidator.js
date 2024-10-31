const productValidator = (req,res,next)=>{
    const {product_name,description,price,size,color,material,category_id} = req.body;
    if(!product_name || !description || !price || !size || !color || !material || !category_id)
    {
        res.status(400).json({
            message:"Validation Error : Missing fields",
            required_fields:[
                "product_name",
                "description",
                "price",
                "size",
                "color",
                "material",
                "category_id"
            ]
        });
    }
    next();
}

module.exports=productValidator;