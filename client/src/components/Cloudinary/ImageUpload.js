import { openUploadWidget } from "../../utils/CloudinaryService";
import{useEffect, useState} from 'react';

const ImageUpload = (props) => {
    console.log('Image Upload' + props);
    const [images,setImages] = useState([]);
    useEffect(() => {
        console.log(images);
    });
  const uploadImageWidget = (e) => {
    e.preventDefault();
    console.log('props'+props.cloud_name);
    let myUploadWidget = openUploadWidget(
      {
        cloudName: props.cloud_name,
        uploadPreset: props.upload_preset,
        cropping: props.crop_preset, // Enable cropping functionality
    //     croppingAspectRatio: 1, // Set aspect ratio for cropping
    //     croppingShowDimensions: true, // Show dimensions of the cropped image
    //     croppingDefaultSelectionRatio: 0.8, // Set the default selection ratio for cropping
    //     croppingCoordinatesMode: 'custom', // Set the cropping coordinates mode to custom
       },
      function (error, result) {
        
        if (!error && result.event === "success"){
            console.log(result);
           setImages([...images,result.info.url])
           console.log('pubID   '+result.info.public_id);
//          props.onImageUpload(result.info.public_id);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <div>
    <button className="greenButton" onClick={uploadImageWidget}>
      Upload Image
    </button>
     <div>
     {images.length ? (
      images.map(image=>{
        return <img src={image} />
      })
     ):(null)}
   {/* {images.length ? (
  images.map((image, index) => {
    return <img key={index} src={image} alt="Cropped Image" />;
  })
) : null} */}
     </div>
    </div>
  );
};

export default ImageUpload;
