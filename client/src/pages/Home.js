import React, {useState} from 'react';

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import Footer from '../components/Footer';

const Home = () => {
	return (
		<div className="App">
			
			<NavBar page="Home"/>

			<PageContents page="home"/>

			<Footer page="home"/>
		</div>
	)
}

export default Home;
