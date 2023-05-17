import { useState } from "react";
import ImageUpload from "./ImageUpload";
import CldGallery from "./CldGallery";
import { Cloudinary } from "@cloudinary/url-gen";

function CloudinaryUpload() {
    const [imagesUploadedList, setImagesUploadedList] = useState([]);

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dyyvpwi2d',
            uploadPreset: 'wxs3ivaq',
            cropping: true, // Enable cropping functionality
            // croppingAspectRatio: 1, // Set aspect ratio for cropping
            //  croppingShowDimensions: true, // Show dimensions of the cropped image
            //  croppingDefaultSelectionRatio: 0.8, // Set the default selection ratio for cropping
        }
    });

    
    return (
        <div className="cloudinaryUpload">
            
            <ImageUpload
                cloud_name={cld.cloudinaryConfig.cloud.cloudName}
                upload_preset={cld.cloudinaryConfig.cloud.uploadPreset}
                crop_preset={cld.cloudinaryConfig.cloud.cropping}
                //onImageUpload={(publicId) => onImageUploadHandler(publicId)}
            />
        </div>
    );
}

export default CloudinaryUpload;
