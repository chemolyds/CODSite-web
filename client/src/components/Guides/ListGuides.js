import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import jwt from "jsonwebtoken";
import {Card, CardColumns} from 'react-bootstrap';
import '../../App.css';

//components
import CreateGuide from "./CreateGuide";
import DeleteGuide from "./DeleteGuide";
import EditGuide from "./EditGuide";

const ListGuides = (props) => {
	const [Guides, setGuides] = useState([]);

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
				return <CreateGuide/>
			}
		}
	}

	const editable = (guide) => {
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
						<EditGuide guide={guide}/>
						<DeleteGuide guide={guide}/>
					</>
				)
			}
		}
	}

	useEffect(() => {
			axios.get(`http://localhost:3001/api/guide/get_guide`)
				.then(res => {setGuides(res.data)});
	}, []);

	const GuideList = Guides.map(guide => {
		return (
			<Card key={guide._id}>
				<Card.Img variant="top" src={guide.thumbnail} />
				<Card.Title class="h3 pt-2"><strong>{guide.url}</strong></Card.Title>
				<Card.Body syle={{"padding-top": "0%"}}>
					<p>{guide.description}</p>
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group">
							<Link to={"guides/" + guide._id}>
								<button type="button" class="btn btn-sm btn-outline-secondary">View</button>
							</Link>
							{editable(guide)}
						</div>
					</div>
				</Card.Body>
			</Card>
		)
	});

	return (
		<div class="album py-5 container">
			<CardColumns>
				{GuideList}
				{addable()}
			</CardColumns>
		</div>
	)
}

export default ListGuides;