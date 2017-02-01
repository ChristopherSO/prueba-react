import React, { Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

class Header extends Component {
	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">React-Bootstrap</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<NavItem eventKey={1} href="#">Link</NavItem>
					<NavItem eventKey={2} href="#">Link</NavItem>
				</Nav>
			</Navbar>
		);
	}
}

export default Header;