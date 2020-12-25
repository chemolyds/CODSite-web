import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal, Form, Col} from 'react-bootstrap';
import {Card} from 'react-bootstrap';

const CreateSubpage = (props) => {
	const [show, setShow] = useState(false);
	const [URL, setURL] = useState("");
	const [thumbnail, setThumbnail] = useState("");
	const [header, setHeader] = useState("");
	const [contents, setContents] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		let payload = {
			url: URL,
			thumbnail: thumbnail,
			header: header,
			contents: contents
		};

		if (payload.url) {
			axios.post(`/api/about/add_subpage/${props.AboutID}`, payload)
				.then((res) => {
					setShow(false);
					window.location.reload(true);
				})
		}
	}

	return (
		<>
			
			<button type="button" class="btn btn-sm btn-outline-secondary" onClick={handleShow}>
				New
			</button>
			
			<Modal show={show} onHide={handleClose} dialogClassName="modal-lg">
				<Modal.Header closeButton>
					<Modal.Title>Adding Subpage</Modal.Title>
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
							<Form.Control type="text" placeholder="Add Card Description here!" value={header} onChange={(event) => setHeader(event.target.value)}/>
						</Form.Group>
						<Form.Group contolId="contents">
							<Form.Label>Contents</Form.Label>
							<Form.Control as="textarea" rows="5" placeholder="Add the contents!" value={contents} onChange={(event) => setContents(event.target.value)}/>
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
	)
}

export default CreateSubpage;