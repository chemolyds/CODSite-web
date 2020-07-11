import React, {useState} from 'react';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PageContents from '../components/PageContents'

const Home = () => {
	return (
		<div className="App">
			<div id="overlayer">
				<div className="loader">
					<div className="sr-only" role="status">
						<div className="spinner-border text-primary">
							<span>Loading...</span>
						</div>
					</div>
				</div>
			</div>


			<NavBar page="Home"/>

			{/*
			<h1 className="display-1 font-weight-bold">Chemistry Olympiad-web</h1>
			<div class="container text-left">
				<p>Welcome to the website for the Chemistry Olympiad Discord Server!</p>
			</div>
			*/}
			<PageContents page="home"/>

			<Footer/>

		</div>
	)
}

export default Home;
