import React, {useState, useEffect} from 'react';
import axios from "axios";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

const AboutContents = (props) => {
	const [about, setAbout] = useState("");

	useEffect(() => {
		axios.get(`http://localhost:${process.env.PORT || 3001}/api/user/about`) 
			.then(res => {setAbout(res.data.contents)});
	}, []);

	return (
		<div dangerouslySetInnerHTML={{__html: md.render(about)}}/>
	)
}

export default AboutContents;