import React, { useEffect } from 'react';
import cloudinary from 'cloudinary-core';

const PictureList = ({ pictures = [] }) => {
    useEffect(() => {
        const myWidget = cloudinary.createUploadWidget(
        {
            cloudName: 'dyyvpwi2d',
            uploadPreset: 'wxs3ivaq',
            cropping: true, // Enable cropping functionality
            croppingAspectRatio: 1, // Set aspect ratio for cropping
            croppingShowDimensions: true, // Show dimensions of the cropped image
            croppingDefaultSelectionRatio: 0.8, // Set the default selection ratio for cropping
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            }
        }
        );
        const handleClick = () => {
        myWidget.open();
        };
        const uploadButton = document.getElementById("upload_widget");
        uploadButton.addEventListener("click", handleClick);
        return () => {
        uploadButton.removeEventListener("click", handleClick);
        };
    }, []);
    return(
    <>
    <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
    <button id="upload_widget" className="cloudinary-button">Upload files</button>
    </>
    )
};

export default PictureList;