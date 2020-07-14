import React, {useState} from 'react';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PageContents from '../components/PageContents';
import FAQs from '../components/FAQs';
import CreateFAQ from "../components/CreateFAQ";

const FAQ = () => {
	const editable = () => {
		if(localStorage.getItem("user_logged"))
			return <CreateFAQ/>
	}

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
				{editable()}
				<FAQs/>
			</div>

			<Footer/>

		</div>
	)
}

export default FAQ;
