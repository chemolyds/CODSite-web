import React from 'react';
import '../App.css';

import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';

const PageNotFound = () => {
	return (
		<div className="App">

			<NavBar page="PageNotFound"/>

			<PageContents page="PageNotFound"/>

		</div>
	);
}

export default PageNotFound;