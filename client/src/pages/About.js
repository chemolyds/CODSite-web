import React, {useState} from 'react';
import '../App.css';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PageContents from '../components/PageContents';

const Home = () => {
	return (
		<div className="App">
			<NavBar page="About"/>

			<h1 class="display-1 font-weight-bold">About Page</h1>
			<div class="container text-left">
				<PageContents page="about"/>
			</div>

			<Footer/>

		</div>
	)
}

export default Home;
