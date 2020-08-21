import React, {useState} from 'react';

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import Footer from '../components/Footer';
import ListResources from '../components/ListResources';

const Resources = () => {
	return (
		<div className="App">
			<NavBar page="Resources"/>

			<PageContents page="Resources"/>
			<ListResources/>

			<Footer/>
		</div>
	)
}

export default Resources;