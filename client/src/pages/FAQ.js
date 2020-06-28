import React, {useState} from 'react';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PageContents from '../components/PageContents';
import FAQs from '../components/FAQs';

const FAQ = () => {
	return (
		<div className="App">
			<div id="overlayer">
				<div className="loader">
					<div className="sr-only" role="status">
						<div className="spinner-border text-primary">
							<span>Loading...</span>
						</div>
					</div>
				</div>
			</div>

			<NavBar page="FAQ"/>

			<div>
				<h1 className="display-1 font-weight-bold">Frequently Asked Questions</h1>
				<PageContents page='faq'/>
			</div>

			<div class="container">
				<FAQs/>
			</div>

			<Footer/>

		</div>
	)
}

export default FAQ;
