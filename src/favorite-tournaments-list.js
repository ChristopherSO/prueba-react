import React, { Component } from 'react';


class FavoriteTournamentsList extends Component {
	render() {
		return (
			<ul>
				{this.tournamentsLIs()}
			</ul>
		);
	}

	tournamentsLIs() {
		var tournaments = ["a", "b", "c"];

		return tournaments.map(function(tournament, i) {
			return <li key={'tournament_' + i}>{tournament}</li>;
		});
	}
}

export default FavoriteTournamentsList;