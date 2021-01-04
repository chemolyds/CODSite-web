import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal, Form} from 'react-bootstrap';

const EditGuide = (props) => {
	const [show, setShow] = useState(false);
	const [URL, setURL] = useState(props.guide.url);
	const [thumbnail, setThumbnail] = useState(props.guide.thumbnail);
	const [header, setHeader] = useState(props.guide.header);
	const [description, setDescription] = useState(props.guide.description);
	
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		let payload = {
			url: URL,
			thumbnail: thumbnail,
			header: header,
			description: description
		};
		if (payload.url) {
			axios.put(`/api/guide/edit_guide/${props.guide._id}`, payload)
				.then((res) => {
					setShow(false);
					window.location.reload(true);
				})
		}
	}

	return (
		<>
			<button type="button" class="btn btn-sm btn-outline-secondary" onClick={handleShow}>Edit</button>

			<Modal show={show} onHide={handleClose} dialogClassName="modal-lg">
				<Modal.Header closeButton>
					<Modal.Title>Editing Guide</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group contolId="url">
							<Form.Label>Card Title</Form.Label>
							<Form.Control type="test" placeholder="Add the Card Title here!" value={URL} onChange={(event) => setURL(event.target.value)}/>
						</Form.Group>
						<Form.Group contolId="thumbnail">
							<Form.Label>Thumbnail URL</Form.Label>
							<Form.Control type="test" placeholder="Add the thumbnail's URL here!" value={thumbnail} onChange={(event) => setThumbnail(event.target.value)}/>
						</Form.Group>
						<Form.Group contolId="header">
							<Form.Label>Card Description</Form.Label>
							<Form.Control type="test" placeholder="Add the Card Description here!" value={header} onChange={(event) => setHeader(event.target.value)}/>
						</Form.Group>
						<Form.Group contolId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" rows="3" placeholder="Add your description here!" value={description} onChange={(event) => setDescription(event.target.value)}/>
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="success" onClick={handleSubmit}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);

}

export default EditGuide;