import { commitMutation, graphql } from 'react-relay';
import environment from '../relayEnvironment';

const mutation = graphql`
	mutation CreatePokemonMutation ($input: CreatePokemonInput!) {
		createPokemon(input: $input) {
			pokemon {
				id,
				name,
				url
			}
		}
	}
`;

const createPokemon = ({ input, onCompleted, onError }) => {
	const variables = {
		input
	};

	commitMutation(environment, {
		mutation,
		variables,
		onCompleted,
		onError,
	});

};

export default createPokemon;
