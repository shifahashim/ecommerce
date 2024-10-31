const category = require('../models/category/Category');


const createCategory = async (req, res) => {
    try{
        await category.add(req.body);
       // const addedCategory = await category.get(d_no)
        res.status(201).json({ success: true, message: "Category created successfully" });
    } catch (err) {
        res.status(500).json({ message: 'Error adding category', error: err.message });
    }
};

const getAllCategory = async (req, res) => {
        try{
            const categoryList = await category.getAll();
            res.status(200).json({ success: true, categoryList: categoryList });
        }
        catch(err){
            return res.status(500).json({ success: false, message: 'Error fetching categories', error: err.message });
        }
       
};

module.exports = {
    getAllCategory,
    createCategory,
};
