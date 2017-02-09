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

class FeaturedMatchesList extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			featuredMatches: []
		};

		// Get my featured matches from Firebase
		base.fetch('featuredMatches', {
			context: this,
			asArray: true
		})
		.then(data => {
			if (data != null) {
				this.setState({
					featuredMatches: data
				})
			}
		})
		.catch(error => {
			//handle error
		})
		
	}

	render() {
		if (this.state.featuredMatches.length >= 0) {
			return (
				<div>
					<Table striped condensed hover>
						<tbody>
							{this.state.featuredMatches.map((match, index) => {
								var matchId = this.props.tournamentId + "_" + index;
								return (
									<ApiMatchesListItem 
										key={"m_" + matchId}
										match={match}
										matchId={matchId}
										isFeatured={true} />
								);
							})}
						</tbody>
					</Table>
				</div>
			)
		} else {
			return <p className="text-center">Cargando partidos destacados...</p>
		}
	}
}

export default FeaturedMatchesList;