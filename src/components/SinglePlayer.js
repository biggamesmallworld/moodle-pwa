import React from 'react';
import NavbarDrawer from "./NavbarDrawer";
import axios from 'axios';
import Loader from '../loader.gif';

class SinglePlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading:false,
			player: {},
			error: ''
		}
	}
	componentDidMount() {

		const wordPressSiteUrl = 'https://baseballjobsoverseas.com';
		this.setState({loading:true}, () =>{
			axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/players/${this.props.id}`)
				.then(res => {
                    console.log(res.data);
					this.setState({loading:false, player: res.data});
				})
				.catch(error => this.setState({loading: false, error: error.response.data.message}) )
		});
	}
	render() {
		const {player, error, loading} = this.state;
		return (
			<div>
				<NavbarDrawer />
				<div className="ml-auto mr-auto contentContainer">
					{error && <div className="alert alert-danger">{error}</div>}
					<div className="mt-5">
						{Object.keys(player).length ? (
							<div className="mt-5 col-md-12">
								<div key={player.id} className="" >
									{/* Title */}
									<div className="card-header text-center">
                                        <img className="bannerImage" src={player.acf.banner_image} alt={player.acf.first_name + " " + player.acf.last_name + ' cover photo'}/>
                                        <img className="singleProfPic" src={player.acf.profile_picture} alt={player.acf.first_name + " " + player.acf.last_name}/>
                                        <h2>{player.acf.first_name + " " + player.acf.last_name}</h2>
										<h2>{player.title.rendered}</h2>

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

export default SinglePlayer;