import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
//import ApiMatchesListItem from './api-tournaments-list-item';
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
			featuredMatches: [],
			fetchCount: 0 // This will be 2 when api-fetch and firebase-fetch are done
		};
	}

	componentWillMount() {

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
			console.log("data.fixtures", data.fixtures);
			this.setState({
				apiMatches: data.fixtures,
				fetchCount: this.state.fetchCount+1
			})
		})

		// Get my featured matches from Firebase
		base.fetch('featuredMatches', {
			context: this,
			asArray: false
		})
		.then(data => {
			this.setState({
				featuredMatches: data,
				fetchCount: this.state.fetchCount+1
			})
		})
		.catch(error => {
			//handle error
		})
		
	}

	render() {
		if (this.state.apiMatches.length > 0 /* && this.state.fetchCount === 2 */) {
			return (
				<div className="container-fluid">
					<ListGroup>
						{this.state.apiMatches.map((match) => {
							//var isFavorite = (this.state.featuredMatches[match.id] !== undefined)
							return "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident."; /*(
								<ApiMatchesListItem 
									key={"t_" + match.id}
									match={match}
									isFavorite={isFavorite} />
							);*/
						})}
					</ListGroup>
				</div>
			)
		} else {
			return <p className="text-center">Cargando partidos...</p>
		}
	}
}

export default ApiMatchesList;