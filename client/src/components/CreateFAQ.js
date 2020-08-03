import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal, Form} from 'react-bootstrap';
import {PlusIcon} from "@primer/octicons-react";

const CreateFAQ = (props) => {
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
		if (payload.answer && payload.question) {
			axios.post(`/api/admin/create_faq`, payload)
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
				<a class="mx-1 align-middle">Add</a>
			</button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Adding FAQ</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group controlId="question">
							<Form.Label>Question</Form.Label>
							<Form.Control type="text" placeholder="Add your question here!" value={question} onChange={(event) => setQuestion(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="answer">
							<Form.Label>Answer</Form.Label>
							<Form.Control as="textarea" rows="5" placeholder="Add your answer here!" value={answer} onChange={(event) => setAnswer(event.target.value)}/>
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

export default CreateFAQ;