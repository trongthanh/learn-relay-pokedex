import React from 'react';
import Relay from 'react-relay/classic';
import ReactDOM from 'react-dom';
import PokemonPage from './views/PokemonPage';
import CreatePokemonPage from './views/CreatePokemonPage';
import EditPokemonPage from './views/EditPokemonPage';
import ListPage from './views/ListPage';
import { Router, Route, hashHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import './index.css';

Relay.injectNetworkLayer(
	new Relay.DefaultNetworkLayer('https://api.graph.cool/relay/v1/ciuijlu1701vq0160okn58dcr')
);

const ViewerQueries = { viewer: () => Relay.QL`query { viewer }` };

ReactDOM.render(
	<Router
		forceFetch
		environment={Relay.Store}
		render={applyRouterMiddleware(useRelay)}
		history={hashHistory}
	>
		<Route path="/" component={ListPage} queries={ViewerQueries} />
		<Route path="/create" component={CreatePokemonPage} queries={ViewerQueries} />
		<Route path="/view/:id" component={PokemonPage} queries={ViewerQueries} />
		<Route path="/edit/:id" component={EditPokemonPage} queries={ViewerQueries} />
	</Router>
	, document.getElementById('root')
);
