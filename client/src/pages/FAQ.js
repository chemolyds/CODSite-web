import React, {useState} from 'react';
import jwt from "jsonwebtoken";

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import ListFAQs from '../components/ListFAQs';
import Footer from '../components/Footer';

const FAQ = () => {
	

	return (
		<div className="App">
			<NavBar page='FAQ'/>

			<PageContents page='faq'/>
			<ListFAQs/>

			<Footer page="home"/>
		</div>
	)
}

export default FAQ;
