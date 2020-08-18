import React from 'react';
import NavbarDrawer from "./NavbarDrawer";
import axios from 'axios';
import { Link } from '@reach/router';
import Loader from '../loader.gif';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class ClubList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading:false,
			teams: [],
			error: '',
			search: ''
		}
	}

	searchSpace=(event)=>{
		let keyword = event.target.value;
		this.setState({search:keyword})
	}

	filterResults = (club) => {

		let clubInfo = club.acf.country + club.title.rendered;

		clubInfo = clubInfo.replace(/\s/g, ''); //remove spaces
		clubInfo = clubInfo.toLowerCase(); // all lowercase

		let searchTerm = this.state.search.toLowerCase();

		console.log(searchTerm);
		console.log(clubInfo);

		if(clubInfo.includes(searchTerm)) {
			return club;
		}

	}

	componentDidMount() {
		const wordPressSiteUrl = 'https://baseballjobsoverseas.com';

		this.setState({loading:true}, () =>{
			axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/clubs?per_page=30`)
				.then(res => {
					this.setState({loading:false, teams: res.data});
				})
				.catch(error => this.setState({loading: false, error: error.response.data.message}) )
		});
	}
	render() {
		const { teams, loading, error } = this.state;
		const items = teams.filter((data)=>{
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
					<form className="form-inline d-flex justify-content-center md-form form-sm active-cyan active-cyan-2 mb-4 searchForm">
						<FontAwesomeIcon icon={faSearch} size="1x" />
						<input 
							className="searchBar" 
							type="text" 
							placeholder="Search"
							aria-label="Search"
							onChange={(e)=>this.searchSpace(e)}
						/>
					</form>
					<div className="mt-5 postContainer">
						{teams.length ? (
							<div className="mt-5 postContainer">
								{items.map(club => (
									<Link key={club.id} to={`/club/${club.id}`}>
										<div className="listItem" >
											{/* Profile Picture */}
											<div className="profilePicture">
												<img src={club.acf.profile_picture} alt={club.title.rendered} />
											</div>
											<div className="playerMeta">
												<h3>{club.title.rendered}</h3>
												<h5>{club.acf.country}</h5>
											</div>
											{/* Footer 
											<div className="">
												<Link to={`/club/${club.id}`} className="btn btn-primary float-right">View Club</Link>
											</div>*/}
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
			</div>
		)
	}
}

export default ClubList;