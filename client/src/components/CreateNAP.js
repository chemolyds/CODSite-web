import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal, Form, Col} from 'react-bootstrap';
import {PlusIcon} from "@primer/octicons-react";

const CreateNAP = (props) => {
	const [show, setShow] = useState(false);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [header, setHeader] = useState("");
	const [description, setDescription] = useState("");
	const [linkText, setLinkText] = useState("");
	const [link, setLink] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		let payload = {
			x: Number(x),
			y: Number(y),
			linkText: linkText,
			link: link
		};
		if (header) {
			payload["hasHeader"] = true;
			payload["header"] = header;
		} else {
			payload["hasHeader"] = false;
		}
		if (description) {
			payload["hasDescription"] = true;
			payload["description"] = header;
		} else {
			payload["hasDescription"] = false;
		}
		console.log(payload);
		if (payload.x > 0 && payload.y > 0 && payload.linkText && payload.link) {
			axios.post(`http://localhost:3001/api/nap/create_nap`, payload)
				.then((res) => {
					setShow(false);
					window.location.reload(true);
				})
		}
	}

	return (
		<>
			<button class="row btn px-1 py-1 mx-1 my-1" onClick={handleShow}>
				<PlusIcon/>
				<a class="mx-1 align-middle">Add Cell</a>
			</button>

			<Modal show={show} onHide={handleClose} dialogClassName="modal-lg">
				<Modal.Header closeButton>
					<Modal.Title>Adding NAP Cell</Modal.Title>
				</Modal.Header>

				<Modal.Body>
				
					<Form>
						<div class="alert alert-danger">
							Make sure not to type in a coordinate that already has a cell in it! The top-left cell is (1,1)
						</div>
						<Form.Row>
						<Form.Group controlId="x" as={Col}>
							<Form.Label>X coord</Form.Label>
							<Form.Control type="text" placeholder="Enter a number!" value={x} onChange={(event) => setX(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="y" as={Col}>
							<Form.Label>Y Coord</Form.Label>
							<Form.Control type="text" placeholder="Enter a number!" value={y} onChange={(event) => setY(event.target.value)}/>
						</Form.Group>
						</Form.Row>
						<Form.Group controlId="header">
							<Form.Label>Header</Form.Label>
							<Form.Control type="text" placeholder="Add a header here! (optional)" value={header} onChange={(event) => setHeader(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" rows="3" placeholder="Add a description here! (optional)" value={description} onChange={(event) => setDescription(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="linkText">
							<Form.Label>Link Text</Form.Label>
							<Form.Control type="text" placeholder="Add the link label here!" value={linkText} onChange={(event) => setLinkText(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="link">
							<Form.Label>Link URL</Form.Label>
							<Form.Control as="textarea" rows="2" placeholder="Insert link URL here!" value={link} onChange={(event) => setLink(event.target.value)}/>
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

export default CreateNAP;