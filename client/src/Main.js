import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

//Pages
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';

const Main = () => {
	return (
		<BrowserRouter><Switch>
			<Route exact path='/' component={Home}/>

			<Route component={PageNotFound}/>
		</Switch></BrowserRouter>
	);
}

export default Main;