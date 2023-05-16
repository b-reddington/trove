import { openUploadWidget } from "../../utils/CloudinaryService";
import{useEffect, useState} from 'react';

const ImageUpload = (props) => {
    const [images,setImages] = useState([]);
    useEffect(() => {
        console.log(images);
    });
  const uploadImageWidget = () => {
    console.log('props'+props);
    let myUploadWidget = openUploadWidget(
      {
        cloudName: 'dyyvpwi2d',
        uploadPreset: 'wxs3ivaq',
        cropping: true, // Enable cropping functionality
            croppingAspectRatio: 1, // Set aspect ratio for cropping
            croppingShowDimensions: true, // Show dimensions of the cropped image
            croppingDefaultSelectionRatio: 0.8, // Set the default selection ratio for cropping
        tags: ["myname"],
        maxImageWidth: 600,
        sources: ["local", "url", "camera"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
            console.log(result);
            setImages([...images,result.info.secure_url])
          props.onImageUpload(result.info.public_id);
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
     </div>
    </div>
  );
};

export default ImageUpload;
