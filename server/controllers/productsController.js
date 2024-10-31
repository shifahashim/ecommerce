const products = require('../models/products/products.js');
const productImages = require('../models/products/productImages.js')
const uploadOnCloudinary = require('../services/cloudinary.js')
const AddNewProduct = async (req, res) => {
    try {
        const product = await products.add(req.body);
        let uploadedImages=[];

        if (req.files && req.files.length > 0) {
            uploadedImages = await Promise.all(req.files.map(async (file) => {
                const cloudinaryUrl = await uploadOnCloudinary(file.path);
                return {
                    product_id: product.product_id,
                    image_url: cloudinaryUrl
                };
            }));

            await productImages.addImages(uploadedImages);
        }

        res.status(201).json({ success: true, message: "Product inserted successfully" });
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error adding product', error: err.message });
        }
    }
}


const getAllproducts=async(req,res)=>{
    try{
        const productList =await products.getAll();
        res.status(200).json({ success: true, productList: productList});
    }
    catch(err) {
        res.status(500).json({ success: false, message: 'Error fetching products', error: err.message });
    
    }
}

const getProduct=async(req,res)=>{
    try{
        const product =await products.get(req.params.id);
        res.status(200).json({ success: true, product: product});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Error fetching products', error: err.message });
    }
}

const getProductByName=async(req,res)=>{
    try{
        const product =await products.getByName(req.params.category_id);
        res.status(200).json({ success: true, product: product});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Error fetching products', error: err.message });
    }
}

const deleteProduct=async(req,res)=>{
    try{
      await products.remove(req.params.id)
      res.status(200).json({success:true})  
    }
    catch(err){
        if(err.status === 404){
            res.status(404).json({ error: err.message });
        }else{
            res.status(500).json({ error: "Error deleting product" });
        }
    }
}
module.exports ={
    AddNewProduct,
    getAllproducts,
    getProduct,
    getProductByName,
    deleteProduct
}