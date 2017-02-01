import React, { Component } from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Rebase from 're-base';


var base = Rebase.createClass({
	apiKey: "AIzaSyA2DE0RXRRCnqw5R5NFKI2XeGFFuLsAqw4",
	authDomain: "prueba-la-creativeria.firebaseapp.com",
	databaseURL: "https://prueba-la-creativeria.firebaseio.com",
	storageBucket: "prueba-la-creativeria.appspot.com",
	messagingSenderId: "984037448459"
});

class ApiTournamentsListItem extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			tournament: props.tournament,
			checked: false
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {

		//if (this.state.tournament.id == )
	}

	handleChange() {
		if (!this.state.checked) {
			this.addFavoriteTournament()
		} else {
			this.removeFavoriteTournament()
		}

		this.setState({
			checked: !this.state.checked
		})
	  }

	addFavoriteTournament() {
		// Using re-base to push favorite tournament to Firebase
		base.post('favoriteTournaments/'+this.state.tournament.id, {
			data: this.state.tournament
		}).then(() => {
			console.log("added:", this.state.tournament.caption);
		}).catch(err => {
			//handle error
		});
	}

	removeFavoriteTournament() {
		base.remove('favoriteTournaments/'+this.state.tournament.id).then(() => {
			console.log("removed:", this.state.tournament.caption);
		}).catch(error => {
			//handle error
		});
	}

	render() {
		return (
			<ListGroupItem>
				<span>{this.state.tournament.caption}</span>
				<a 
					style={{float:'right'}}
					href="">
					<Glyphicon glyph="chevron-up" />
				</a>
				<input 
					style={{float:'right', marginRight: '15px'}}
					type="checkbox"
					checked={ this.state.checked } 
					onChange={ this.handleChange } />
			</ListGroupItem>
		);
	}

}

export default ApiTournamentsListItem;