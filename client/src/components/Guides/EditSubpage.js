import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal, Form} from 'react-bootstrap';

const EditSubpage = (props) => {
	const [show, setShow] = useState(false);
	const [URL, setURL] = useState(props.subpage.url);
	const [thumbnail, setThumbnail] = useState(props.subpage.thumbnail);
	const [header, setHeader] = useState(props.subpage.header);
	const [contents, setContents] = useState(props.subpage.contents);
	
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
			axios.put(`/api/guide/edit_subpage/${props.guideID}/${props.subpage._id}`, payload)
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
					<Modal.Title>Editing Subpage</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
					<Form.Group contolid="url">
							<Form.Label>Card Title</Form.Label>
							<Form.Control type="text" placeholder="Add the Card Title here!" value={URL} onChange={(event) => setURL(event.target.value)}/>
						</Form.Group>
						<Form.Group contolid="thumbnail">
							<Form.Label>Thumbnail URL</Form.Label>
							<Form.Control type="text" placeholder="Add the thumbnail's URL here!" value={thumbnail} onChange={(event) => setThumbnail(event.target.value)}/>
						</Form.Group>
						<Form.Group contolid="header">
							<Form.Label>Card Description</Form.Label>
							<Form.Control type="text" placeholder="Add the Card Description here!" value={header} onChange={(event) => setHeader(event.target.value)}/>
						</Form.Group>
						<Form.Group contolid="contents">
							<Form.Label>Contents</Form.Label>
							<Form.Control as="textarea" rows="5" placeholder="Add the contents of the subpage!" value={contents} onChange={(event) => setContents(event.target.value)}/>
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

export default EditSubpage;