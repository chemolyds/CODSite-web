import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Button, Modal} from 'react-bootstrap';
import {TrashIcon} from "@primer/octicons-react";

const DeleteCategory = (props) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		//https://stackoverflow.com/questions/51069552/axios-delete-request-with-body-and-headers
		axios.delete(`/api/problems/delete_category`, { data: { category: props.category } })
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

	return (
		<>
			<button class="row btn px-0 py-0 mx-0 my-0" onClick={handleShow}>
				<TrashIcon/>
			</button>

			<Modal show={show} onHide={handleClose} class="alert alert-danger">
				<Modal.Header closeButton>
					<Modal.Title>Delete Category</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>Are you sure you want to delete {props.category}?</p>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						No
					</Button>
					<Button variant="success" onClick={handleSubmit}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default DeleteCategory;