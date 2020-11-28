import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal, Form, Col} from 'react-bootstrap';
import {Card, CardColumns} from 'react-bootstrap';
import {PlusIcon} from "@primer/octicons-react";

const CreateGuide = (props) => {
	const [show, setShow] = useState(false);
	const [URL, setURL] = useState("");
	const [thumbnail, setThumbnail] = useState("");
	const [header, setHeader] = useState("");
	const [description, setDescription] = useState("");

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
			axios.post(`http://localhost:3001/api/guide/add_guide`, payload)
				.then((res) => {
					setShow(false);
					window.location.reload(true);
				})
		}
	}

	return (
		<>
			<Card>
				<Card.Title class="h3 pt-4 mb-0 pb-0"><strong>Add New</strong></Card.Title>
				<Card.Body style={{"padding-top": "0%", "margin-top": "0%"}}>
					<button type="button" class="btn btn-sm btn-outline-secondary" onClick={handleShow}>New</button>
				</Card.Body>
			</Card>
			
			<Modal show={show} onHide={handleClose} dialogClassName="modal-lg">
				<Modal.Header closeButton>
					<Modal.Title>Adding Guide</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group contolId="url">
							<Form.Label>Card Title</Form.Label>
							<Form.Control type="text" placeholder="Add the Card Title here!" value={URL} onChange={(event) => setURL(event.target.value)}/>
						</Form.Group>
						<Form.Group contolId="thumbnail">
							<Form.Label>Thumbnail URL</Form.Label>
							<Form.Control type="text" placeholder="Add the thumbnail's URL here!" value={thumbnail} onChange={(event) => setThumbnail(event.target.value)}/>
						</Form.Group>
						<Form.Group contolId="header">
							<Form.Label>Card Description</Form.Label>
							<Form.Control type="text" placeholder="Add the Card Description here!" value={header} onChange={(event) => setHeader(event.target.value)}/>
						</Form.Group>
						<Form.Group contolId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" placeholder="Add your description here!" value={description} onChange={(event) => setDescription(event.target.value)}/>
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

export default CreateGuide;