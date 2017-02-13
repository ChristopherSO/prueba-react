import React, { Component } from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Panel from 'react-bootstrap/lib/Panel';
import Rebase from 're-base';
import FeaturedMatchesList from './featured-matches-list';


var base = Rebase.createClass({
	apiKey: "AIzaSyA2DE0RXRRCnqw5R5NFKI2XeGFFuLsAqw4",
	authDomain: "prueba-la-creativeria.firebaseapp.com",
	databaseURL: "https://prueba-la-creativeria.firebaseio.com",
	storageBucket: "prueba-la-creativeria.appspot.com",
	messagingSenderId: "984037448459"
});

class FavoriteTournamentsListItem extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			checked: props.tournament.isFavorite,
			panelIsOpen: false,
			hasThePanelBeenOpened: false // This state prevents the list of matches to be rendered until the panel opens the first time
		};
		
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handlePanelChange = this.handlePanelChange.bind(this);
	}

	handleCheckboxChange() {
		if (!this.state.checked) {
			this.addFavoriteTournament()
		} else {
			this.removeFavoriteTournament()
		}

		this.setState({
			checked: !this.state.checked
		})
	}

	handlePanelChange() {
		console.log("handlePanelChange");
		this.setState({
			panelIsOpen: !this.state.panelIsOpen,
			hasThePanelBeenOpened: true
		})
	}

	addFavoriteTournament() {
		// Using re-base to push favorite tournament to Firebase
		base.post('favoriteTournaments/'+this.props.tournament.id, {
			data: this.props.tournament
		}).then(() => {
			console.log("added:", this.props.tournament.caption);
		}).catch(err => {
			//handle error
		});
	}

	removeFavoriteTournament() {
		base.remove('favoriteTournaments/'+this.props.tournament.id).then(() => {
			console.log("removed:", this.props.tournament.caption);
		}).catch(error => {
			//handle error
		});
	}

	render() {
		return (
			<div>
				<ListGroupItem>
					<span>{this.props.tournament.caption}</span>
					<a 
						style={{float:'right'}}
						onClick={ () => this.handlePanelChange()}>
						<Glyphicon glyph={this.state.panelIsOpen ? "chevron-down" : "chevron-up"} />
					</a>
					<input 
						style={{float:'right', marginRight: '15px'}}
						type="checkbox"
						checked={ this.state.checked } 
						onChange={ this.handleCheckboxChange } />
				</ListGroupItem>
				<Panel collapsible expanded={this.state.panelIsOpen}>
					{ this.state.hasThePanelBeenOpened ? <FeaturedMatchesList tournamentId={this.props.tournament.id} /> : ""}
				</Panel>
			</div>
		);
	}

}

export default FavoriteTournamentsListItem;