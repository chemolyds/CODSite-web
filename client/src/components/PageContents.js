import React, {useState, useEffect} from 'react';
import ReactMarkdown from "react-markdown/with-html";
import axios from "axios";
import jwt from 'jsonwebtoken';
import {Button, Modal, Form} from 'react-bootstrap';
import {PencilIcon, CheckCircleFillIcon, CircleIcon} from "@primer/octicons-react";

//Components
//import EditPageContents from "./EditPageContents";
//import EditPageHidden from "./EditPageHidden";

const PageContents = (props) => {
	//viewer
	const [header, setHeader] = useState(props.page);
	const [contents, setContents] = useState("Please hold on...");
	//editor
	const [show, setShow] = useState(false);
	const [editHeader, setEditHeader] = useState("");
	const [editContents, setEditContents] = useState("");
	//hidden mode
	const [hidden, setHidden] = useState(true);
	const [icon, setIcon] = useState();
	
	//editor modal
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleEditSubmit = (event) => {
		let payload = {
			header: editHeader,
			contents: editContents
		};
		if (payload.header && payload.contents) {
			axios.put(`/api/admin/edit_page/${props.page}`, payload)
				.then((res) => {
					setShow(false);
					window.location.reload(true);
				})
		}
	}

	const handleHiddenSubmit = () => {
		axios.get(`/api/admin/toggle_page/${props.page}`)
		.then((res) => {
			window.location.reload(true);
		});
	}

	const editable = () => {
		const token = localStorage.getItem("user_logged");
		let isAdmin;
		if (token) {
			jwt.verify(token, "jerdan1980", function (err, decoded) {
				if (decoded) {
					isAdmin = decoded.user_info.isAdmin;
				}
			});
			if (isAdmin) {
				return (
					<span>
						<>
							<button class="row btn px-1 py-1 mx-1" onClick={handleShow}>
								<PencilIcon/>
								<a class="mx-1 align-middle">Edit</a>
							</button>

							<Modal show={show} onHide={handleClose} dialogClassName="modal-lg">
								<Modal.Header closeButton>
									<Modal.Title>Editing {props.page}</Modal.Title>
								</Modal.Header>

								<Modal.Body>
									<Form>
										<Form.Group controlId="header">
											<Form.Label>Header</Form.Label>
											<Form.Control type="text" value={editHeader} onChange={(event) => setEditHeader(event.target.value)}/>
										</Form.Group>
										<Form.Group controlId="contents">
											<Form.Label>Contents</Form.Label>
											<Form.Control as="textarea" rows="5" value={editContents} onChange={(event) => setEditContents(event.target.value)}/>
										</Form.Group>
									</Form>
								</Modal.Body>

								<Modal.Footer>
									<Button variant="danger" onClick={handleClose}>
										Cancel
									</Button>
									<Button variant="success" onClick={handleEditSubmit}>
										Save
									</Button>
								</Modal.Footer>
							</Modal>
						</>
						<>
							<button class="row btn px-1 py-1 mx-1" checked={hidden} onClick={(event) => handleHiddenSubmit()}>
								{icon}
								<a class="mx-1 align-middle">Hidden</a>
							</button>
						</>
					</span>
				)
			}
		}
	}

	//fetch
	useEffect(() => {
		axios.get(`/api/user/get_page/${props.page}`) 
			.then(res => {
				//viewer
				setHeader(res.data.header);
				setContents(res.data.contents);
				//editor
				setEditHeader(res.data.header);
				setEditContents(res.data.contents);
				//hidden
				setHidden(res.data.hidden);
			});
	}, []);

	//hidden
	useEffect(() => {
		hidden ? setIcon(<CheckCircleFillIcon/>) : setIcon(<CircleIcon/>);
	}, [hidden])

	return (
		<div>
			{editable()}

			<h1 class="display-1 font-weight-bold">{header}</h1>
			<p class="py-1"/>
			<div class="flex mx-4 text-left">
				<ReactMarkdown source={contents} escapeHtml={false}/>
			</div>
			
		</div>
	)
}

export default PageContents;