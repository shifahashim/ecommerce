const categoryValidator = (req,res,next)=>{
    const {category_name,category_image} = req.body;
    if(!category_name || !category_image)
    {
        res.status(400).json({
            message:"Validation Error : Missing fields",
            required_fields:["category_name","category_image"]
        });
    }
    next();
}

module.exports=categoryValidator;
