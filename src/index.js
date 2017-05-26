import React from 'react';
import ReactDOM from 'react-dom';
import PokemonPage from './views/PokemonPage';
import CreatePokemonPage from './views/CreatePokemonPage';
import EditPokemonPage from './views/EditPokemonPage';
import ListPage from './views/ListPage';
import { Router, Route, hashHistory } from 'react-router';
import './index.css';

ReactDOM.render(
	<Router history={hashHistory} >
		<Route path="/" component={ListPage}/>
		<Route path="/create" component={CreatePokemonPage}/>
		<Route path="/view/:id" component={PokemonPage}/>
		<Route path="/edit/:id" component={EditPokemonPage}/>
	</Router>
	, document.getElementById('root')
);
