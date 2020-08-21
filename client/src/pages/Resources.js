import React, {useState} from 'react';

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import Footer from '../components/Footer';

const Resources = () => {
	return (
		<div className="App">
			<NavBar page="Resources"/>

			<PageContents page="Resources"/>

			<Footer/>
		</div>
	)
}

export default Resources;