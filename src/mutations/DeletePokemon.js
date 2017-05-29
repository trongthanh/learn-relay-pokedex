import { commitMutation, graphql } from 'react-relay';
import environment from '../relayEnvironment';

const mutation = graphql`
	mutation DeletePokemonMutation ($input: DeletePokemonInput!) {
		deletePokemon(input: $input) {
			deletedId
		}
	}
`;

const deletePokemon = ({ input, onCompleted, onError }) => {
	// TODO: should validate the input here
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

export default deletePokemon;
