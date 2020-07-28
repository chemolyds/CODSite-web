import React, {useState} from 'react';

//Components
import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import ListProblems from '../components/ListProblems';

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

			<PageContents page="Problems"/>

			<ListProblems/>

		</div>
	)
}

export default Home;