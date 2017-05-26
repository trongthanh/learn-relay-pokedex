import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PokemonPreview from './PokemonPreview';
import AddNew from './AddNew';
import classes from './PokemonList.css';

const PokemonList = ({ data }) => (
	<div>
		<div className={classes.title}>
			{`There are ${data.edges.length} Pokemons in your pokedex`}
		</div>
		<div className={classes.container}>
			{data.edges.map((edge) => edge.node).map((pokemon) =>
				<PokemonPreview key={pokemon.id} pokemon={pokemon} />
			)
			}
			<AddNew />
		</div>
	</div>
);

export default createFragmentContainer(PokemonList,
	// tagged graphql without property name will default to 'data' props in wrapped component
	graphql`
		fragment PokemonList on PokemonConnection {
			edges {
				node {
					id
					...PokemonPreview_pokemon
				}
			}
		}
	`,
);
