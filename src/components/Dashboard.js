import React from 'react';
import NavbarDrawer from "./NavbarDrawer";
import axios from 'axios';
import { Link } from '@reach/router';


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
        const wordPressSiteUrl = 'https://baseballjobsoverseas.com';
        const user_name = localStorage.getItem('userName');
		
		console.log(localStorage.getItem('userDisplayName'));
		this.setState({user_displayName: localStorage.getItem('userDisplayName')});

        this.setState({loading:true}, () =>{
			axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/users?per_page=100`)
				.then(res => {
                    res.data.forEach(element => {
                        if(element.name === user_name) {
							this.setState({user_id: element.id});
							console.log(element.id);
                            localStorage.setItem('userID', this.state.user_id);
                        }
                    });
					this.setState({loading:false});
				})
				.catch(error => this.setState({loading: false, error: error.response.data.message}) )
		});

		
        //this.getAuthorPosts();
	}

	logOut() {
		localStorage.setItem( 'token', '' );
		localStorage.setItem( 'userName', '' );
	}


	render() {
		const { posts, loading, error } = this.state;
		
		return (
			<div>
				<NavbarDrawer />
				<div className="ml-auto mr-auto content-container col-sm-12 col-md-8">
					{error && <div className="alert alert-danger">{error}</div>}
					<p>You are now logged in!</p>
					<h4>Welcome {this.state.user_displayName}!</h4>
					{/*<p>https://baseballjobsoverseas.com/wp-json/wp/v2/posts?author={this.state.user_id}</p>*/}
					<Link 
						onClick={this.logOut}
						className="btn btn-primary mb-3"
						to='/login'
					>
						Log Out
					</Link>

				</div>
			</div>
		)
	}
}

export default Dashboard;