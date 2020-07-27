import React, {useState, useEffect} from 'react';
import axios from "axios";
import jwt from "jsonwebtoken";
import { Card, Accordion, Button } from 'react-bootstrap';
import EditFAQ from "./EditFAQ";
import DeleteFAQ from "./DeleteFAQ";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

const FAQs = (props) => {
	const [FAQs, setFAQs] = useState([]);
	const [query, setQuery] = useState("");

	const updateQuery = (event) => {
		setQuery(event.target.value.toLowerCase());
	}

	const editable = (id) => {
		const token = localStorage.getItem("user_logged");
		let isAdmin;
		if (token) {
			jwt.verify(token, "jerdan1980", function (err, decoded) {
				isAdmin = decoded.user_info.isAdmin;
			});
			if (isAdmin) {
				return (
					<div>
						<EditFAQ ID={id}/>
						<DeleteFAQ ID={id}/>
					</div>
				)
			}
		}
	}

	useEffect(() => {
		axios.get(`http://localhost:3001/api/user/get_faq`) 
			.then(res => {setFAQs(res.data)});
	}, []);

	const FAQList = FAQs.map(item => {
		return(
			<div question={item.question} class="text-left">
				<h1>{item.question}</h1>
				{editable(item._id)}
				<div>
					<div dangerouslySetInnerHTML={{__html: md.render(item.answer)}}/>
				</div>
			</div>
			/*
			<Card ans={item.answer}>
				<Accordion.Toggle as={Card.Header} variant="link" eventKey={item._id}>
					<p class='btn-link mb-0'>
						{item.question}
					</p>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey={item._id}>
					<Card.Body>
						{editable(item._id)}
						<div class="text-left" dangerouslySetInnerHTML={{__html: md.render(item.answer)}}/>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
			*/
		)
	});

	return (
		<>
			<form >
				<input class="input-group input-group-text mb-3" type="text" placeholder="Search FAQs" onChange={updateQuery}/>
			</form>

			<div>
				{
					FAQList.filter(item => item.props.question.toLowerCase().includes(query))
				}
			</div>
		</>
	)
}

export default FAQs;