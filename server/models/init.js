const  createCategoryTable = require('./category/init');
const createProductTable = require('./products/init');
const createProductImageTable = require('./products/productImagesInit')
const initDatabase = async()=>{
    await createCategoryTable();
    await createProductTable();
    await createProductImageTable();
};

const startInitialization = async()=>{
    console.log("attempting database initialization");
    try{
        await initDatabase();
        console.log("database initialization successsful");
        process.exit(0);
    }
    catch(error){
        console.error("Database initialization failed:", error.message);
        process.exit(1);
    }
}   

startInitialization();
