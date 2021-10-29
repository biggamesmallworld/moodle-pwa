import React from 'react';
import Home from "./old-components/Home";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	BrowserRouter as Router,
	Route, Redirect
  } from "react-router-dom";  
import SinglePost from "./old-components/SinglePost";
import PlayerList from "./old-components/PlayerList";
import ClubList from "./old-components/ClubList";
import AboutUs from "./old-components/AboutUs";
import Login from "./components/Login";
import Dashboard from './components/Dashboard';
import SinglePlayer from './old-components/SinglePlayer';
import SingleClub from './old-components/SingleClub';
import PageWrapper from './components/PageWrapper';
import Course from './components/Course';
import Module from './components/Module';
import Account from './components/Account';



function App() {
	return (
		<div className="full-container">
			<Router>
				<Route
					exact={true}
					path='/'
					render={() => (
						<Dashboard />
					)}
				/> 
				<Route
					exact={true}
					path='/login'
					render={() => (
						<Login/>
					)}
				/> 
				<Route
					exact={true}
					path='/dashboard'
					render={() => (
						<Dashboard />
					)}
				/> 
				<Route
					exact={true}
					path='/my-account'
					render={() => (
						<Account />
					)}
				/> 
				<Route
					exact={true}
					path='/course/:id'
					render={() => (
						<Course />
					)}
				/> 
				<Route
					exact={true}
					path='/course/:id/:moduleid'
					render={() => (
						<Module />
					)}
				/> 
			</Router>
		</div>
	);
} 

export default App;
