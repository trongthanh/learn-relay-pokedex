import React from 'react';
import Relay from 'react-relay/classic';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classes from './PokemonPreview.css';
import { createFragmentContainer, graphql } from 'react-relay/compat';

class PokemonPreview extends React.Component {

	static propTypes = {
		pokemon: PropTypes.object,
		router: PropTypes.object,
	}

	render () {
		return (
			<Link className={classes.link} to={`/view/${this.props.pokemon.id}`}>
				<div className={classes.previewPage}>
					<img className={classes.previewImg} src={this.props.pokemon.url} alt="Pokemon Image" />
					<div className={classes.previewName}>
						{this.props.pokemon.name}
					</div>
				</div>
			</Link>
		);
	}
}

export default createFragmentContainer(
	PokemonPreview,
	{
		pokemon: graphql`
			fragment PokemonPreview_pokemon on Pokemon {
				id
				name
				url
			}
		`,
	}
);
