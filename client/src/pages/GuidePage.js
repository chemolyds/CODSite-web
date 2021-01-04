import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import jwt from "jsonwebtoken";
import {Card, CardColumns} from 'react-bootstrap';
import '../App.css';

import {ArrowLeftIcon, TriangleLeftIcon} from '@primer/octicons-react';

//Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CreateSubpage from '../components/Guides/CreateSubpage';
import DeleteSubpage from '../components/Guides/DeleteSubpage';
import EditSubpage from '../components/Guides/EditSubpage';

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

const GuidePage = ({match, location}) => {
	const [guide, setGuide] = useState({});
	const [description, setDescription] = useState("");
	const [subpages, setSubpages] = useState([]);

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
				return (
					<Card>
						<Card.Title class="h3 pt-4 mb-0 pb-0">Settings</Card.Title>
						<Card.Body>
							<div class="btn-group">
								<CreateSubpage GuideID={match.params['guide']}/>
							</div>
						</Card.Body>
					</Card>
				)
			}
		}
	}

	const editable = (subpage) => {
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
					<div class="btn-group">
						<EditSubpage guideID={match.params['guide']} subpage={subpage}/>
						<DeleteSubpage guideID={match.params['guide']} subpage={subpage}/>
					</div>
				)
			}
		}
	}

	useEffect(() => {
		axios.get(`/api/guide/get_guide/${match.params['guide']}`)
			.then(res => {
				setGuide(res.data);
				//for some reason guide.description =/= description
				setDescription(res.data.description);
				setSubpages(res.data.subpages);
			})
	}, []);

	const SubpageList = subpages.map(subpage => {
		return(
			<Card key={subpage._id}>
				<Card.Img variant="top" src={subpage.thumbnail}/>
				<Card.Title class="h3 pt-2">{subpage.url}</Card.Title>
				<Card.Body>
					<p>{subpage.header}</p>
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group">
							<Link to={`${match.params['guide']}/${subpage._id}`}>
								<button type="button" class="btn btn-sm btn-outline-secondary">View</button>
							</Link>
							{editable(subpage)}
						</div>
					</div>
				</Card.Body>
			</Card>
		)
	});

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
						{/*<h1 class="display-1">{guide.header}</h1>*/}
					</div>

					<div class="col-3"/>
				</div>

				<div class="container py-1">
					<div class="flex mx-2 px-2 mx-md-5 px-md-5 text-left">
						<div dangerouslySetInnerHTML={{ __html: md.render(description) }}/>
					</div>
				</div>
			</div>
			
			<div class="container">
				<p class="py-1"/>	
				<CardColumns>
					{SubpageList}
					{addable()}
				</CardColumns>
			</div>
			
			<Footer/>
		</div>
	)
}

export default GuidePage;
