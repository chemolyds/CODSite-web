import React from 'react';
import '../App.css';

import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import Footer from '../components/Footer';

const PageNotFound = () => {
	return (
		<div className="App">
			<NavBar page="PageNotFound"/>

			<PageContents page="PageNotFound"/>

			<Footer page="home"/>
		</div>
	);
}

export default PageNotFound;