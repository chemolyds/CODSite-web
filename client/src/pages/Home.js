import React, {useState} from 'react';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Home = () => {
	return (
		<div className="App">

			<NavBar page="Home"/>

			<div>
			<h1 className="display-1 font-weight-bold">Chemistry Olympiad-web</h1>
				<p>Welcome to the website for the Chemistry Olympiad Discord Server!</p>
			</div>

			<Footer/>

		</div>
	)
}

export default Home;
