import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom'

//get trip info by querying

export default function EditModal({ show, handleClose }) {
    const { tripId } = useParams();
    
    return (
        <Modal show={show} onClick={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Your Trip</Modal.Title>
            </Modal.Header>

            <Modal.Body>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleClose}>Save Changes</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}