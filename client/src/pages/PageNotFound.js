import React from 'react';
import '../App.css';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const PageNotFound = () => {
	return (
		<div className="App">
			<NavBar page="PageNotFound"/>
			<p>404 Page Not Found</p>
			<Footer/>
		</div>
	);
}

export default PageNotFound;