import React, {useState} from 'react';
import '../App.css';

import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import Footer from '../components/Footer';

const About = () => {
	return (
		<div className="App">
			<NavBar page="About"/>

			<PageContents page="about"/>
			
			<Footer/>
		</div>
	)
}

export default About;
