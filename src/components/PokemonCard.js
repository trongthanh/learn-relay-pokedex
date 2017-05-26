import React from 'react';
import PropTypes from 'prop-types';
import classes from './PokemonCard.css';
import { createFragmentContainer, graphql } from 'react-relay';

export class PokemonCard extends React.Component {

	static propTypes = {
		addNew: PropTypes.bool,
		pokemon: PropTypes.shape({
			id: PropTypes.string,
			url: PropTypes.string,
			name: PropTypes.string,
		}),
		onNameChange: PropTypes.func,
		onUrlChange: PropTypes.func,
	}

	_inputUpdate = (e) => {
		// console.log('inputupdate', e.target.name, e.target.value);
		if (e.target.name === 'name') {
			this.props.onNameChange(e.target.value);
		} else if (e.target.name === 'url') {
			this.props.onUrlChange(e.target.value);
		}
	}

	render () {
		const editable = !!this.props.onNameChange;

		return (
			<div className={classes.root}>
				<div className={classes.header + ' ' + (this.props.addNew ? classes.newHeader : '')}>
					<div className={classes.title + ' ' + (this.props.addNew ? classes.newTitle : '')}>
						NAME
					</div>
					<input
						className={classes.content + ' ' + (this.props.addNew ? classes.newContent : '') + ' ' + classes.name}
						placeholder="Type a name..."
						value={this.props.pokemon.name}
						disabled={!editable}
						name="name"
						onChange={this._inputUpdate}
					/>
				</div>
				<div className={classes.imageContainer}>
					<div className={classes.header + ' ' + (this.props.addNew ? classes.newHeader : '')}>
						<div className={classes.title + ' ' + (this.props.addNew ? classes.newTitle : '')}>
							IMAGE URL
						</div>
						<input
							className={classes.content + ' ' + (this.props.addNew ? classes.newContent : '') + ' ' + classes.link}
							placeholder="A link to Pokemons's image"
							value={this.props.pokemon.url}
							disabled={!editable}
							name="url"
							onChange={this._inputUpdate}
						/>
					</div>
					<div className={classes.cardImageWrapper}>
						<img className={classes.cardImage} src={this.props.pokemon.url} />
					</div>
					<div>
						ID: {this.props.pokemon.id ? this.props.pokemon.id : 'N/A'}
					</div>
				</div>
			</div>
		);
	}
}

export const PokemonCardRelay = createFragmentContainer(PokemonCard, {
	pokemon: graphql`
		fragment PokemonCard_pokemon on Pokemon {
			id,
			name,
			url,
		}
	`
});
