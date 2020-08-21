import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal, Form} from 'react-bootstrap';
import {PencilIcon} from "@primer/octicons-react";

const EditResourceCategoryName = (props) => {
	const [show, setShow] = useState(false);
	const [category, setCategory] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		let payload = {
			original: props.category,
			category: category
		};
		if (payload.category) {
			axios.put(`http://localhost:3001/api/resources/edit_category`, payload)
				.then((res) => {
					setShow(false);
					window.location.reload(true);
				})
				.catch((err) => {
					if(err.res) {
						console.log(err.res.status, err.res.data);
					}
				})
		}
	}

	useEffect(() => {
		setCategory(props.category);
	}, []);

	return (
		<>
			<button class="row btn px-0 py-0 mx-0 my-0" onClick={handleShow}>
				<PencilIcon/>
			</button>

			<Modal show={show} onHide={handleClose} dialogClassName="modal-lg">
				<Modal.Header closeButton>
					<Modal.Title>Editing {props.category}</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group controlId="category">
							<Form.Label>Category Name</Form.Label>
							<Form.Control type="text" value={category} onChange={(event) => setCategory(event.target.value)}/>
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

export default EditResourceCategoryName;