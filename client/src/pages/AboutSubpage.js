import React, {useState, useEffect} from 'react';
import '../App.css';

//Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SubpageContents from '../components/Abouts/SubpageContents'

const AboutSubpage = ({match, location}) => {
	return (
		<div className="App">
			<NavBar page="About"/>

			<SubpageContents aboutID={match.params['aboutID']} subpageID={match.params['subpageID']}/>

			<Footer/>
		</div>
	)
}

export default AboutSubpage;
