import React from 'react';
import NavbarDrawer from "./NavbarDrawer";
import axios from 'axios';
import { Redirect } from '@reach/router';

class Login extends React.Component {

	constructor (props) {
		super(props);

		this.state ={
			username: '',
			password: '',
			userNiceName: '',
			userEmail: '',
			loggedIn: false,
			loading: false,
			error: ''
		};
	}

	onFormSubmit = (e) => {
		e.preventDefault();

		const siteUrl = 'https://baseballjobsoverseas.com';

		const loginData = {
			username: this.state.username,
			password: this.state.password,
		};

		this.setState( { loading: true }, () => {
			axios.post( `${siteUrl}/wp-json/jwt-auth/v1/token`, loginData )
				.then( res => {
					if ( undefined === res.data.token ) {
						this.setState( { error: res.data.message, loading: false } );
						return;
					}

					const { token, user_nicename, user_email, user_display_name } = res.data;

					console.log(res.data);

					localStorage.setItem( 'token', token );
					localStorage.setItem( 'userName', user_nicename );
					localStorage.setItem( 'userDisplayName', user_display_name );
					localStorage.setItem( 'userEmail', user_email);

					this.setState( {
						loading: false,
						token: token,
						userNiceName: user_nicename,
						userEmail: user_email,
						loggedIn: true
					});
				})
				.catch( err => {

					this.setState( { error: err.response.data.message, loading: false } );
				} )
		} )
	};

	handleOnChange = (event) => {
		this.setState({[event.target.name]:event.target.value});
	};
	render() {
		const {username, password, loggedIn, userNiceName } = this.state;

		const user = userNiceName ? userNiceName : localStorage.getItem('userName');

		if( loggedIn || localStorage.getItem('token')) {
			return <Redirect to={`/dashboard/${user}`} noThrow/>;
		} else {
			return (
				<div>
					<NavbarDrawer />
					<div className="ml-auto mr-auto contentContainer col-md-6">
						<form onSubmit={this.onFormSubmit} className="loginForm" >
							<label className="form-group">
								Username:
								<input 
									type='text'
									className="form-control"
									name="username"
									value={username}
									onChange={this.handleOnChange}
								/>
							</label>
							<br />
							<label className="form-group ">
								Password:
								<input 
									type='password'
									className="form-control"
									name="password"
									value={password}
									onChange={this.handleOnChange}
								/>
								
							</label>
							<br />
							<button className="btn btn-primary mb-3" type="submit">Login</button>
						</form>
					</div>
				</div>
			);
		} 
	}
}

export default Login;