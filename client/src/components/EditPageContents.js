import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal, Form} from 'react-bootstrap';
//import Modal from 'react-bootstrap/Modal';

//images
import pencil from "../../node_modules/bootstrap-icons/icons/pencil.svg";

const EditPageContents = (props) => {
	const [show, setShow] = useState(false);
	const [header, setHeader] = useState("");
	const [contents, setContents] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		let payload = {
			header: header,
			contents: contents
		};
		if (payload.header && payload.contents) {
			axios.put(`http://localhost:3001/api/admin/edit_page/${props.page}`, payload)
				.then((res) => {
					setShow(false);
					window.location.reload(true);
				})
		}
	}

	useEffect(() => {
		axios
			.get(`http://localhost:3001/api/user/get_page/${props.page}`)
			.then(res => {
				setHeader(res.data.header);
				setContents(res.data.contents);
			});
	}, []);

	return (
		<>
			<img src={pencil} onClick={handleShow} alt="edit button" width="32" height="32"/>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Editing {props.page}</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group controlId="header">
							<Form.Label>Header</Form.Label>
							<Form.Control type="text" value={header} onChange={(event) => setHeader(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="contents">
							<Form.Label>Contents</Form.Label>
							<Form.Control as="textarea" rows="5" value={contents} onChange={(event) => setContents(event.target.value)}/>
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

export default EditPageContents;