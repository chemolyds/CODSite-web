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
					<li>Jerdan: Owner, Admin, Tech Team</li>
					<li>Fizz: Admin</li>
					<li>Apc: Senior Moderator</li>
					<li>Ayame: Senior Moderator</li>
					<li>Tsm: Staff</li>
				</ul>
			</div>
		</div>
	)
}

export default Home;
