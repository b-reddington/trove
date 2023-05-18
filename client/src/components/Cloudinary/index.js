import { useState } from "react";
import ImageUpload from "./ImageUpload";
import CldGallery from "./CldGallery";
import { Cloudinary } from "@cloudinary/url-gen";

function CloudinaryUpload({updatePhotos}) {
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

    const deleteAllImages = async () => {
        try {
            //You can call an API in your backend if you want to delete images.
            //This is the API you should call:
            //https://cloudinary.com/documentation/image_upload_api_reference#destroy
            // const responseData = await fetch(
            //   "http://localhost:5000/api/photos/delete"
            // );
            setImagesUploadedList([]);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className="cloudinaryUpload">
            <button className="redButton" onClick={deleteAllImages}>
                Delete all images
            </button>
            <ImageUpload
                updatePhotos = {updatePhotos}
                cloud_name={cld.cloudinaryConfig.cloud.cloudName}
                upload_preset={cld.cloudinaryConfig.cloud.uploadPreset}
                crop_preset={cld.cloudinaryConfig.cloud.cropping}
                //onImageUpload={(publicId) => onImageUploadHandler(publicId)}
            />
        </div>
    );
}

export default CloudinaryUpload;
