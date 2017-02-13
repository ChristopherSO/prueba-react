import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import FavoriteTournamentsListItem from './favorite-tournaments-list-item';
import Rebase from 're-base';


var base = Rebase.createClass({
	apiKey: "AIzaSyA2DE0RXRRCnqw5R5NFKI2XeGFFuLsAqw4",
	authDomain: "prueba-la-creativeria.firebaseapp.com",
	databaseURL: "https://prueba-la-creativeria.firebaseio.com",
	storageBucket: "prueba-la-creativeria.appspot.com",
	messagingSenderId: "984037448459"
});

class FavoriteTournamentsList extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			favoriteTournaments: []
		};

		// Get my favorite tournaments from Firebase
		base.fetch('favoriteTournaments', {
			context: this,
			asArray: true
		})
		.then(data => {
			if (data != null) {
				this.setState({
					favoriteTournaments: data
				})
			}
		})
		.catch(error => {
			//handle error
		})
	}

	render() {
		console.log("this.state.favoriteTournaments", this.state.favoriteTournaments);
		if (this.state.favoriteTournaments.length >= 0) {
			return (
				<div className="container-fluid">
					<h3 className="text-center">Mis torneos favoritos</h3>
					<ListGroup>
						{this.state.favoriteTournaments.map((tournament) => {
							return (
								<FavoriteTournamentsListItem 
									key={"t_" + tournament.id}
									tournament={tournament} />
							);
						})}
					</ListGroup>
				</div>
			)
		} else {
			return (
				<div className="container-fluid">
					<p className="text-center">Cargando torneos favoritos...</p>
				</div>
			);
		}
	}

	tournamentsLIs() {
		var tournaments = ["a", "b", "c"];

		return tournaments.map(function(tournament, i) {
			return <li key={'tournament_' + i}>{tournament}</li>;
		});
	}
}

export default FavoriteTournamentsList;