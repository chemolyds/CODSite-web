import React, {useState} from 'react';
import '../App.css';

import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';

const NAP = () => {
	return (
		<div className="App">
			<NavBar page="NAP"/>

			<PageContents page="nap"/>
			
		</div>
	)
}

export default NAP;
