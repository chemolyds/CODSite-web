import React, {useState, useEffect} from "react";
import {ReactSortable} from "react-sortablejs";
import {Button, Modal, InputGroup, FormControl} from 'react-bootstrap';
import {PencilIcon, PlusIcon} from "@primer/octicons-react";
import axios from "axios";
import { InputGroupAppend } from "react-bootstrap/InputGroup";

const EditResourceCategoriesReact = (props) => {
	const [show, setShow] = useState(false);
	const [categories, setCategories] = useState([
		{ id: 1, name: "Misc" }
	]);
	const [newCategory, setNewCategory] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		let payload = [];
		categories.forEach(item => {
			payload.push(item.name);
		})
		axios.put("http://localhost:3001/api/resources/edit_categories", {categories: payload})
			.then((res) => {
				setShow(false);
				window.location.reload(true);
			});
	}

	const handleNewCategory = () => {
		let arr = categories;
		categories.push({
			id: categories.length,
			name: newCategory
		});
		setNewCategory("");
		setCategories(arr);
	}

	const handleReset = () => {
		axios.get("http://localhost:3001/api/resources/get_categories")
		.then(res => {
			let cat = res.data.categories
			let arr = [];
			for (const c of cat) {
				arr.push({
					id: cat.indexOf(c),
					name: c
				});
			};
			//console.log("arr =>", arr);
			setCategories(arr);
		})
	}

	useEffect(() => {
		handleReset();
	}, []);

	return (
		<>
			<button class="row btn px-1 py-1 mx-1 my-1" onClick={handleShow}>
				<PencilIcon/>
				<a class="mx-1 align-middle">Categories</a>
			</button>

			<Modal show={show} onHide={handleClose} dialogClassName="modal-lg">
				<Modal.Header closeButton>
					<Modal.Title>Editing Categories</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<label>New Category:</label>
					<InputGroup className="mb-3">
						<FormControl placeholder="Category name" onChange={(event) => setNewCategory(event.target.value)}/>
						<InputGroup.Append>
							<Button variant="outline-secondary" onClick={handleNewCategory}>Add</Button>
						</InputGroup.Append>
					</InputGroup>
					<h1>
						Categories
						<Button variant="danger ml-3" onClick={handleReset}>Reset</Button>
					</h1>
					<div class="container text-align-center">
						<ReactSortable list={categories} setList={setCategories}>
							{
								categories.map(item => (
									<div key={item.id}>{item.name}</div>
								))
							}
						</ReactSortable>
					</div>
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
};

export default EditResourceCategoriesReact;