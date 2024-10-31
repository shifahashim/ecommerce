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

const getProductByCategoryName=async(req,res)=>{
    try{
        const category=await query(`SELECT category_id FROM category WHERE category_name=?;`,[req.params.category_name])
        if (category.length === 0) {
            throw { status: 404, message: 'Category not found' };
        }
   
        const categoryId=category[0].category_id;
        console.log(category);
        const product =await products.getByCategoryName(categoryId);
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

const updateProduct = async (req, res) => {
    const {
      name,
      description,
      price,
      stock_quantity,
      size,
      color,
      material,
      brand_name,
      category_id,
    } = req.body;
    console.log(brand_name);
    console.log(size);
  
    try {
      const existingProduct = await products.get(req.params.id);
      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      const updatedProductData = {
        name: name ?? existingProduct[0].name,
        description: description ?? existingProduct[0].description,
        price: price ?? existingProduct[0].price,
        stock_quantity: stock_quantity ?? existingProduct[0].stock_quantity,
        size: size ?? existingProduct[0].size,
        color: color ?? existingProduct[0].color,
        material: material ?? existingProduct[0].material,
        brand_name: brand_name ?? existingProduct[0].brand_name,
        category_id: category_id ?? existingProduct[0].category_id,
      };

      console.log("Updating product data:", updatedProductData);

      await products.update(req.params.id, updatedProductData);
  
      const updatedProduct = await products.get(req.params.id);
      res.json({ updatedProduct });
    } catch (error) {
      if (error.status === 404) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error updating product" });
      }
    }
  };
  
module.exports ={
    AddNewProduct,
    getAllproducts,
    getProduct,
    getProductByCategoryName,
    deleteProduct,
    updateProduct
}