import React, {useState, useEffect} from 'react';
import axios from "axios";
import jwt from "jsonwebtoken";
import logo from '../resources/cods_logo_white.png';

const NavBar = (props) => {
	const [hidden, setHidden] = useState({});
	const [showNavbar, setNavbar] = useState(false);

	//menuItem should be the string of a navbar item
	const setActivePageHighlight = (menuItem) => {
		if (menuItem === props.page) {
			return "active"
		} else {
			return
		}
	}

	const viewable = () => {
		const token = localStorage.getItem("user_logged");
		let isAdmin;
		if (token) {
			jwt.verify(token, "jerdan1980", function (err, decoded) {
				if (decoded) {
					isAdmin = decoded.user_info.isAdmin;
				}
			});
		}
		//else not logged in or admin
		return (
			<>
				{(isAdmin || !hidden["home"]) ? <li class={setActivePageHighlight("Home")}><a class="nav-link" href="/">Home</a></li> : <></>}
				{(isAdmin || !hidden["faq"]) ? <li class={setActivePageHighlight("FAQ")}><a class="nav-link" href="/FAQ">FAQ</a></li> : <></>}
				{(isAdmin || !hidden["Problems"]) ? <li class={setActivePageHighlight("Problems")}><a class="nav-link" href="/problems">Problems</a></li> : <></>}
				{(isAdmin || !hidden["nap"]) ? <li class={setActivePageHighlight("NAP")}><a class="nav-link" href="/notes">Notes</a></li> : <></>}
				{(isAdmin || !hidden["Guides"]) ? <li class={setActivePageHighlight("Guides")}><a class="nav-link" href="/guides">Guides</a></li> : <></>}
				{(isAdmin || !hidden["Resources"]) ? <li class={setActivePageHighlight("Resources")}><a class="nav-link" href="/resources">Resources</a></li> : <></>}
				{(isAdmin || !hidden["competitions"]) ? <li class={setActivePageHighlight("Competitions")}><a class="nav-link" href="/competitions">Competitions</a></li> : <></>}
				{(isAdmin || !hidden["about"]) ? <li class={setActivePageHighlight("About")}><a class="nav-link" href="/about">About</a></li> : <></>}
			</>
		)
	}

	useEffect(() => {
		let map = {};
		axios.get(`/api/user/get_page`) 
			.then(res => {
				let item;
				for (item of res.data) {
					map[item.page] = item.hidden;
				};
				console.log(map);
				setHidden(map);
		});
	}, []);

	const toggleNavbar = () => {
		setNavbar(!showNavbar);
	};

	return (
		<>
			<div class="d-none d-md-flex container-fluid navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
				<div class="col-2">
					<h2 class="mb-0 site-logo">
						<a href="/">
							<img src={logo} alt="logo" height="55"/>
						</a>
					</h2>
				</div>
				<nav role="navigation">
					<ul class="navbar-nav">
						{viewable()}
					</ul>
				</nav>
			</div>

			<div class="d-flex d-md-none container-fluid navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
				<button class="navbar-toggler" type="button" onClick={toggleNavbar}>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="col">
					<h2 class="mb-0 site-logo">
						<a href="/">
							<img src={logo} alt="logo" height="55"/>
						</a>
					</h2>
				</div>

				<div class={(!showNavbar ? "collapse" : "") + " navbar-collapse"} id="navbarContents" show={false}>
					<ul class="navbar-nav me-auto mt-2 mt-lg-0">
						{viewable()}
					</ul>
				</div>
			</div>
		</>
	);
}

export default NavBar;