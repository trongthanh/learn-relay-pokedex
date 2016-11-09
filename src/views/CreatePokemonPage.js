import React from 'react';
import Relay from 'react-relay';
import PokemonCard from '../components/PokemonCard';
import CreatePokemonMutation from '../mutations/CreatePokemonMutation';
import classes from './PokemonPage.css';

class CreatePokemonPage extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object,
	}

	static propTypes = {
		viewer: React.PropTypes.object,
		relay: React.PropTypes.object.isRequired,
	}

	constructor (props) {
		super(props);
		this.state = {
			name: '',
			url: '',
			id: '',
		};
	}

	_addPokemon = () => {
		Relay.Store.commitUpdate(
			new CreatePokemonMutation({name: this.state.name, url: this.state.url, viewer: this.props.viewer}),
			{
				onSuccess: (response) => {
					console.log('Pokemon added', response);
					this.props.relay.setVariables({
						id: response.createPokemon.pokemon.id,
					});
				},
				onFailure: (transaction) => console.log(transaction),
			},
		);
	}

	_onCTA = () => {
		if (this.props.viewer.Pokemon) {
			// pokemon added and available in graph
			this.context.router.push('/');
		} else {
			this._addPokemon();
		}
	}

	render () {
		const pokemonAdded = !!this.props.viewer.Pokemon;

		return (
			<div className={classes.root}>
				<div className={classes.content}>
					<PokemonCard
						addNew
						id={this.state.id}
						name={this.state.name}
						url={this.state.url}
						onNameChange={(newName) => this.setState({name: newName})}
						onUrlChange={(newUrl) => this.setState({url: newUrl})}
					/>
					<div className={classes.buttonContainer}>
						<div className={classes.actionButtonContainer}>
							<div
								className={classes.button + ' ' + classes.cancelButton}
								onClick={() => this.context.router.push('/')}
							>
								{pokemonAdded ? 'Back' : 'Cancel'}
							</div>

							<div
								className={classes.button + ' ' + classes.saveButton}
								onClick={this._onCTA}
							>
								{pokemonAdded ? 'Edit' : 'Add'}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Relay.createContainer(
	CreatePokemonPage,
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
					id
					${CreatePokemonMutation.getFragment('viewer')}
					Pokemon(id: $id) @include( if: $pokemonExists ) {
						id
						name
						url
					}
				}
			`,
		},
	}
);
