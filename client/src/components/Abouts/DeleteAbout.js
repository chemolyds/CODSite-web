import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal} from 'react-bootstrap';

const DeleteAbout = (props) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		axios.delete(`/api/about/delete_about/${props.about._id}`)
			.then((res) => {
				setShow(false);
				window.location.reload(true);
			})
	}

	return (
		<>
			<button type="button" class="btn btn-sm btn-outline-secondary" onClick={handleShow}>Delete</button>

			<Modal show={show} onHide={handleClose} class="alert alert-danger">
				<Modal.Header closeButton>
					<Modal.Title>Delete {props.about.url}</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>Are you sure you want to delete {props.about.url}?</p>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						No
					</Button>
					<Button variant="success" onClick={handleSubmit}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default DeleteAbout;