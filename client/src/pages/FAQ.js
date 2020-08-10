import React, {useState} from 'react';
import jwt from "jsonwebtoken";

import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import ListFAQs from '../components/ListFAQs';
import CreateFAQ from "../components/CreateFAQ";

const FAQ = () => {
	

	return (
		<div className="App">
			<NavBar page='FAQ'/>

			<PageContents page='faq'/>

			<ListFAQs/>

		</div>
	)
}

export default FAQ;
