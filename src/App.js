import React from 'react';
import Home from "./components/Home";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from "@reach/router";
import SinglePost from "./components/SinglePost";
import PlayerList from "./components/PlayerList";
import ClubList from "./components/ClubList";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Dashboard from './components/Dashboard';
import SinglePlayer from './components/SinglePlayer';
import SingleClub from './components/SingleClub';



class App extends React.Component {
	render() {
		return (
			<div className="full-container">
				<Router>
					<Home path="/"/>
					<SinglePost path="/post/:id/" />
					<SinglePlayer path="/player/:id/" />
					<PlayerList path="/players/" />
					<ClubList path="/clubs/" />
					<SingleClub path="/club/:id/" />
					<AboutUs path="/about/" />
					<Login path="/login/" />
					<Dashboard path="/dashboard/:userName" />
				</Router>
			</div>
		);
	}
}

export default App;
