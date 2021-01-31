import React, {useState} from 'react';
import '../App.css';

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import Footer from '../components/Footer';
import ListCompetitions from '../components/Competitions/ListCompetitions';

const Competitions = () => {
	return (
		<div className="App">
			<NavBar page="Competitions"/>

			<PageContents page="Competitions"/>
			<ListCompetitions/>

			<Footer/>
		</div>
	)
}

export default Competitions;
