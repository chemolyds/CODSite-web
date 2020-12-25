import React, {useState} from 'react';
import '../App.css';

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import Footer from '../components/Footer';
import ListAbouts from '../components/Abouts/ListAbouts';

const About = () => {
	return (
		<div className="App">
			<NavBar page="About"/>

			<PageContents page="about"/>
			<ListAbouts/>

			<Footer/>
		</div>
	)
}

export default About;
