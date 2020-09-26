import React, {useState, useEffect} from 'react';
import axios from 'axios';

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import ListFAQs from '../components/ListFAQs';
import Footer from '../components/Footer';

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

	useEffect(() => {
		axios.get(`http://localhost:3001/api/user/get_faq`)
			.then(res => {
				setFAQs(res.data)
			});
	}, []);

	return (
		<div className="App">

			<NavBar page='FAQ'/>	

			{
				!match.params['question'] ? 
					<>
						<PageContents page='faq'/>
						<ListFAQs/>
					</>
				:
					<>
						{
							FAQs.filter(q => q.question.includes(match.params['question'].replace(/_/g, " "))).map(q => {
								return (
									<div class="container text-left">
										<h1>{q.question}</h1>
										<div dangerouslySetInnerHTML={{ __html: md.render(q.answer) }}/>
									</div>
								);
							})
						}
					</>
			}

			<Footer/>
		</div>
	)
}

export default FAQ;
