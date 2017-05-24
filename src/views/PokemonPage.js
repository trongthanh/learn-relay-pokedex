import React from 'react';
import Relay from 'react-relay/classic';
import PokemonCard from '../components/PokemonCard';
import classes from './PokemonPage.css';

class PokemonPage extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object,
	}

	static propTypes = {
		viewer: React.PropTypes.object,
		params: React.PropTypes.object,
	}

	constructor (props) {
		super(props);
		this.state = {
			id: this.props.viewer.Pokemon ? this.props.viewer.Pokemon.id : '',
			name: this.props.viewer.Pokemon ? this.props.viewer.Pokemon.name : '',
			url: this.props.viewer.Pokemon ? this.props.viewer.Pokemon.url : '',
		};
	}

	_onBack = () => {
		this.context.router.push('/');
	}

	_onEdit = () => {
		this.context.router.push('/edit/' + this.state.id);
	}

	render () {
		return (
			<div className={classes.root}>
				<div className={classes.content}>
					<PokemonCard
						id={this.state.id}
						name={this.state.name}
						url={this.state.url}
					/>
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
			</div>
		);
	}
}

export default Relay.createContainer(
	PokemonPage,
	{
		initialVariables: {
			id: null,
			pokemonExists: false,
		},
		prepareVariables: (prevVariables) => {
			// console.log('view id:', prevVariables.id)
			return Object.assign({}, prevVariables, {
				pokemonExists: prevVariables.id !== null,
			});
		},
		fragments: {
			viewer: () => Relay.QL`
				fragment on Viewer {
					id,
					Pokemon(id: $id) @include( if: $pokemonExists ) {
						id
						name
						url
					}
				}
			`,
		},
	},
);
