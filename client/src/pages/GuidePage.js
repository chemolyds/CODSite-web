import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css';

import {ArrowLeftIcon, TriangleLeftIcon} from '@primer/octicons-react';

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import Footer from '../components/Footer';
import ListGuides from '../components/Guides/ListGuides';

//https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button

// markdown-it
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

const Guides = ({match, location}) => {
	const [header, setHeader] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		axios.get(`http://localhost:3001/api/guide/get_guide/${match.params['guide']}`)
			.then(res => {
				setHeader(res.data.header);
				setDescription(res.data.description);
			})
	}, []);

	return (
		<div className="App">
			<NavBar page="Guides"/>

			<div class="bg-light">
				<div class="row">
					<Link to="/guides" class="col-3">
						<p class="py-1"/>
						<button class="row btn px-1 py-1 mx-2">
							<ArrowLeftIcon size="medium"/>
							<span class="mx-1 h3">Back</span>
						</button>
					</Link>

					<div class="col">
						<h1 class="display-1">{header}</h1>
					</div>

					<div class="col-3"/>
				</div>

				<div class="container py-1">
					<div class="flex mx-5 px-5 text-left">
						<div dangerouslySetInnerHTML={{ __html: md.render(description) }}/>
					</div>
				</div>
			</div>

			<div class="container">
				<p class="py-1"/>

				<p>it's-a-me, placeholder text!</p>

			</div>
			
			<Footer/>
		</div>
	)
}

export default Guides;
