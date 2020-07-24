import React, {useState, useEffect} from 'react';
import axios from "axios";
import jwt from 'jsonwebtoken';
import EditPageContents from "./EditPageContents";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

const PageContents = (props) => {
	const [header, setHeader] = useState(props.page);
	const [contents, setContents] = useState("Please hold on...");
	
	const editable = () => {
		const token = localStorage.getItem("user_logged");
		let isAdmin;
		if (token) {
			jwt.verify(token, "jerdan1980", function (err, decoded) {
				isAdmin = decoded.user_info.isAdmin;
			});
			if (isAdmin) {
				return <EditPageContents page={props.page}/>
			}
		}
	}

	useEffect(() => {
		axios.get(`/api/user/get_page/${props.page}`) 
			.then(res => {
				setHeader(res.data.header);
				setContents(res.data.contents);
			});
	}, []);

	return (
		<div>
			{editable()}

			<h1 class="display-1 font-weight-bold">{header}</h1>
			<p class="py-1"/>
			<div class="container text-left" dangerouslySetInnerHTML={{__html: md.render(contents)}}/>
		</div>
	)
}

export default PageContents;