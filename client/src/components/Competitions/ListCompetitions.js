import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import jwt from "jsonwebtoken";
import {Card, CardColumns} from 'react-bootstrap';
import '../../App.css';

//components
import CreateCompetitions from "./CreateCompetitions";
import DeleteCompetitions from "./DeleteCompetitions";
import EditCompetitions from "./EditCompetitions";

const ListCompetitions = (props) => {
	const [Competitions, setCompetitions] = useState([]);

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
				return <CreateCompetitions/>
			}
		}
	}

	const editable = (competitions) => {
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
						<EditCompetitions competitions={competitions}/>
						<DeleteCompetitions competitions={competitions}/>
					</>
				)
			}
		}
	}

	useEffect(() => {
			axios.get(`/api/competitions/get_competitions`)
				.then(res => {setCompetitionss(res.data)});
	}, []);

	const CompetitionsList = Competitionss.map(competitions => {
		return (
			<Card key={competitions._id}>
				<Card.Img variant="top" src={competitions.thumbnail} />
				<Card.Title class="h3 pt-2"><strong>{competitions.url}</strong></Card.Title>
				<Card.Body syle={{"padding-top": "0%"}}>
					<p>{competitions.header}</p>
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group">
							<Link to={"competitions/" + competitions._id}>
								<button type="button" class="btn btn-sm btn-outline-secondary">View</button>
							</Link>
							{editable(competitions)}
						</div>
					</div>
				</Card.Body>
			</Card>
		)
	});

	return (
		<div class="album py-5 container">
			<CardColumns>
				{CompetitionsList}
				{addable()}
			</CardColumns>
		</div>
	)
}

export default ListCompetitionss;