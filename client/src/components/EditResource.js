import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal, Form} from 'react-bootstrap';
import {PencilIcon} from "@primer/octicons-react";

const EditResource = (props) => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [rating, setRating] = useState(1);
	const [difficulty, setDifficulty] = useState(1);
	const [length, setLength] = useState(1);
	const [description, setDescription] = useState("");
	const [resourceLink, setResourceLink] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		let payload = {
			name: name,
			category: category,
			rating: rating,
			difficulty: difficulty,
			length: length,
			description: description,
			resourceLink: resourceLink
		};
		if (payload.name && payload.category && payload.description && payload.resourceLink) {
			axios.put(`http://localhost:3001/api/resources/edit_resource/${props.ID}`, payload)
				.then((res) => {
					setShow(false);
					window.location.reload(true);
				})
		}
	}

	useEffect(() => {
			setName(props.resource.name);
			setCategory(props.resource.category);
			setRating(props.resource.rating);
			setDifficulty(props.resource.difficulty);
			setLength(props.resource.length);
			setDescription(props.resource.description);
			setResourceLink(props.resource.resourceLink);
	}, []);

	return (
		<>
			<button class="row btn px-0 py-0 mx-0 my-0" onClick={handleShow}>
				<PencilIcon/>
			</button>

			<Modal show={show} onHide={handleClose} dialogClassName="modal-lg">
				<Modal.Header closeButton>
					<Modal.Title>Editing Resource</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group controlId="name">
							<Form.Label>Resource Name</Form.Label>
							<Form.Control type="text" placeholder="Add a unique name here!" value={name} onChange={(event) => setName(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control as="select" value={category} onChange={(event) => setCategory(event.target.value)}>
								{
									props.categories.map(item => {
										return (
											<option>{item}</option>
										)
									})
								}
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="rating">
							<Form.Label>Rating</Form.Label>
							<Form.Control type="range" min="1" max="5" step="1" value={rating} onChange={(event) => setRating(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="difficulty">
							<Form.Label>Difficulty</Form.Label>
							<Form.Control type="range" min="1" max="5" step="1" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="length">
							<Form.Label>Length</Form.Label>
							<Form.Control type="range" min="1" max="5" step="1" value={length} onChange={(event) => setLength(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" rows="3" placeholder="Add a short description here!" value={description} onChange={(event) => setDescription(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="resourceLink">
							<Form.Label>Resource Link</Form.Label>
							<Form.Control as="textarea" rows="2" placeholder="Insert resource link here!" value={resourceLink} onChange={(event) => setResourceLink(event.target.value)}/>
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

export default EditResource;