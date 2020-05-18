import React, {useState} from 'react';
import '../App.css';

import NavBar from '../components/NavBar';


const Home = () => {
	return (
		<div className="App">
			<NavBar page="About"/>

			<h1 class="display-1 font-weight-bold">About Page</h1>
			<div class="container text-left">
			<h2>Staff</h2>
				<ul class="text-left">
					<li>Fizz: Admin</li>
					<li>Jerdan: Admin, tech team</li>
					<li>Apc: Senior Moderator</li>
					<li>Ayame: Moderator</li>
					<li>Tsm: Helper</li>
				</ul>
			</div>
		</div>
	)
}

export default Home;