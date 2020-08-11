import React, {useState} from 'react';
import '../App.css';

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import Footer from '../components/Footer';

const Guides = () => {
	return (
		<div className="App">
			<NavBar page="Guides"/>

			<PageContents page="Guides"/>
			
			<Footer page="home"/>
		</div>
	)
}

export default Guides;
