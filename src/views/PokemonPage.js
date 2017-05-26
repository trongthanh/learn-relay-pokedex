import React from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer, graphql } from 'react-relay';

import environment from '../relayEnvironment';
import PokemonCard from '../components/PokemonCard';
import classes from './PokemonPage.css';

class PokemonPage extends React.Component {
	static contextTypes = {
		router: PropTypes.object,
	}

	static propTypes = {
		viewer: PropTypes.object,
		relay: PropTypes.object,
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}

	constructor (props) {
		super(props);
		this.state = {
			id: 'loading...',
			name: '...',
			url: '',
		};
	}

	_onBack = () => {
		this.context.router.push('/');
	}

	_onEdit = () => {
		this.context.router.push('/edit/' + this.state.id);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.viewer && nextProps.viewer.Pokemon) {
			this.setState({
				id: nextProps.viewer.Pokemon.id,
				name: nextProps.viewer.Pokemon.name,
				url: nextProps.viewer.Pokemon.url,
			});
		}
	}

	render () {
		console.log('Pokemon Page', this.props);
		return (
			<div className={classes.root}>
				<QueryRenderer
					environment={environment}
					variables={{
						id: this.props.params.id
					}}

					query={graphql`
						query PokemonPageQuery($id: ID!) {
							viewer {
								Pokemon(id: $id) {
									...PokemonCard_pokemon
								}
							}
						}
					`}

					render={({ error, props }) => {
						if (error) {
							return <div>{error.message}</div>;
						} else if (props) {
							// always render wrapped component, based on viewer availability to decide loading status
							return this._body(props.viewer);
						}
						return <div className={classes.root}><div>Loading...</div></div>;
					}}
				/>
			</div>
		);
	}

	_queryRenderer

	_body(viewer) {
		return (
			<div className={classes.content}>
				<PokemonCard pokemon={viewer.Pokemon} />
				<div className={classes.buttonContainer}>

					<div className={classes.actionButtonContainer}>
						<div
							className={classes.button + ' ' + classes.cancelButton}
							onClick={this._onBack}
						>
							Back
							</div>
						<div
							className={classes.button + ' ' + classes.saveButton}
							onClick={this._onEdit}
						>
							Edit
							</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PokemonPage;
