import React, {useState} from 'react';
import jwt from "jsonwebtoken";

import NavBar from '../components/NavBar';
import PageContents from '../components/PageContents';
import FAQs from '../components/FAQs';
import CreateFAQ from "../components/CreateFAQ";

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

			<NavBar page='FAQ'/>

			<PageContents page='faq'/>

			<div class="container">
				<FAQs/>
			</div>

		</div>
	)
}

export default FAQ;
