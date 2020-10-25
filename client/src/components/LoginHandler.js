import React, {useState} from 'react';
import axios from "axios";
import {Button, Modal, Form} from 'react-bootstrap';

const LoginHandler = (props) => {
	const [show, setShow] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	
	const handleSubmit = () => {
		let payload = {
			username: username,
			password: password
		};
		if(username && password) {
			axios
				.post(`/api/user/login`, payload)
				.then(res => {
					if (res) {
						console.log(res);
						localStorage.setItem("user_logged", res.data.token);
						window.location.reload(true);
					}
				});
		}
	}

	return (
		<>
			<a onClick={handleShow}>Login</a>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>Sorry, no registering just yet!</p>
					<Form>
						<Form.Group controlId="username">
							<Form.Label>Username:</Form.Label>
							<Form.Control required type="text" placeholder="Enter username here"  onChange={(event) => setUsername(event.target.value)}/>
							<Form.Control.Feedback type="invalid">Please enter username.</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="password">
							<Form.Label>Password:</Form.Label>
							<Form.Control required type="password" placeholder="Enter password here" onChange={(event) => setPassword(event.target.value)}/>
							<Form.Control.Feedback type="invalid">Please enter password.</Form.Control.Feedback>
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="success" onClick={handleSubmit}>
						Login
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default LoginHandler;