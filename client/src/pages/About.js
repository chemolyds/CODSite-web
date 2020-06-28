import React, {useState} from 'react';
import '../App.css';

import NavBar from '../components/NavBar';
import AboutContents from '../components/AboutContents';
import Footer from '../components/Footer';

const Home = () => {
	return (
		<div className="App">
			<NavBar page="About"/>

			<h1 class="display-1 font-weight-bold">About Page</h1>
			<div class="container text-left">
				<AboutContents/>
			</div>

			<Footer/>

		</div>
	)
}

export default Home;
