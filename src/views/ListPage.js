import React from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer, graphql } from 'react-relay';

import environment from '../relayEnvironment';
import PokemonList from '../components/PokemonList';
import classes from './ListPage.css';

class ListPage extends React.Component {
	static propTypes = {
		viewer: PropTypes.object,
	}

	render () {
		return (
			<div className={classes.root}>
				<QueryRenderer
					environment={environment}
					variables={{}}
					query={graphql`
						query ListPageQuery {
							viewer {
								allPokemons(first: 100) {
									...PokemonList
								}
							}
						}
					`}

					render={({ error, props }) => {
						if (error) {
							return <div>{error.message}</div>;
						} else if (props) {
							// always render wrapped component, based on viewer availability to decide loading status
							return <PokemonList data={props.viewer.allPokemons} />;
						}
						return <div className={classes.root}><div>Loading...</div></div>;
					}}
				/>
			</div>
		);
	}
}

// export default createQueryViewer(ListPage);
export default ListPage;
