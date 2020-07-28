import React, {useState} from 'react';
import logo from '../usnco-server-icon.png';
import LoginHandler from './LoginHandler';

const NavBar = (props) => {
	//menuItem should be the string of a navbar item
	const setActivePageHighlight = (menuItem) => {
		if (menuItem === props.page) {
			return "active"
		} else {
			return
		}
	}

	//handles how to present the login/logout buttons
	const logged = () => {
		if(localStorage.getItem("user_logged")) {
			return <a onClick={handleLogout}>Logout</a>
		} else {
			return <LoginHandler/>
		}
	}

	const handleLogout = () => {
		localStorage.removeItem("user_logged");
		window.location.reload(true);
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
					<li class={setActivePageHighlight("FAQ")}><a class="nav-link" href="/FAQ">FAQ</a></li>
					<li class={setActivePageHighlight("Problems")}><a class="nav-link" href="/problems">Problems</a></li>
					<li class={setActivePageHighlight("Guides")}><a class="nav-link" href="/guides">Guides</a></li>
					<li class={setActivePageHighlight("About")}><a class="nav-link" href="/about">About</a></li>
					<li class="nav-link">{logged()}</li>
				</ul>
			</nav>
		</div>
	);
}

export default NavBar;