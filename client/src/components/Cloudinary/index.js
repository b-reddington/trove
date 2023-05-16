// import React, { useEffect } from 'react';
// import cloudinary from 'cloudinary-core';

// const PictureList = ({ pictures = [] }) => {
//     useEffect(() => {
//         const myWidget = cloudinary.createUploadWidget(
//         {
//             cloudName: 'dyyvpwi2d',
//             uploadPreset: 'wxs3ivaq',
//             cropping: true, // Enable cropping functionality
//             croppingAspectRatio: 1, // Set aspect ratio for cropping
//             croppingShowDimensions: true, // Show dimensions of the cropped image
//             croppingDefaultSelectionRatio: 0.8, // Set the default selection ratio for cropping
//         },
//         (error, result) => {
//             if (!error && result && result.event === "success") {
//             console.log('Done! Here is the image info: ', result.info);
//             }
//         }
//         );
//         const handleClick = () => {
//         myWidget.open();
//         };
//         const uploadButton = document.getElementById("upload_widget");
//         uploadButton.addEventListener("click", handleClick);
//         return () => {
//         uploadButton.removeEventListener("click", handleClick);
//         };
//     }, []);
//     return(
//     <>
//     <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
//     <button id="upload_widget" className="cloudinary-button">Upload files</button>
//     </>
//     )
// };

// export default PictureList;

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
            croppingAspectRatio: 1, // Set aspect ratio for cropping
            croppingShowDimensions: true, // Show dimensions of the cropped image
            croppingDefaultSelectionRatio: 0.8 // Set the default selection ratio for cropping
        }
    });

    const onImageUploadHandler = (publicId) => {
        setImagesUploadedList((prevState) => [...prevState, publicId]);
    };

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
                cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
                upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
                onImageUpload={(publicId) => onImageUploadHandler(publicId)}
            />
        </div>
    );
}

export default CloudinaryUpload;
