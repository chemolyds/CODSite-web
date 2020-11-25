import React, {useState} from 'react';
import '../App.css';

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import Footer from '../components/Footer';
import ListGuides from '../components/Guides/ListGuides';

const Guides = () => {
	return (
		<div className="App">
			<NavBar page="Guides"/>

			{/*<PageContents page="Guides"/>*/}
			<ListGuides/>

			<Footer/>
		</div>
	)
}

export default Guides;
