const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');
const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath){
           throw new error("could not find the file url") 
        }
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
         })

        console.log("file is uploaded on cloudinary:",response.url)
        return response.url
    }
    catch(error)
    {
        console.log("message:",error)
        fs.unlinkSync(localFilePath) //remove the locally saved temporay file as the upload operatio got failed
        return null
    }
}

module.exports=uploadOnCloudinary;