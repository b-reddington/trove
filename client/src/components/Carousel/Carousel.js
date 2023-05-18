import React, { useState } from 'react';




const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const goToNextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };
  const imageUrls = images.map((photo) => photo.url);
  return (
    <div className="carousel">
      <button onClick={goToPreviousImage}>Previous</button>
      <img src={imageUrls[currentImageIndex]} alt="carousel-image" />
      <button onClick={goToNextImage}>Next</button>
    </div>
  );
};

export default Carousel;