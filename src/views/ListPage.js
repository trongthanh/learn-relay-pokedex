import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';

import PokemonList from '../components/PokemonList';
import classes from './ListPage.css';
import QueryViewer from './QueryViewer';


class ListPage extends React.Component {
	static propTypes = {
		viewer: PropTypes.object,
	}

	render() {
		return (
			<div className={classes.root}>
				<PokemonList data={this.props.viewer.allPokemons} />
			</div>
		);
	}
}


export default class ListPageViewer extends React.Component {

	static query = graphql`
		query ListPageQuery {
			viewer {
				allPokemons(first: 100) {
					...PokemonList
				}
			}
		}
	`

	render () {
		return (
			<QueryViewer
				query={ListPageViewer.query}
				component={ListPage}
			>
				<div className={classes.root}>
					<div className={classes.middle}>Go grabbing some pokemons...</div>
				</div>
			</QueryViewer>
		);
	}
}

