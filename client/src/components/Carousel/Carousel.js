import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';


export default function CarouselImg({ images = [] }) {

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const goToPreviousImage = () => {
//     const newIndex = (currentImageIndex - 1 + images.length) % images.length;
//     setCurrentImageIndex(newIndex);
//   };

//   const goToNextImage = () => {
//     const newIndex = (currentImageIndex + 1) % images.length;
//     setCurrentImageIndex(newIndex);
//   };
//   const imageUrls = images.map((photo) => photo.url);
  return (
    
    
    <Carousel className='w-100 d-block mx-auto' variant='dark'>
    {images.map((img)=>(
        <Carousel.Item key={img._id}>
            <img
            className="d-block mx-auto w-75"
            src={img.url}
            />
        </Carousel.Item>
    ))}
    </Carousel>
    
  );
};

