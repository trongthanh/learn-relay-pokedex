import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

import CreatePokemonPage from './CreatePokemonPage';
import QueryViewer from './QueryViewer';

const PokemonEditContainer = createFragmentContainer(CreatePokemonPage, {
	pokemon: graphql`
		fragment EditPokemonPage_pokemon on Pokemon {
			id,
			name,
			url,
		}
	`
});

const EditPokemonViewer = ({viewer}) => {
	return (
		<PokemonEditContainer pokemon={viewer.Pokemon} />
	);
};

export default class EditPokemonPage extends React.Component {
	static propTypes = {
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}

	static query = graphql`
		query EditPokemonPageQuery($id: ID!) {
			viewer {
				Pokemon(id: $id) {
					...EditPokemonPage_pokemon
				}
			}
		}
	`

	render() {
		return (
			<QueryViewer
				variables={{
					id: this.props.params.id,
				}}
				query={EditPokemonPage.query}
				component={EditPokemonViewer}
			>
				<div>loading</div>
			</QueryViewer>
		);
	}
}






