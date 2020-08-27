import React from 'react';
import axios from 'axios';
import Loader from '../loader.gif';
import clientConfig from '../client-config';

//here is where I pull in the one post that is attached to my username

class EditProfile extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			profile: {},
			error: '',
			loading: false,
			postSubmitted: false,
			title: '',
			token: '',
			message: '',

		}
	}



	componentDidMount() {

        const wordPressSiteUrl = clientConfig.siteUrl;
		const user_name = localStorage.getItem('userName');
		const token = localStorage.getItem('token');

		this.setState({token});

		this.setState({loading:true}, () =>{
			axios.get(`${wordPressSiteUrl}/wp-json/bbjo/v1/profiles/${user_name}`)
				.then(res => {
					this.setState({loading:false, profile: res.data, title: res.data.title});
				})
				.catch(error => this.setState({loading: false, error: error.response.data.message}) )
		});

	}

	handleFormSubmit = ( event ) => {
		event.preventDefault();

		this.setState({loading: true});

		const formData = {
			title: this.state.title,
			status: 'publish',

		}

		const wordPressSiteUrl = clientConfig.siteUrl;
		const authToken = localStorage.getItem('token');
		const user_name = localStorage.getItem('userName');
		const profile_id = this.state.profile.id;

		// post request to update a post

		axios.put(`${wordPressSiteUrl}/wp-json/wp/v2/players/${profile_id}`, formData, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${authToken}`
			}
		})
		.then( res => {
			console.log('posting');
			console.log('res', res.data);
			this.setState({
				loading: false, 
				postSubmitted: !! res.data.id,
				message: res.data.id ? 'Profile updated' : '',

			})
		})
		.catch( err => {{
			console.log('error posting');
			console.log(err.res.data);
			this.setState({loading: false, message: err.response.data.message})
		}})

	}

	handleInputChange = ( event ) => {
		this.setState({[event.target.name]: event.target.value});
	}

    render() {
		const { profile, title, token, loading, postSubmitted, message } = this.state;

        return (
            <div>
				{!loading ? 
					<form onSubmit={this.handleFormSubmit} className="mt-5" style={{maxWidth: '500px'}}>
						<legend className="mb-4">Edit {this.props.userName}'s Profile</legend>
						{message ? 
							<div className={`alert ${ postSubmitted ? 'alert-success': 'alert-danger'}`} >
								{message}
							</div>
						: null}
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input type="text" name="title" onChange={this.handleInputChange} className="form-control" id="title" value={title}/>

						</div>
						{/*<div className="form-group">
							<label htmlFor="first_name">First Name</label>
							<input type="text" name="firstName" onChange={this.handleInputChange} className="form-control" id="first_name" value={firstName}/>

						</div>*/}

						<button className="btn btn-secondary" type="submit">Update Profile</button>
						{loading && 
							<div className="loaderContainer w-100">
								<img src={Loader} className="loader m-auto" alt="Loader" /> 
							</div> 
						}
					</form>
				: 
					<div className="loaderContainer w-100">
						<img src={Loader} className="loader m-auto" alt="Loader" /> 
					</div> 
				}
            </div>
        );
    }

}

export default EditProfile;