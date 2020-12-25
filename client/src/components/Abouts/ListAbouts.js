import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import jwt from "jsonwebtoken";
import {Card, CardColumns} from 'react-bootstrap';
import '../../App.css';

//components
import CreateAbout from "./CreateAbout";
import DeleteAbout from "./DeleteAbout";
import EditAbout from "./EditAbout";

const ListAbouts = (props) => {
	const [Abouts, setAbouts] = useState([]);

	const addable = () => {
		const token = localStorage.getItem("user_logged");
		let isAdmin;
		if (token) {
			jwt.verify(token, "jerdan1980", function (err, decoded) {
				if (decoded) {
					isAdmin = decoded.user_info.isAdmin;
				}
			});
			if (isAdmin) {
				return <CreateAbout/>
			}
		}
	}

	const editable = (about) => {
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
					<>
						<EditAbout about={about}/>
						<DeleteAbout about={about}/>
					</>
				)
			}
		}
	}

	useEffect(() => {
			axios.get(`/api/about/get_about`)
				.then(res => {setAbouts(res.data)});
	}, []);

	const AboutList = Abouts.map(about => {
		return (
			<Card key={about._id}>
				<Card.Img variant="top" src={about.thumbnail} />
				<Card.Title class="h3 pt-2"><strong>{about.url}</strong></Card.Title>
				<Card.Body syle={{"padding-top": "0%"}}>
					<p>{about.header}</p>
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group">
							<Link to={"about/" + about._id}>
								<button type="button" class="btn btn-sm btn-outline-secondary">View</button>
							</Link>
							{editable(about)}
						</div>
					</div>
				</Card.Body>
			</Card>
		)
	});

	return (
		<div class="album py-5 container">
			<CardColumns>
				{AboutList}
				{addable()}
			</CardColumns>
		</div>
	)
}

export default ListAbouts;