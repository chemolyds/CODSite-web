import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal, Form} from 'react-bootstrap';

//images
import pencil from "../../node_modules/bootstrap-icons/icons/pencil.svg";

const EditFAQ = (props) => {
	const [show, setShow] = useState(false);
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		let payload = {
			answer: answer,
			question: question
		};
		if (payload.answer && payload.answer) {
			axios.put(`/api/admin/edit_faq/${props.ID}`, payload)
				.then((res) => {
					setShow(false);
					window.location.reload(true);
				})
		}
	}

	useEffect(() => {
		axios
			.get(`/api/user/get_faq/${props.ID}`)
			.then(res => {
				setAnswer(res.data.answer);
				setQuestion(res.data.question);
			});
	}, []);

	return (
		<>
			<button class="row btn px-1 py-1 mx-2" onClick={handleShow}>
				<img src={pencil} alt="edit button" width="20" height="20"/>
				<a class="mx-1 align-middle">Edit</a>
			</button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Editing FAQ</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group controlId="question">
							<Form.Label>Question</Form.Label>
							<Form.Control type="text" value={question} onChange={(event) => setQuestion(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="answer">
							<Form.Label>Answer</Form.Label>
							<Form.Control as="textarea" rows="5" value={answer} onChange={(event) => setAnswer(event.target.value)}/>
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

export default EditFAQ;