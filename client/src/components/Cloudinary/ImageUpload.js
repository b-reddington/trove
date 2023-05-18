import { openUploadWidget } from "../../utils/CloudinaryService";
import { useEffect, useState } from 'react';

const ImageUpload = (props) => {
  
  console.log('Image Upload' + props);
  const [images, setImages] = useState([]);
  useEffect(() => {
    console.log(images);
  });

  const uploadImageWidget = (e) => {
    e.preventDefault();
    console.log('props' + props.cloud_name);
    let myUploadWidget = openUploadWidget(
      {
        cloudName: props.cloud_name,
        uploadPreset: props.upload_preset,
        cropping: props.crop_preset, // Enable cropping functionality
        croppingAspectRatio: 1, // Set aspect ratio for cropping
      },
      function (error, result) {

        if (!error && result.event === "success") {
          console.log(result);
          setImages([...images, result.info.url])
          console.log('pubID   ' + result.info.public_id);
          props.onImageUpload(result.info.url)
        }
      }
    );
    myUploadWidget.open();
  };
  const deleteAllImages = async (e) => {
    e.preventDefault();
    try {
      setImages([]);
    } catch (error) {
      console.log(error.message);
    }
  }
  const deleteImage = (event, index) => {
    event.preventDefault();
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  return (
    <div className='imageUpload'>
      <button className="btn btn-primary" onClick={uploadImageWidget}>
        Upload Image
      </button>
      <button className="btn btn-danger" onClick={deleteAllImages}>
        Delete all images
      </button>

      <div className="croppedImage">
        {images.length ? (
          images.map((image, index) => {
            return (
              <div className= 'imgContainer' key={index}>
                <img src={image} alt={`Image ${index + 1}`} />
                <button
                  className="btn btn-danger imgBtn"
                  onClick={(event) => deleteImage(event, index)}
                >
                  Delete
                </button>
              </div>
            );
          })
        ) : null}
      </div>
    </div>
  );
};

export default ImageUpload;
