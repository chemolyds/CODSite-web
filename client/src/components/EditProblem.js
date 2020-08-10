import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal, Form} from 'react-bootstrap';
import {PencilIcon} from "@primer/octicons-react";


const EditProblem = (props) => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [rating, setRating] = useState(1);
	const [difficulty, setDifficulty] = useState(1);
	const [length, setLength] = useState(1);
	const [description, setDescription] = useState("");
	const [problemPDFName, setProblemPDFName] = useState("");
	const [solutionPDFName, setSolutionPDFName] = useState("");

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
			problemPDFName: problemPDFName
		};
		if (solutionPDFName) {
			payload["hasSolution"] = true;
			payload["solutionPDFName"] = solutionPDFName;
		} else {
			payload["hasSolution"] = false;
		}
		if (payload.name && payload.category && payload.description && payload.problemPDFName) {
			axios.put(`http://localhost:3001/api/problems/get_problem/${props.ID}`, payload)
				.then((res) => {
					setShow(false);
					window.location.reload(true);
				})
		}
	}

	useEffect(() => {
		/*axios
			.get(`/api/problems/get_problem/${props.ID}`)
			.then(res => {
				setName(res.data.name);
				setCategory(res.data.category);
				setRating(res.data.rating);
				setDifficulty(res.data.difficulty);
				setLength(res.data.length);
				setDescription(res.data.description);
				setProblemPDFName(res.data.problemPDFName);
				setSolutionPDFName(res.data.solutionPDFName);
			});*/
			setName(props.problem.name);
			setCategory(props.problem.category);
			setRating(props.problem.rating);
			setDifficulty(props.problem.difficulty);
			setLength(props.problem.length);
			setDescription(props.problem.description);
			setProblemPDFName(props.problem.problemPDFName);
			setSolutionPDFName(props.problem.solutionPDFName);
	}, []);

	return (
		<>
			<button class="row btn px-0 py-0 mx-0 my-0" onClick={handleShow}>
				<PencilIcon/>
			</button>

			<Modal show={show} onHide={handleClose} dialogClassName="modal-lg">
				<Modal.Header closeButton>
					<Modal.Title>Editing Problem</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group controlId="name">
							<Form.Label>Problem Name</Form.Label>
							<Form.Control type="text" placeholder="Add a unique name here!" value={name} onChange={(event) => setName(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="category">
							<Form.Label>Category</Form.Label>
							<Form.Control type="text" placeholder="Type in the category!" value={category} onChange={(event) => setCategory(event.target.value)}/>
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
						<Form.Group controlId="problemPDFName">
							<Form.Label>Problem PDF Link</Form.Label>
							<Form.Control as="textarea" rows="2" placeholder="Insert problem PDF link here!" value={problemPDFName} onChange={(event) => setProblemPDFName(event.target.value)}/>
						</Form.Group>
						<Form.Group controlId="solutionPDFName">
							<Form.Label>Solution PDF Link</Form.Label>
							<Form.Control as="textarea" rows="2" placeholder="Insert solution PDF link here! (completely optional!)" value={solutionPDFName} onChange={(event) => setSolutionPDFName(event.target.value)}/>
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

export default EditProblem;