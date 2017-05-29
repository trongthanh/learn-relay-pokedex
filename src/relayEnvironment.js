import {
	Environment,
	Network,
	RecordSource,
	Store,
} from 'relay-runtime';

/*
 * Define a function that fetches the results of an operation (query/mutation/etc)
 * and returns its results as a Promise:
 *
 * @param {any} operation
 * @param {any} variables
 * @returns
 */
function fetchQuery(
	operation,
	variables,
	// cacheConfig,
	// uploadables,
) {
	return fetch('https://api.graph.cool/relay/v1/ciuijlu1701vq0160okn58dcr', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
			// Add authentication and other headers here
		},
		body: JSON.stringify({
			query: operation.text, // GraphQL text from input
			variables,
		}),
	}).then(response => {
		return response.json();
	});
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);

const source = new RecordSource();
const store = new Store(source);

export default new Environment({
	network,
	store,
});
