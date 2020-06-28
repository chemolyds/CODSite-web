import React, {useState, useEffect} from 'react';
import axios from "axios";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

const PageContents = (props) => {
	const [page, setPage] = useState("Please hold on...");

	useEffect(() => {
		axios.get(`http://localhost:3001/api/user/get_page/${props.page}`) 
			.then(res => {setPage(res.data.contents)});
	}, []);

	return (
		<div dangerouslySetInnerHTML={{__html: md.render(page)}}/>
	)
}

export default PageContents;