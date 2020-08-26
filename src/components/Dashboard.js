import React from 'react';
import NavbarDrawer from "./NavbarDrawer";
import axios from 'axios';
import { Link } from '@reach/router';
import EditProfile from './EditProfile';
import { Button } from '@material-ui/core';


class Dashboard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading:false,
			posts: [],
			error: '',
            search: null,
			user_id: '',
			user_displayName: '',
			profileId: '',
			showDash: false,
		}
	}
    
    getAuthorPosts() {
        const wordPressSiteUrl = 'https://baseballjobsoverseas.com';

        this.setState({loading:true}, () =>{
			axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/users/${this.state.user_id}`)
				.then(res => {
                    //console.log(this.state.user_id);
                    console.log(res.data);
					this.setState({loading:false, posts: res.data});
				})
				.catch(error => this.setState({loading: false, error: error.response.data.message}) )
		});
    }

	componentDidMount() {
		this.setState({user_displayName: localStorage.getItem('userDisplayName')});
	}

	logOut() {
		localStorage.setItem( 'token', '' );
		localStorage.setItem( 'userName', '' );
	}


	render() {
		const { loading, error, showDash } = this.state;
		
		return (
			<div>
				<NavbarDrawer />
				<div className="ml-auto mr-auto content-container col-sm-12 col-md-8">
					{error && <div className="alert alert-danger">{error}</div>}
					<p>You are now logged in!</p>
					<h4>Welcome {this.state.user_displayName}!</h4>
					<Link 
						onClick={this.logOut}
						className="btn btn-primary mb-3"
						to='/login'
					>
						Log Out
					</Link>
					<Button 
						onClick={() => this.setState({showDash: !showDash})}
						variant="contained" 
						color="secondary"
						className="mb-3 ml-2"
					>
						Edit Profile
					</Button>
					{showDash && 
						<EditProfile userName={this.state.user_displayName} />
					}
				</div>
			</div>
		)
	}
}

export default Dashboard;