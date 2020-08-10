import React, {useState} from 'react';

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';

const Home = () => {
	return (
		<div className="App">
			
			<NavBar page="Home"/>

			<PageContents page="home"/>

		</div>
	)
}

export default Home;
