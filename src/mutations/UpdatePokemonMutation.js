import Relay from 'react-relay';

export default class UpdatePokemonMutation extends Relay.Mutation {

	static fragments = {
		pokemon () {
			return Relay.QL`
				fragment on Pokemon {
					id
				}
			`;
		},
	}

	getMutation () {
		return Relay.QL`mutation{updatePokemon}`;
	}

	getFatQuery () {
		return Relay.QL`
		fragment on UpdatePokemonPayload {
			viewer {
				allPokemons
			}
			pokemon
		}
		`;
	}

	getConfigs () {
		return [{
			type: 'FIELDS_CHANGE',
			fieldIDs: {
				pokemon: this.props.pokemonId,
			},
		}];
	}

	getVariables () {
		return {
			id: this.props.pokemonId,
			name: this.props.name,
			url: this.props.url,
		};
	}

	getOptimisticResponse () {
		return {
			pokemon: {
				id: this.props.pokemonId,
				name: this.props.name,
				url: this.props.url,
			},
		};
	}
}

