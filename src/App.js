import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import FavoriteTournamentsList from './favorite-tournaments-list';
import ApiTournamentsList from './api-tournaments-list'

class App extends Component {

	constructor() {
		super();
		
		this.state = {
			actualPage: 'all-tournaments'
		};
	}

	render() {
		return (
			<div className="App">

				<div className="App-header row">
					<img src={logo} className="App-logo" alt="logo" />
					<div>
						<h2>Prueba técnica</h2>
						<h5>Librerías usadas: React, re-base (adaptador para Google Firebase) y React-Bootstrap</h5>
					</div>
				</div>

				<Navbar collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#">Torneos & partidos</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav activeKey={this.state.actualPage}>
							<NavItem
								eventKey={'all-tournaments'} 
								onClick={() => this.setState({actualPage: 'all-tournaments'})} >
								Todos los torneos
							</NavItem>
							<NavItem eventKey={'my-tournaments'} onClick={() => this.setState({actualPage: 'my-tournaments'})} >
								Mis torneos y partidos destacados
							</NavItem>
						</Nav>
						{/*<Nav pullRight>
							<NavItem eventKey={1} href="#">Link Right 1</NavItem>
							<NavItem eventKey={2} href="#">Link Right 2</NavItem>
						</Nav>*/}
					</Navbar.Collapse>
				</Navbar>

				<div className="row panel panel-default">
					<div className="col-md-6 col-md-offset-3">
						{(this.state.actualPage === 'all-tournaments') ? <ApiTournamentsList /> : <FavoriteTournamentsList /> }
					</div>
				</div>

			</div>
		);
	}
}

export default App;
