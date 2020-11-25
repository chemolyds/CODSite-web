import React, {useState} from 'react';
import '../App.css';

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import Footer from '../components/Footer';
import ListGuides from '../components/Guides/ListGuides';

const Guides = ({match, location}) => {
	return (
		<div className="App">
			<NavBar page="Guides"/>

			<p>{match.params['guide']}</p>

			<Footer/>
		</div>
	)
}

export default Guides;
