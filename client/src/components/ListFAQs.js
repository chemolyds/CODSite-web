import React, {useState, useEffect} from 'react';
import axios from "axios";
import jwt from "jsonwebtoken";

//Components
import EditFAQ from "./EditFAQ";
import DeleteFAQ from "./DeleteFAQ";
import CreateFAQ from "./CreateFAQ";

//markdown-it
var md = require("markdown-it")({html: true, linkify: true, typographer: true})
	.use(require("markdown-it-abbr"))
	.use(require("markdown-it-align"))
	.use(require("markdown-it-container"))
	.use(require("markdown-it-deflist"))
	.use(require("markdown-it-emoji"))
	.use(require("markdown-it-footnote"))
	.use(require("markdown-it-ins"))
	.use(require("markdown-it-mark"))
	.use(require('markdown-it-sub'))
	.use(require("markdown-it-sup"));

const ListFAQs = (props) => {
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
				if (decoded) {
					isAdmin = decoded.user_info.isAdmin;
				}
			});
			if (isAdmin) {
				return <CreateFAQ/>
			}
		}
	}

	const editable = (item) => {
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
					<div>
						<EditFAQ FAQ={item} ID={item._id}/>
						<DeleteFAQ FAQ={item} ID={item._id}/>
					</div>
				)
			}
		}
	}

	useEffect(() => {
		axios.get(`/api/user/get_faq`) 
			.then(res => {setFAQs(res.data)});
	}, []);

	const FAQList = FAQs.map(item => {
		return(
			<div question={item.question} id={item.question.substring(0,32).replace(/ /g, "_")} class="text-left">
				<h1>{item.question}</h1>
				{editable(item)}
				<div>
					<div dangerouslySetInnerHTML={{ __html: md.render(item.answer) }}/>
				</div>
			</div>
		)
	});
	
	const QList = FAQs.map(item => {
		return(
			<div class="text-left">
			<a class="text-dark" href={`#${item.question.substring(0,32).replace(/ /g, "_")}`}>{item.question}</a>
			</div>
		)
	});

	return (
		<>
			<div class="container">
				<div class="row">
					<div class="col-3">
						{addable()}
					</div>
					<div class="col">
						<form >
							<input class="input-group input-group-text mb-3" type="text" placeholder="Search FAQs" onChange={updateQuery}/>
						</form>
					</div>
				</div>
				<div class="row">
					<div class="col-3">
						<h3>Navigation</h3>
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

export default ListFAQs;