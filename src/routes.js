import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Table from './pages/Table';
import JoinTable from './pages/JoinTable';

export default function Routes(){
	return(
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/jointable" exact component={JoinTable} />
				<Route path="/sessions" component={Table} />
			</Switch>
		</BrowserRouter>
	);
}