import React from 'react';

import PropTypes from 'prop-types';
import { PokemonCard } from '../components/PokemonCard';
import classes from './PokemonPage.css';
import createPokemon from '../mutations/CreatePokemon';
import updatePokemon from '../mutations/UpdatePokemon';

class CreatePokemonPage extends React.Component {
	static contextTypes = {
		router: PropTypes.object,
	}

	state = {
		added: false,
		pokemon: {
			id: '',
			name: '',
			url: '',
		}
	};

	_addPokemon = () => {
		createPokemon({
			input: {
				clientMutationId: String(Date.now()),
				name: this.state.pokemon.name,
				url: this.state.pokemon.url,
			},
			onCompleted: (response) => {
				console.log('Create Success! Payload:', response);
				this.setState({ added: true, pokemon: response.createPokemon.pokemon });
			},
			onError: err => console.error(err),
		});
	}

	_editPokemon = () => {
		updatePokemon({
			input: {
				clientMutationId: String(Date.now()),
				id: this.state.pokemon.id,
				name: this.state.pokemon.name,
				url: this.state.pokemon.url,
			},
			onCompleted: (response) => {
				console.log('Update Success! Payload:', response);
				this.setState({ added: true, pokemon: response.updatePokemon.pokemon });
			},
			onError: err => console.error(err),
		});
	}

	_onCTA = () => {
		if (this.state.added) {
			this._editPokemon();
		} else {
			this._addPokemon();
		}
	}

	_onPokemonCardNameChange = (name) => {
		this.setState({
			pokemon: Object.assign({}, this.state.pokemon, {name})
		});
	}

	_onPokemonCardUrlChange = (url) => {
		// I'm carelessly alter current pokemon state
		this.setState({
			pokemon: Object.assign({}, this.state.pokemon, { url })
		});
	}

	render () {
		const pokemonAdded = !!this.state.added;

		return (
			<div className={classes.root}>
				<div className={classes.content}>
					<PokemonCard
						addNew
						pokemon={this.state.pokemon}
						onNameChange={this._onPokemonCardNameChange}
						onUrlChange={this._onPokemonCardUrlChange}
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

export default CreatePokemonPage;
