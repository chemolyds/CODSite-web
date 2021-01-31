import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import jwt from "jsonwebtoken";
import '../../App.css';

import {ArrowLeftIcon, TriangleLeftIcon} from '@primer/octicons-react';

//imports
import EditSubpage from './EditSubpage';

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

const SubpageContents = (props) => {
	const [subpage, setSubpage] = useState({});
	const [contents, setContents] = useState("");

	useEffect(() => {
		axios.get(`/api/competitions/get_subpage/${props.competitionsID}/${props.subpageID}`)
			.then(res => {
				setSubpage(res.data);
				//markdown-it requires string
				setContents(res.data.contents);
			})
	}, []);

	return (
		<>
			<div class="row">
				<Link to={`/competitions/${props.competitionsID}`} class="col-3">
					<p class="py-1"/>
					<button class="row btn px-1 py-1 mx-2">
						<ArrowLeftIcon size="medium"/>
						<span class="mx-1 h3">Back</span>
					</button>
				</Link>

				<div class="col"/>

				<div class="col-3"/>
			</div>

			<div class="container py-1">
				<div class="flex mx-2 px-2 mx-md-5 px-md-5 text-left">
					<div dangerouslySetInnerHTML={{ __html: md.render(contents) }}/>
				</div>
			</div>
		</>
	)

}

export default SubpageContents;