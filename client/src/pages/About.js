import React, {useState} from 'react';
import '../App.css';

import NavBar from '../components/NavBar';


const Home = () => {
	return (
		<div className="App">
			<NavBar page="About"/>

			<h>About Page</h>
			<p>The website was made by Jerdan1980</p>
		</div>
	)
}

export default Home;