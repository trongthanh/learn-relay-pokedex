import React from 'react';
import { QueryRenderer } from 'react-relay';
import environment from '../relayEnvironment';

/*
 * My attempt to implement a generic and reusable renderer for Relay's viewer query
 * It's suitable to place at the each route-based page
 *
 */
export default ({ component: Component, variables, query, children }) => {
	// note: Component tag name must be capitalized
	if (!Component) {
		throw new Error('component props for QueryViewer is', Component);
	}

	// using children as loading placeholder
	let loadingComponent = children;
	if (!loadingComponent) {
		loadingComponent = <Component loading />;
	}
	return (
		<QueryRenderer
			environment={environment}
			variables={variables || {}}
			query={query}

			render={({ error, props }) => {
				if (error) {
					return <div>{error.message}</div>;
				} else if (props) {
					return <Component viewer={props.viewer} />;
				}
				return loadingComponent;
			}}
		/>
	);
};


