import React, {useState, useEffect} from 'react';
import ReactMarkdown from "react-markdown/with-html";
import axios from "axios";
import jwt from "jsonwebtoken";
import EditFAQ from "./EditFAQ";
import DeleteFAQ from "./DeleteFAQ";
import CreateFAQ from "./CreateFAQ";

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
		axios.get(`/api/user/get_faq`) 
			.then(res => {setFAQs(res.data)});
	}, []);

	const FAQList = FAQs.map(item => {
		return(
			<div question={item.question} id={item.question.substring(0,32).replace(/ /g, "_")} class="text-left">
				<h1>{item.question}</h1>
				{editable(item._id)}
				<div>
					<ReactMarkdown source={item.answer} escapeHtml={false}/>
				</div>
			</div>
		)
	});
	
	const QList = FAQs.map(item => {
		return(
			<div class="text-left my-2">
			<a class="text-white" href={`#${item.question.substring(0,32).replace(/ /g, "_")}`}>{item.question}</a>
			</div>
		)
	});

	return (
		<>
			

			<div class="flex mx-4">
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
					<div class="col-3 bg-secondary">
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