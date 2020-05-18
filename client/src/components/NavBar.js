import React, {useState} from 'react';
import logo from '../logo.svg';

const NavBar = (props) => {
	//menuItem should be the string of a navbar item
	const setActivePageHighlight = (menuItem) => {
		if (menuItem === props.page) {
			return "active"
		} else {
			return
		}
	}

	return (
		<div class="container-fluid navbar navbar-expand-sm bg-dark navbar-dark">
			<div class="col-2">
				<h2 class="mb-0 site-logo">
					<a href="/">
						<img src={logo} alt="logo" height="55"/>
					</a>
				</h2>
			</div>
			<nav role="navigation">
				<ul class="navbar-nav">
					<li class={setActivePageHighlight("Home")}><a class="nav-link" href="/">Home</a></li>
					<li class={setActivePageHighlight("About")}><a class="nav-link" href="about">About</a></li>
				</ul>
			</nav>
		</div>
	);
}

export default NavBar;