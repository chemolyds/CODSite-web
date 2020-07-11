import React, {useState, useEffect} from 'react';
import axios from "axios";

//images
import pencil from "../../node_modules/bootstrap-icons/icons/pencil.svg";

import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

const PageContents = (props) => {
	const [header, setHeader] = useState(props.page);
	const [contents, setContents] = useState("Please hold on...");

	useEffect(() => {
		axios.get(`http://localhost:3001/api/user/get_page/${props.page}`) 
			.then(res => {
				setHeader(res.data.header);
				setContents(res.data.contents);
			});
	}, []);

	return (
		<div>
			<div class="container stick-top mt-1 btn-link">
				<img src={pencil} alt="edit button" width="32" height="32"/>
				<a>Edit Page</a>
			</div>
			<h1 class="display-1 font-weight-bold">{header}</h1>
			<p class="py-1"/>
			<div class="container text-left" dangerouslySetInnerHTML={{__html: md.render(contents)}}/>
		</div>
	)
}

export default PageContents;