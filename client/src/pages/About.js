import React, {useState} from 'react';
import '../App.css';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PageContents from '../components/PageContents';

const Home = () => {
	return (
		<div className="App">
			<NavBar page="About"/>

			<PageContents page="about"/>

			<Footer/>

		</div>
	)
}

export default Home;
