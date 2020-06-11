import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

//Pages
import Home from './pages/Home';
import Problems from './pages/Problems';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
import FAQ from './pages/FAQ';

const Main = () => {
	return (
		<BrowserRouter><Switch>
			<Route exact path='/' component={Home}/>
			<Route exact path='/problems' component={Problems}/>
			<Route exact path='/about' component={About}/>
			<Route exact path='/faq' component={FAQ}/>

			<Route component={PageNotFound}/>
		</Switch></BrowserRouter>
	);
}

export default Main;