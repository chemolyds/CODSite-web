import React, {useState, useEffect} from 'react';
import axios from "axios";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

const HomeContents = (props) => {
	const [home, setHome] = useState("Please hold on...");

	useEffect(() => {
		axios.get(`/api/user/get_page/home`) 
			.then(res => {setHome(res.data.contents)});
	}, []);

	return (
		<div dangerouslySetInnerHTML={{__html: md.render(home)}}/>
	)
}

export default HomeContents;