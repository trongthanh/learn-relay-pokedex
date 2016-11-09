import Relay from 'react-relay';

export default class AddPokemonMutation extends Relay.Mutation {

	static fragments = {
		viewer: () => Relay.QL`
			fragment on Viewer {
				id
			}
		`,
	}

	getMutation () {
		return Relay.QL`mutation{createPokemon}`;
	}

	getFatQuery () {
		return Relay.QL`
			fragment on CreatePokemonPayload {
				pokemon
				edge
				viewer
			}
		`;
	}

	getConfigs () {
		// return [{
		//   type: 'RANGE_ADD',
		//   parentName: 'viewer',
		//   parentID: this.props.viewer.id,
		//   connectionName: 'allPokemons',
		//   edgeName: 'edge',
		//   rangeBehaviors: {
		//     '': 'append',
		//   },
		// }]
		// return [{
		//   type: 'FIELDS_CHANGE',
		//   fieldIDs: {
		//     pokemon: '',
		//     viewer: this.props.viewer.id,
		//   },
		// }]

		return [{
			type: 'REQUIRED_CHILDREN',
			children: [
				Relay.QL`
					fragment on CreatePokemonPayload {
						pokemon {
							id,
							createdAt
						}
					}
				`,
			],
		}];
	}

	getVariables () {
		return {
			name: this.props.name,
			url: this.props.url,
		};
	}

	getOptimisticResponse () {
		return {
			pokemon: {
				id: 'saving...',
				name: this.props.name,
				url: this.props.url,
			},
		};
	}
}
