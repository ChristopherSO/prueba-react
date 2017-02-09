import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ApiTournamentsListItem from './api-tournaments-list-item';
import Rebase from 're-base';


var base = Rebase.createClass({
	apiKey: "AIzaSyA2DE0RXRRCnqw5R5NFKI2XeGFFuLsAqw4",
	authDomain: "prueba-la-creativeria.firebaseapp.com",
	databaseURL: "https://prueba-la-creativeria.firebaseio.com",
	storageBucket: "prueba-la-creativeria.appspot.com",
	messagingSenderId: "984037448459"
});

class ApiTournamentsList extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			apiTournaments: [],
			favoriteTournaments: {},
			firebaseFetchDone: false
		};

		// Get the tournaments from the API
		fetch('http://api.football-data.org/v1/competitions', { 
			headers: {
				'X-Auth-Token': 'df7efca274f64ed1adc8e8cfed3541c5'
			}
		})
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			this.setState({
				apiTournaments: data
			})
		})

		// Get my favorite tournaments from Firebase
		base.fetch('favoriteTournaments', {
			context: this,
			asArray: false // In this case false makes it easy to get items by id.
		})
		.then(data => {
			if (data != null) {
				this.setState({
					favoriteTournaments: data
				})
			}
			this.setState({
				firebaseFetchDone: true
			})
		})
		.catch(error => {
			//handle error
		})
	}

	render() {
		/*
		* Note: cannot use the check 'this.state.favoriteTournaments>=0' because the 
		* data doesn't come as array which is needed (base.fetch -> asArray: false).
		* That's why the state 'firebaseFetchDone' is needed.
		*/
		if (this.state.apiTournaments.length > 0 && this.state.firebaseFetchDone) {
			return (
				<div className="container-fluid">
					<h3 className="text-center">Todos los torneos</h3>
					<ListGroup>
						{this.state.apiTournaments.map((tournament) => {
							var isFavorite = (this.state.favoriteTournaments[tournament.id] !== undefined)
							return (
								<ApiTournamentsListItem 
									key={"t_" + tournament.id}
									tournament={tournament}
									isFavorite={isFavorite} />
							);
						})}
					</ListGroup>
				</div>
			)
		} else {
			return (
				<div className="container-fluid">
					<p className="text-center">Cargando torneos...</p>
				</div>
			);
		}
	}
}

export default ApiTournamentsList;