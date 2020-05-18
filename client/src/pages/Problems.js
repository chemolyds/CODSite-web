import React, {useState} from 'react';

import NavBar from '../components/NavBar';

const Home = () => {
	return (
		<div className="App">
			<div class="overlayer">
					<div class="sr-only" role="status">
						<div class="spinner-border text-primary">
							<span>Loading...</span>
						</div>
					</div>
				</div>

			<NavBar page="Problems"/>

			<div>
				<h1 class="display-1 font-weight-bold">Problem collections</h1>
				<p class="text-monospace">Problems would go here if IF I HAD ANY</p>
			</div>
		</div>
	)
}

export default Home;