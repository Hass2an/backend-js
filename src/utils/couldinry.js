import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINRY_NAME, 
  api_key: process.env.CLOUDINRY_API_KEY, 
  api_secret: process.env.CLOUDINRY_API_KEY_SCREAT, 
});


const fileUpload = async (localPath) => {
    try {
        if(!localPath) return null;
        const response = await cloudinary.uploader.upload(localPath,{
            resource_type: 'auto'
        })

        console.log("file is uploaded successfully:",response.url);
        return response;
    } catch (error) {
        fs.unlink(localPath)
        return null;
    }
}

export {fileUpload}