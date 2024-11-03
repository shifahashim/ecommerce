const productValidator = (req,res,next)=>{
    const {name,description,price,size,color,material,category_id} = req.body;
    if(!name || !description || !price || !size || !color || !material || !category_id)
    {
        res.status(400).json({
            message:"Validation Error : Missing fields",
            required_fields:[
                "name",
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