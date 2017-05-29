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

	const optimisticResponse = () => ({
		updatePokemon: {
			pokemon: {
				id: input.id,
				name: input.name,
				url: input.url,
			}
		}
	});

	commitMutation(environment, {
		mutation,
		variables,
		onCompleted,
		optimisticResponse,
		onError,
	});

};

export default updatePokemon;
