import React from 'react';
import NavbarDrawer from "./NavbarDrawer";
import axios from 'axios';
import { Link } from '@reach/router';
import renderHTML from 'react-render-html';
import Loader from '../loader.gif';
//import Select from 'react-select';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

	

class PlayerList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading:true,
			players: [],
			error: '',
			search: '',
			value:'',
			options: [{value: 'pitcher',label: 'Pitcher'},
			{value: 'catcher',label:'Catcher'},
			{value: 'first base',label:'First Base'},
			{value: 'second base',label:'Second Base'},
			{value: 'third base',label:'Third Base'}, 
			{value: 'shortstop',label:'Shortstop'}, 
			{value: 'left field',label:'Left Field'}, 
			{value: 'center field',label:'Center Field'},
			{value: 'right field',label:'Right Field'},
			{value: 'utility',label:'Utility'}],
			//positionSelected: null
		}
	}

	searchSpace=(event)=>{
		let keyword = event.target.value;
		this.setState({search: keyword});
	}

	extractPosition = (position) => {
		if(position === '1B') {
			return 'First Base';
		} else if (position === '2B') {
			return 'Second Base';
		} else if (position === '3B') {
			return 'Third Base';
		} else if (position === 'SS') {
			return 'Short Stop';
		} else if (position === 'LF') {
			return 'Left Field';
		} else if (position === 'RF') {
			return 'Right Field';
		} else if (position === 'CF') {
			return 'Center Field';
		} else if (position === 'C') {
			return 'Catcher';
		} else if (position === 'Utl') {
			return 'Utility';
		} else if (position === 'RHP') {
			return 'Right Handed Pitcher';
		} else if (position === 'LHP') {
			return 'Left Handed Pitcher';
		} else if (position === 'OF') {
			return 'Outfield';
		} else if (position === 'Coach') {
			return 'Coach';
		} else if (position === 'Youth Coach') {
			return 'Youth Coach';
		} else if (position === 'Virtual Coach') {
			return 'Virtual Coach';
		} else if (position === 'SP') {
			return 'Starting Pitcher';
		} else if (position === 'RP') {
			return 'Relief Pitcher';
		} 
	}

	filterResults = (player) => {
		let positionList = '';
		player.acf.player_position.forEach(element => {
			positionList += this.extractPosition(element);
		});

		let playerInfo = player.acf.first_name + player.acf.last_name + positionList;

		playerInfo = playerInfo.replace(/\s/g, ''); //remove spaces
		playerInfo = playerInfo.toLowerCase(); // all lowercase

		let searchTerm = this.state.search.toLowerCase();

		if(playerInfo.includes(searchTerm)) {
			return player;
		}

	}

	componentDidMount() {
		const wordPressSiteUrl = 'https://baseballjobsoverseas.com';

		this.setState(() =>{
			axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/players?per_page=30`)
				.then(res => {
					this.setState({loading:false, players: res.data});
				})
				.catch(error => this.setState({loading: false, error: error.response.data.message}));

		});
	}

	/*handleChange = (selectedOption) => {
		this.setState({ positionSelected: selectedOption });
  	};*/
	
	render() {
		const { players, loading, error } = this.state;
		const items = players.filter((data)=>{
			if(this.state.search !== '') {
				return this.filterResults(data);
			} else {
				return data;
			}
		});
		return (
			<div>
				<NavbarDrawer />
				<div className="ml-auto mr-auto content-container col-md-8">
					{error && <div className="alert alert-danger">{error}</div>}
					{/* Search Form */}
					<form className="form-inline d-flex justify-content-center md-form form-sm active-cyan active-cyan-2  mb-4 searchForm">
						<FontAwesomeIcon icon={faSearch} size="1x" />
						<input 
							className="searchBar" 
							type="text" 
							placeholder="Search"
							aria-label="Search"
							onChange={(e)=>this.searchSpace(e)}
						/>
						<div className="clearFix"></div>
					</form>
					{/*<div className="dropdownContainer">
						<label className="mdb-main-label">Position(s)</label>
						<Select
							value={this.state.positionSelected}
							onChange={this.handleChange}
							options={this.state.options}
						/>
					</div>*/}
					{items.length ? (
						<div className="mt-5 postContainer">
							{items.map(player => (
								<Link key={player.id} to={`/player/${player.id}`}>
									<div className="listItem z-depth-1" >
										{/* Profile Picture */}
										<div className="profilePicture">
											<img src={player.acf.profile_picture} alt={player.acf.first_name + " " + player.acf.last_name} />
										</div>
										<div className="playerMeta">
											<h3>{player.acf.first_name + " " + player.acf.last_name}</h3>
											<h5>{renderHTML(player.title.rendered)}</h5>
											<p>{player.acf.player_position.map((element, index) => {
												if(index !== player.acf.player_position.length -1) {
													return <span key={index}>{ this.extractPosition(element)}, </span>;
												} else {
													return <span key={index}>{this.extractPosition(element)}</span>;
												}
												
											})}</p>
										</div>
										{/* Footer 
										<div className="">
											<Link to={`/players/${player.id}`} className="btn btn-primary float-right">View Profile</Link>
										</div> */}
										<div className="clearDiv"></div>
									</div>
								</Link>
							))}
						</div>
					) : ''}
					{loading && 
						<div className="loaderContainer w-100">
							<img src={Loader} className="loader m-auto" alt="Loader" /> 
						</div>
					}
				</div>
			</div>
		)
	}
}



export default PlayerList;