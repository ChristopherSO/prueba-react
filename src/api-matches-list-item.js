import React, { Component } from 'react';
import Rebase from 're-base';


var base = Rebase.createClass({
	apiKey: "AIzaSyA2DE0RXRRCnqw5R5NFKI2XeGFFuLsAqw4",
	authDomain: "prueba-la-creativeria.firebaseapp.com",
	databaseURL: "https://prueba-la-creativeria.firebaseio.com",
	storageBucket: "prueba-la-creativeria.appspot.com",
	messagingSenderId: "984037448459"
});

class ApiMatchesListItem extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			checked: props.isFeatured
		};
		
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	handleCheckboxChange() {
		if (!this.state.checked) {
			this.addFeaturedMatch()
		} else {
			this.removeFeaturedMatch()
		}

		this.setState({
			checked: !this.state.checked
		})
	}

	addFeaturedMatch() {
		// Using re-base to push favorite match to Firebase
		base.post('featuredMatches/'+this.props.tournament.id+'/'+this.props.matchIndex, {
			data: this.props.match
		}).then(() => {
			console.log("added:", this.props.match.homeTeamName + " vs. " + this.props.match.awayTeamName);
		}).catch(err => {
			//handle error
		});

		if (!this.props.tournament.hasOwnProperty('isFavorite')) {
			this.addTournament()
		}
	}

	addTournament() {
		this.props.tournament.isFavorite = false;
		// Using re-base to push favorite tournament to Firebase
		base.post('favoriteTournaments/'+this.props.tournament.id, {
			data: this.props.tournament
		}).then(() => {
			console.log("added:", this.props.tournament.caption);
		}).catch(err => {
			//handle error
		});
	}

	removeFeaturedMatch() {
		base.remove('featuredMatches/'+this.props.tournament.id+'/'+this.props.matchIndex).then(() => {
			console.log("removed:", this.props.match.homeTeamName + " vs. " + this.props.match.awayTeamName);
		}).catch(error => {
			//handle error
		});
	}

	render() {
		return (
			<tr>
				<td>{this.props.match.homeTeamName}</td>
				<td>vs.</td>
				<td>{this.props.match.awayTeamName}</td>
				<td>
					<input 
						type="checkbox"
						style={{float:'right', marginRight: '15px'}}
						checked={ this.state.checked } 
						onChange={ this.handleCheckboxChange } />
				</td>
			</tr>
		);
	}

}

export default ApiMatchesListItem;