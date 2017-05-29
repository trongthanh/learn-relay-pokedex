import React from 'react';
import PropTypes from 'prop-types';

import { PokemonCard } from '../components/PokemonCard';
import classes from './PokemonPage.css';
import createPokemon from '../mutations/CreatePokemon';
import updatePokemon from '../mutations/UpdatePokemon';
import deletePokemon from '../mutations/DeletePokemon';
import deleteIcon from '../assets/delete.svg';

class CreatePokemonPage extends React.Component {
	static contextTypes = {
		router: PropTypes.object,
	}

	static propTypes = {
		pokemon: PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			url: PropTypes.string,
		})
	}

	state = {
		added: !!this.props.pokemon,
		pokemon: {
			id: this.props.pokemon ? this.props.pokemon.id : '',
			name: this.props.pokemon ? this.props.pokemon.name : '',
			url: this.props.pokemon ? this.props.pokemon.url : '',
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
				// this.setState({ added: true, pokemon: response.createPokemon.pokemon });
				// navigate to edit page for a consistent workflow (although it is possible to enable editing in here)
				this.context.router.push('/edit/' + response.createPokemon.pokemon.id);
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

	_deletePokemon = () => {
		deletePokemon({
			input: {
				clientMutationId: String(Date.now()),
				id: this.state.pokemon.id,
			},
			onCompleted: (response) => {
				console.log('Update Success! Payload:', response);
				this.context.router.push('/');
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
		console.log('CreatePokemonPage Rerender', this.props, this.state);
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
						<a onClick={this._deletePokemon} className={classes.deleteIcon}>
							<img src={deleteIcon} />
						</a>

						<div className={classes.actionButtonContainer}>
							<a
								className={classes.button + ' ' + classes.cancelButton}
								onClick={() => this.context.router.push('/')}
							>
								{pokemonAdded ? 'Back' : 'Cancel'}
							</a>

							<a
								className={classes.button + ' ' + classes.saveButton}
								onClick={this._onCTA}
							>
								{pokemonAdded ? 'Save' : 'Add'}
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CreatePokemonPage;
