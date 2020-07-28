import React, {useState} from 'react';
import '../App.css';

import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';

const Guides = () => {
	return (
		<div className="App">
			<NavBar page="Guides"/>

			<PageContents page="Guides"/>
			
		</div>
	)
}

export default Guides;
