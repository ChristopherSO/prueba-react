import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Firebase from 'firebase';
import FavoriteTournamentsList from './favorite-tournaments-list';
import ApiTournamentsList from './api-tournaments-list'

class App extends Component {

	constructor(props) {
		super(props);
		// Initial state
		this.state = {
			speed: 10
		};
	}

	componentWillMount() {
		const rootRef = Firebase.database().ref();
		const speedRef = rootRef.child('text');
		speedRef.on('value', snap => {
			// Firebase state
			this.setState({
				speed: snap.val()
			});
		});
	}

	render() {
		console.log("this.state", this.state);
		return (
			<div className="App">

				<div className="App-header row">
					<img src={logo} className="App-logo" alt="logo" />
					<div>
						<h2>Prueba técnica</h2>
						<h5>Librerías usadas: React, re-base (adaptador para Google Firebase) y React-Bootstrap</h5>
					</div>
				</div>

				<div className="row panel panel-default">
					<div className="col-md-8 col-md-offset-2">
						<h2 className="text-center">Torneos & partidos</h2>
						<ApiTournamentsList />
						<FavoriteTournamentsList tournaments={this.state.tournaments} />
					</div>
				</div>

			</div>
		);
	}
}

export default App;
