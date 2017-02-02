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
			favoriteTournaments: [],
			fetchCount: 0 // This will be 2 when api fetch and firebase fetch are done
		};
	}

	componentWillMount() {

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
				apiTournaments: data,
				fetchCount: this.state.fetchCount+1
			})
		})

		// Get my favorite tournaments from Firebase
		base.fetch('favoriteTournaments', {
			context: this,
			asArray: false
		})
		.then(data => {
			this.setState({
				favoriteTournaments: data,
				fetchCount: this.state.fetchCount+1
			})
		})
		.catch(error => {
			//handle error
		})
		
	}

	render() {
		if (this.state.apiTournaments.length > 0 && this.state.fetchCount === 2) {
			return (
				<div className="container-fluid">
					<h3>Todos los torneos</h3>
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
			return <p className="text-center">Cargando torneos...</p>
		}
	}
}

export default ApiTournamentsList;