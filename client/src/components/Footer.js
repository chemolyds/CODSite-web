import React, {useState} from 'react';
import logo from '../usnco-server-icon.png';

const Footer = (props) => {

	return (
		<div class="container-fluid site-footer bg-dark fixed-bottom">
			<div class="row pt-4 pb-4">
				<div class="col-2">
					<h2 class="mb-0 site-logo">
						<a href="/">
							<img src={logo} alt="logo" height="55"/>
						</a>
					</h2>
				</div>
				<div class="align-middle">
					<button>Login</button>
				</div>
			</div>
		</div>
	);
}

export default Footer;