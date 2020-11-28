import React, {useState, useEffect} from 'react';
import '../App.css';

//Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SubpageContents from '../components/Guides/SubpageContents'

const GuideSubpage = ({match, location}) => {
	return (
		<div className="App">
			<NavBar page="Guides"/>

			<SubpageContents guideID={match.params['guideID']} subpageID={match.params['subpageID']}/>

			<Footer/>
		</div>
	)
}

export default GuideSubpage;
