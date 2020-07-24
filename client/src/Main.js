import React from 'react';
import {Switch, Route} from 'react-router-dom';
import axios from "axios";

//Pages
import Home from './pages/Home';
import Problems from './pages/Problems';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
import FAQ from './pages/FAQ';

//the main axios thing will go here lol idk why
axios.defaults.headers.common['Authorization'] = localStorage.getItem("user_logged");

const Main = () => {
	return (
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route exact path='/problems' component={Problems}/>
			<Route exact path='/about' component={About}/>
			<Route exact path='/faq' component={FAQ}/>

			<Route exact path='/404' component={PageNotFound}/>
			<Route component={PageNotFound}/>
		</Switch>
	);
}

export default Main;