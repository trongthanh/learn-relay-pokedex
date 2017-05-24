import React from 'react';
import Relay from 'react-relay/classic';
import PokemonCard from '../components/PokemonCard';
import DeletePokemonMutation from '../mutations/DeletePokemonMutation';
import UpdatePokemonMutation from '../mutations/UpdatePokemonMutation';
import deleteIcon from '../assets/delete.svg';
import classes from './PokemonPage.css';

class EditPokemonPage extends React.Component {
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

	_updatePokemon = () => {
		Relay.Store.commitUpdate(
			new UpdatePokemonMutation({name: this.state.name, url: this.state.url, pokemonId: this.props.viewer.Pokemon.id, pokemon: null}),
			{
				onSuccess: () => { console.log('Pokemon updated', this.props.viewer.Pokemon.id); },
				onFailure: (transaction) => console.log(transaction),
			},
		);
	}

	_deletePokemon = () => {
		Relay.Store.commitUpdate(
			new DeletePokemonMutation({pokemonId: this.props.params.id, viewerId: this.props.viewer.id}),
			{
				onSuccess: () => this.context.router.replace('/'),
				onFailure: (transaction) => console.log(transaction),
			},
		);
	}

	_goBack = () => {
		this.context.router.push('/');
	}

	render () {
		const shouldPreviewRendered = !!this.props.viewer.Pokemon;
		return (
			<div className={classes.root}>
				<div className={classes.content}>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						<PokemonCard
							id={this.state.id}
							name={this.state.name}
							url={this.state.url}
							onNameChange={(newName) => this.setState({name: newName})}
							onUrlChange={(newUrl) => this.setState({url: newUrl})}
						/>
						{
						shouldPreviewRendered &&
							<PokemonCard
								id={this.props.viewer.Pokemon.id}
								name={this.props.viewer.Pokemon.name}
								url={this.props.viewer.Pokemon.url}
							/>
						}
					</div>
					<div className={classes.buttonContainer}>
						<div>
							<img src={deleteIcon} className={classes.deleteIcon} onClick={this._deletePokemon} />
						</div>
						<div className={classes.actionButtonContainer}>
							<div
								className={classes.button + ' ' + classes.cancelButton}
								onClick={this._goBack}
							>
								Cancel
							</div>
							<div
								className={classes.button + ' ' + classes.saveButton}
								onClick={this._updatePokemon}
							>
								Save
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Relay.createContainer(
	EditPokemonPage,
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
					Pokemon(id: $id) @include( if: $pokemonExists ) {
						${UpdatePokemonMutation.getFragment('pokemon')}
						id,
						name,
						url
					}
				}
			`,
		},
	},
);
