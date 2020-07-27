import React, {useState, useEffect} from 'react';
import axios from "axios";
import jwt from "jsonwebtoken";
import EditFAQ from "./EditFAQ";
import DeleteFAQ from "./DeleteFAQ";
import CreateFAQ from "./CreateFAQ";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

const FAQs = (props) => {
	const [FAQs, setFAQs] = useState([]);
	const [query, setQuery] = useState("");

	const updateQuery = (event) => {
		setQuery(event.target.value.toLowerCase());
	}

	const addable = () => {
		const token = localStorage.getItem("user_logged");
		let isAdmin;
		if (token) {
			jwt.verify(token, "jerdan1980", function (err, decoded) {
				isAdmin = decoded.user_info.isAdmin;
			});
			if (isAdmin) {
				return <CreateFAQ/>
			}
		}
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
			<div question={item.question} id={item.question.substring(0,32)} class="text-left">
				<h1>{item.question}</h1>
				{editable(item._id)}
				<div>
					<div dangerouslySetInnerHTML={{__html: md.render(item.answer)}}/>
				</div>
			</div>
		)
	});
	
	const QList = FAQs.map(item => {
		return(
			<div class="text-left mb-2">
			<a href={`#${item.question.substring(0,32)}`}>{item.question}</a>
			</div>
		)
	});

	return (
		<>
			

			<div class="container">
				<div class="row">
					<div class="col-2">
						{addable()}
					</div>
					<div class="col">
						<form >
							<input class="input-group input-group-text mb-3" type="text" placeholder="Search FAQs" onChange={updateQuery}/>
						</form>
					</div>
				</div>
				<div class="row">
					<div class="col-2">
						{QList}
					</div>
					<div class="col">
						{FAQList.filter(item => item.props.question.toLowerCase().includes(query))}
					</div>
				</div>
			</div>
		</>
	)
}

export default FAQs;