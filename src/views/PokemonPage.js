import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { Link } from 'react-router';

import { PokemonCardRelay as PokemonCard } from '../components/PokemonCard';
import classes from './PokemonPage.css';
import QueryViewer from './QueryViewer';

class PokemonPage extends React.Component {
	static contextTypes = {
		router: PropTypes.object,
	}

	static propTypes = {
		viewer: PropTypes.object,
		loading: PropTypes.bool,
		relay: PropTypes.object,
	}

	_onBack = () => {
		this.context.router.push('/');
	}

	_onEdit = () => {
		this.context.router.push('/edit/' + this.props.viewer.Pokemon.id);
	}

	render () {
		console.log('Pokemon Page', this.props);
		return (
			<div className={classes.root}>
				<div className={classes.content}>
					{this.props.viewer && <PokemonCard pokemon={this.props.viewer.Pokemon} />}
					{this.props.loading && <div>Catching a pokemon...</div> }

					<div className={classes.buttonContainer}>
						<div className={classes.actionButtonContainer}>
							<Link
								className={classes.button + ' ' + classes.cancelButton}
								to="/"
							>
								Back
							</Link>
						{this.props.viewer &&
							<Link
								className={classes.button + ' ' + classes.saveButton}
								to={`/edit/${this.props.viewer.Pokemon.id}`}
							>
								Edit
							</Link>
						}
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default class PokemonPageViewer extends React.Component {
	static propTypes = {
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}

	static query = graphql`
		query PokemonPageQuery($id: ID!) {
			viewer {
				Pokemon(id: $id) {
					id,
					...PokemonCard_pokemon
				}
			}
		}
	`

	render() {
		return (
			<QueryViewer
				variables={{
					id: this.props.params.id,
				}}
				query={PokemonPageViewer.query}
				component={PokemonPage}
			>
				<PokemonPage loading />
			</QueryViewer>
		);
	}
}




