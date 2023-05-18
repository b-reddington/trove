import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { Cloudinary } from "@cloudinary/url-gen";

function CloudinaryUpload({updatePhotos}) {


    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dyyvpwi2d',
            uploadPreset: 'wxs3ivaq',
            cropping: true, 
        }
    });
    const handleImageUpload = (photoUrl) => {
        updatePhotos(photoUrl);
        console.log(photoUrl);
    };
    
    return (
        <div className="cloudinaryUpload">
            
            <ImageUpload
                cloud_name={cld.cloudinaryConfig.cloud.cloudName}
                upload_preset={cld.cloudinaryConfig.cloud.uploadPreset}
                crop_preset={cld.cloudinaryConfig.cloud.cropping}
                onImageUpload={handleImageUpload}
            />
        </div>
    );
}

export default CloudinaryUpload;
