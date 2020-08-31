import React from 'react';
import NavbarDrawer from "./NavbarDrawer";
import axios from 'axios';
import Loader from '../loader.gif';

class SingleClub extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading:false,
			club: {},
			error: ''
		}
	}
	componentDidMount() {

		const wordPressSiteUrl = 'https://baseballjobsoverseas.com';
		this.setState({loading:true}, () =>{
			axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/clubs/${this.props.id}`)
				.then(res => {
                    console.log(res.data);
					this.setState({loading:false, club: res.data});
				})
				.catch(error => this.setState({loading: false, error: error.response.data.message}) )
		});
	}
	render() {
		const {club, error, loading} = this.state;
		return (
			<div>
				<NavbarDrawer />
				<div className="ml-auto mr-auto contentContainer">
					{error && <div className="alert alert-danger">{error}</div>}
					<div className="mt-5">
						{Object.keys(club).length ? (
							<div className="mt-5 col-md-12">
								<div key={club.id} className="" >
									{/* Title */}
									<div className="card-header text-center">
                                        <img className="bannerImage" src={club.acf.banner_image} alt={club.title.rendered + " banner"}/>
                                        <img className="singleProfPic" src={club.acf.profile_picture} alt={club.title.rendered}/>
										<h2>{club.title.rendered}</h2>

									</div>
									{/* Body */}
									<div className="card-body">
										<div className="card-text post-content">
										</div> 
									</div>
									{/* Footer */}
								</div>
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

export default SingleClub;