import React, {useState, useEffect} from 'react';
import axios from "axios";
import jwt from "jsonwebtoken";
import logo from '../usnco-server-icon.png';

const NavBar = (props) => {
	const [hidden, setHidden] = useState({});

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
			if (isAdmin) {
				//return EVERYTHING
				return (
					<>
						<li class={setActivePageHighlight("Home")}><a class="nav-link" href="/">Home</a></li>
						<li class={setActivePageHighlight("FAQ")}><a class="nav-link" href="/FAQ">FAQ</a></li>
						<li class={setActivePageHighlight("Problems")}><a class="nav-link" href="/problems">Problems</a></li>
						<li class={setActivePageHighlight("NAP")}><a class="nav-link" href="/nap">NAP</a></li>
						<li class={setActivePageHighlight("Guides")}><a class="nav-link" href="/guides">Guides</a></li>
						<li class={setActivePageHighlight("About")}><a class="nav-link" href="/about">About</a></li>
					</>
				);
			}
		}
		//else not logged in or admin
		return (
			<>
				{!hidden["home"] ? <li class={setActivePageHighlight("Home")}><a class="nav-link" href="/">Home</a></li> : <></>}
				{!hidden["faq"] ? <li class={setActivePageHighlight("FAQ")}><a class="nav-link" href="/FAQ">FAQ</a></li> : <></>}
				{!hidden["Problems"] ? <li class={setActivePageHighlight("Problems")}><a class="nav-link" href="/problems">Problems</a></li> : <></>}
				{!hidden["nap"] ? <li class={setActivePageHighlight("NAP")}><a class="nav-link" href="/nap">NAP</a></li> : <></>}
				{!hidden["Guides"] ? <li class={setActivePageHighlight("Guides")}><a class="nav-link" href="/guides">Guides</a></li> : <></>}
				{!hidden["about"] ? <li class={setActivePageHighlight("About")}><a class="nav-link" href="/about">About</a></li> : <></>}
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
					{viewable()}
				</ul>
			</nav>
		</div>
	);
}

export default NavBar;