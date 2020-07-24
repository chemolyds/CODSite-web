import React, {useState} from 'react';
import '../App.css';

import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';

const Home = () => {
	return (
		<div className="App">
			<NavBar page="About"/>

			<PageContents page="about"/>
			
		</div>
	)
}

export default Home;
