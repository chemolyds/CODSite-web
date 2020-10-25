import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt from "jsonwebtoken";

//General Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import ListFAQs from '../components/ListFAQs';
import Footer from '../components/Footer';

//FAQ Components
import CreateFAQ from '../components/CreateFAQ';
import EditFAQ from '../components/EditFAQ';
import DeleteFAQ from '../components/DeleteFAQ';

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

const FAQ = ({match, location}) => {
	const [FAQs, setFAQs] = useState([]);
	//const [quest, setQuest] = useState(match.params['question']);

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
			.then(res => {
				setFAQs(res.data)
			});
	}, []);

	const FAQList = FAQs.map(item => {
		return(
			<div question={item.question} id={item.question.substring(0,32).replace(/ /g, "_")} class="text-left pb-4 mb-4">
				<h1>{item.question}</h1>
				{editable(item)}
				<div>
					<div dangerouslySetInnerHTML={{ __html: md.render(item.answer.substring(0, 256) + "...") }}/>
					<a class="link-primary" href={`/FAQ/${item.question.substring(0,32).replace(/ /g, "_")}`}>Read More</a>
				</div>
			</div>
		)
	});
	
	const QList = FAQs.map(item => {
		return(
			<div class="text-left">
			<a class="text-dark" href={`/FAQ/${item.question.substring(0,32).replace(/ /g, "_")}`}>{item.question}</a>
			</div>
		)
	});

	return (
		<div className="App">

			<NavBar page='FAQ'/>	
			
			<PageContents page="faq"/>

			{/*<ListFAQs question={quest}/>*/}
			<div class="container">
				<div class="row">
					<div class="col-3">
						{addable()}
					</div>
					<div class="col">
						{
							!match.params['question'] ?
								<></>
							:
								<h1><a class="link-primary" href="/FAQ">Back to home</a></h1>
						}
					</div>
				</div>

				<div class="row">
					<div class="col-3">
						<h3>Navigation</h3>
						{QList}
					</div>
					<div class="col">
						{
						!match.params['question'] ? 
							FAQList
						:
							<>
								{
									FAQs.filter(q => q.question.includes(match.params['question'].replace(/_/g, " "))).map(q => {
										return (
											<div class="container text-left">
												<h1>{q.question}</h1>
												{editable(q)}
												<div dangerouslySetInnerHTML={{ __html: md.render(q.answer) }}/>
											</div>
										);
									})
								}
							</>
						}
					</div>
				</div>
			</div>

			<Footer/>

		</div>
	)
}

export default FAQ;
