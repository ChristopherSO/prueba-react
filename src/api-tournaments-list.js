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
			favoriteTournaments: []
		};
	}

	componentWillMount() {

		var fetchCount = 0; // This will be 2 when api fetch and firebase fetch are done

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
			this.setState({ apiTournaments: data })
			fetchCount++;
			if (fetchCount === 2) this.checkFavoriteTournaments()
			console.log("ApiTournamentsList", this.state.apiTournaments)
		})

		// Get my favorite tournaments from Firebase
		base.fetch('favoriteTournaments', {
			context: this,
			asArray: true
		})
		.then((response) => {
			//console.log("response", response);
			var resp = JSON.stringify(response)
			//var resp = resp["426"]
			console.log("response", resp)
			return response.json()
		})
		.then(data => {
			this.setState({ favoriteTournaments: data })
			fetchCount++;
			if (fetchCount === 2) this.checkFavoriteTournaments()
			console.log("MyFavoriteTournaments", data)
		})
		.catch(error => {
			//handle error
		})
		
	}

	checkFavoriteTournaments() {
		console.log(1);
	}

	render() {
		if (this.state.apiTournaments.length > 0) {
			return (
				<div className="container-fluid">
					<h3>Todos los torneos</h3>
					<ListGroup>
						{this.state.apiTournaments.map((tournament) => {
							return (
								<ApiTournamentsListItem 
									key={"t_" + tournament.id}
									tournament={tournament} />
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