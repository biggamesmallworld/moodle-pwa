import React from 'react';
import Logo from '../bbjo-logo-white.png';
import { Navbar, Nav } from 'react-bootstrap';

class HeaderNav extends React.Component {
	render() {
		return (
			<Navbar collapseOnSelect expand="false" variant="light" className="navbar">
				<Navbar.Brand href="/"><img src={Logo} className="logo" alt="Logo" /></Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/" to="/">Home</Nav.Link>
						<Nav.Link href="/players/">Players</Nav.Link>
						<Nav.Link href="/clubs/">Clubs</Nav.Link>
						<Nav.Link href="/about/">About Us</Nav.Link>
						<Nav.Link href="/login/">Login</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default HeaderNav;