import React, {useState} from 'react';
import logo from '../usnco-server-icon.png';

const Footer = (props) => {
	const handleSubmitLogin = () => {
		localStorage.setItem("user_logged", true);
		window.location.reload(true);
	}

	const handleLogout = () => {
		localStorage.removeItem("user_logged");
		window.location.reload(true);
	}

	const buton = () => {
		if(localStorage.getItem("user_logged")) {
			return <button class="btn btn-primary" onClick={handleLogout}>Logout</button>
		} else {
			return <button class="btn btn-primary" onClick={handleSubmitLogin}>Login</button>
		}
	}

	return (
		<div class="container-fluid site-footer bg-dark sticky-bottom mt-5">
			<div class="row pt-4 pb-4">

				<div class="col-2">
					<h2 class="mb-0 site-logo">
						<a href="/">
							<img src={logo} alt="logo" height="55"/>
						</a>
					</h2>
				</div>

				<div class="pt-2">
					{buton()}
					
				</div>

			</div>
		</div>
	);
}

export default Footer;