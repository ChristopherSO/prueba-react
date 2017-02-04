import React, { Component } from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Panel from 'react-bootstrap/lib/Panel';
import Rebase from 're-base';
import ApiMatchesList from './api-matches-list';


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
			match: props.match,
			matchId: props.matchId,
			matchIndex: props.matchIndex,
			checked: props.isFavorite
		};
		
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.handlePanelChange = this.handlePanelChange.bind(this);
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
		base.post('featuredMatches/'+this.state.matchId, {
			data: this.state.match
		}).then(() => {
			console.log("added:", this.state.match.homeTeamName + " vs. " + this.state.match.awayTeamName);
		}).catch(err => {
			//handle error
		});
	}

	removeFeaturedMatch() {
		base.remove('featuredMatches/'+this.state.matchId).then(() => {
			console.log("removed:", this.state.match.homeTeamName + " vs. " + this.state.match.awayTeamName);
		}).catch(error => {
			//handle error
		});
	}

	render() {
		return (
			<ListGroupItem>				
				<span>{this.state.match.homeTeamName + " vs. " + this.state.match.awayTeamName}</span>
				<input 
					style={{float:'right', marginRight: '15px'}}
					type="checkbox"
					checked={ this.state.checked } 
					onChange={ this.handleCheckboxChange } />
			</ListGroupItem>
		);
	}

}

export default ApiMatchesListItem;