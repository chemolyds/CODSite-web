import React, {useState, useEffect} from 'react';
import '../App.css';

//Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SubpageContents from '../components/Competitions/SubpageContents'

const CompetitionsSubpage = ({match, location}) => {
	return (
		<div className="App">
			<NavBar page="Competitions"/>

			<SubpageContents competitionsID={match.params['competitionsID']} subpageID={match.params['subpageID']}/>

			<Footer/>
		</div>
	)
}

export default CompetitionsSubpage;
