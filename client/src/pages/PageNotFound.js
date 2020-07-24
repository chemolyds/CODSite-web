import React from 'react';
import '../App.css';

import NavBar from '../components/NavBar';

const PageNotFound = () => {
	return (
		<div className="App">
			<NavBar page="PageNotFound"/>
			<p>404 Page Not Found</p>
		</div>
	);
}

export default PageNotFound;