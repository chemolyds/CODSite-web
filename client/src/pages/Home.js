import React, {useState} from 'react';

import NavBar from '../components/NavBar';

const Home = () => {
	return (
		<div className="App">

			<NavBar page="Home"/>

			<div>
			<h1 className="display-1 font-weight-bold">USNCO-web</h1>
				<p>Welcome to the website for the USNCO discord server!</p>
			</div>
		</div>
	)
}

export default Home;