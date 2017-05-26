import { commitMutation, graphql } from 'react-relay';
import environment from '../relayEnvironment';

const mutation = graphql`
	mutation UpdatePokemonMutation ($input: UpdatePokemonInput!) {
		updatePokemon(input: $input) {
			pokemon {
				id,
				name,
				url
			}
		}
	}
`;

const updatePokemon = ({ input, onCompleted, onError }) => {
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

export default updatePokemon;
