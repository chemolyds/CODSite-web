import React, {useState, useEffect} from 'react';
import axios from "axios";
import jwt from "jsonwebtoken";

import {Card, CardColumns} from 'react-bootstrap';
import { CardHeader } from 'react-bootstrap/Card';

const placeholder = "https://camo.githubusercontent.com/7900ca3227df27367ce5c62c38f34142d95017f6117800bc2422c03d9c2a825c/687474703a2f2f696d736b792e6769746875622e696f2f686f6c6465722f696d616765732f686f6c6465725f736b792e706e67"

const ListGuides = (props) => {
	const [Guides, setGuides] = useState([]);

	useEffect(() => {
			axios.get(`http://localhost:3001/api/guide/get_guide`)
				.then(res => {setGuides(res.data)});
	}, []);

	const GuideList = Guides.map(guide => {
		return (
			<Card key={guide._id}>
				<Card.Img variant="top" src={placeholder} />
				<Card.Title class="h3 pt-2"><strong>{guide.url}</strong></Card.Title>
				<Card.Body syle={{"padding-top": "0%"}}>
					<p>{guide.description}</p>
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group">
							<button type="button" class="btn btn-sm btn-outline-secondary">View</button>
							<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
							<button type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
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
				<Card>
				<Card.Title class="h3 pt-4 mb-0 pb-0"><strong>Add New</strong></Card.Title>
				<Card.Body syle={{"padding-top": "0%", "margin-top": "0%"}}>
					<button type="button" class="btn btn-sm btn-outline-secondary">New</button>
				</Card.Body>
				</Card>
			</CardColumns>
		</div>
	)
}

export default ListGuides;