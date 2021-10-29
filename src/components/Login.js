import React, { useState, useEffect} from 'react';
import NavbarDrawer from "../old-components/NavbarDrawer";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function Login(props) {

	const [loginObj, setLoginObj] = useState({ 
		username: '',
		password: '',
		userNiceName: '',
		userEmail: '',
		loggedIn: false,
		loading: false,
		error: '',
		token: ''
	});

	const onFormSubmit = (e) => {
		e.preventDefault();

		const siteUrl = 'https://learn.au.int/moodle/';
		const service = 'moodle_mobile_app';
		//https://localhost/moodle/login/token.php?username=student&password=password!&service=moodle_mobile_app

		setLoginObj({ loading: true });
		axios.get( `${siteUrl}/login/token.php`, {
				params: {
					username: loginObj.username,
					password: loginObj.password,
					service: service
				}
			})
			.then( res => {
				console.log(res);
				if ( undefined === res.data.token ) {
					setLoginObj({...loginObj, error: res.data.message, loading: false } );
					return;
				}

				let { token } = res.data;
				setLoginObj({...loginObj, token: token});
				localStorage.setItem('token', token);

				axios.get(`${siteUrl}/webservice/rest/server.php?wstoken=${token}&wsfunction=core_user_get_users_by_field&field=username&values[0]=${loginObj.username}&moodlewsrestformat=json`)
					.then(res => {
						console.log(res.data);
						let user = res.data[0];
						localStorage.setItem('userid', user.id);
						setLoginObj({...loginObj, loggedIn: true, error: res.data.message, loading: false } );

					})
					.catch(err => {
						setLoginObj({ ...loginObj, error: err.response.data.message, loading: false } );
					})
			})
			.catch( err => {
				setLoginObj({ ...loginObj, error: err.response.data.message, loading: false } );
			})
	};

	const handleOnChange = (event) => {
		setLoginObj({...loginObj, [event.target.name]:event.target.value});
	};

	const user = loginObj.userNiceName ? loginObj.userNiceName : localStorage.getItem('userName');

	return (
		<div className="d-flex justify-content-center align-items-center login-cont">
			{loginObj.loggedIn || localStorage.getItem('token') ? 
				<Redirect to={`/dashboard`} noThrow />
			:
				<div className="shadow rounded bg-white p-3">
					<h4 className="w-100 text-center">Moodle 21st Cetury</h4>
					<form onSubmit={onFormSubmit} className="loginForm" >
						<label className="form-group">
							Username:
							<input 
								type='text'
								className="form-control"
								name="username"
								value={loginObj.username}
								onChange={e => handleOnChange(e)}
							/>
						</label>
						<br />
						<label className="form-group">
							Password:
							<input 
								type='password'
								className="form-control"
								name="password"
								value={loginObj.password}
								onChange={e => handleOnChange(e)}
							/>
							
						</label>
						<br />
						<button className="btn btn-primary mb-3" type="submit">Login</button>
					</form>
				</div>
			} 
		</div>
	)
}

export default Login;