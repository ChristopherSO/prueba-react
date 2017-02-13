import React, { Component } from 'react';
import Table from 'react-bootstrap/lib/Table';
import ApiMatchesListItem from './api-matches-list-item';
import Rebase from 're-base';


var base = Rebase.createClass({
	apiKey: "AIzaSyA2DE0RXRRCnqw5R5NFKI2XeGFFuLsAqw4",
	authDomain: "prueba-la-creativeria.firebaseapp.com",
	databaseURL: "https://prueba-la-creativeria.firebaseio.com",
	storageBucket: "prueba-la-creativeria.appspot.com",
	messagingSenderId: "984037448459"
});

class ApiMatchesList extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			apiMatches: [],
			featuredMatches: {},
			firebaseFetchDone: false
		};

		// Get the matches from the API
		fetch('http://api.football-data.org/v1/competitions/'+this.props.tournament.id+'/fixtures', { 
			headers: {
				'X-Auth-Token': 'df7efca274f64ed1adc8e8cfed3541c5'
			}
		})
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			this.setState({
				apiMatches: data.fixtures
			})
		})

		// Get my featured matches from Firebase
		base.fetch('featuredMatches', {
			context: this,
			asArray: false
		})
		.then(data => {
			if (data != null) {
				this.setState({
					featuredMatches: data[this.props.tournament.id] || {} // If there are no matches under the indicated tournament id, give an empty object.
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
		if (this.state.apiMatches.length > 0 && this.state.firebaseFetchDone) {
			return (
				<div>
					<Table striped condensed hover>
						<tbody>
							{this.state.apiMatches.map((match, index) => {
								var isFeatured = (this.state.featuredMatches[index] !== undefined);
								return (
									<ApiMatchesListItem 
										key={"m_" + this.props.tournament.id + "_" + index}
										tournament={this.props.tournament}
										match={match}
										matchIndex={index}
										isFeatured={isFeatured} />
								);
							})}
						</tbody>
					</Table>
				</div>
			)
		} else {
			return <p className="text-center">Cargando partidos...</p>
		}
	}
}

export default ApiMatchesList;