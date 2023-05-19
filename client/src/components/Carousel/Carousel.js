import React, { useState } from 'react';
import { Button, Modal, Carousel } from 'react-bootstrap/';

export default function CarouselImg({ images = [] }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Carousel className='w-100 d-block mx-auto col-5' variant='dark'>
        {images.map((img, index) => (
          <Carousel.Item key={img._id} onClick={() => handleImageClick(index)}>
            <img className="d-block mx-auto w-75 rounded" src={img.url} alt={img.alt} />
          </Carousel.Item>
        ))}
      </Carousel>

      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Body>
          <img
            className="w-100"
            src={images[selectedImageIndex]?.url}
            alt={images[selectedImageIndex]?.alt}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger col-12" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
