import React from 'react';
import NavbarDrawer from "./NavbarDrawer";
import axios from 'axios';
import { Link } from '@reach/router';
import renderHTML from 'react-render-html';
//import Moment from 'react-moment';
import Loader from '../loader.gif';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading:false,
			posts: [],
			error: '',
			search: ''
		}
	}

	searchSpace=(event)=>{
		let keyword = event.target.value;
		this.setState({search: keyword})
	}

	componentDidMount() {
		const wordPressSiteUrl = 'https://baseballjobsoverseas.com';

		this.setState({loading:true}, () =>{
			axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/posts`)
				.then(res => {
					this.setState({loading:false, posts: res.data});
				})
				.catch(error => this.setState({loading: false, error: error.response.data.message}) )
		});
	}
	render() {
		const { posts, loading, error } = this.state;
		const items = posts.filter((data)=>{
			if(this.state.search === '')
				return data;
			else if (data.title.rendered.toLowerCase().includes(this.state.search.toLowerCase())){
				return data;
			} else {
				return null;
			}
		});
		return (
			<div>
				<NavbarDrawer />
				<div className="ml-auto mr-auto content-container col-md-8">
					{error && <div className="alert alert-danger">{error}</div>}
					{/* Search Form */}
					<form className=" form-inline d-flex justify-content-center md-form form-sm active-cyan active-cyan-2  mb-4 searchForm">
						<FontAwesomeIcon icon={faSearch} size="1x" />
						<input 
							className="searchBar" 
							type="text" 
							placeholder="Search"
							aria-label="Search"
							onChange={(e)=>this.searchSpace(e)}
						/>
					</form>
					<div className="mt-5 ">
						{items.length ? (
							<div className="mt-5 ">
								{items.map(post => (
										<div key={post.id} className="card border-dark mb-3" >
											{/* Title */}
											<div className="card-header">
												<div className="w-100 text-center mb-3">
													<img className="postFeaturedImage m-auto" src={post.fimg_url} alt={post.title.rendered}/>
												</div>
												<h2>
													<Link to={`/post/${post.id}`}>
														{renderHTML(post.title.rendered)}
													</Link>
												</h2>
											</div>
											{/* Body */}
											<div className="card-body">
												<div className="card-text post-content">
													{renderHTML(post.excerpt.rendered)}
												</div> 
											</div>
											{/* Footer */}
											<div className="card-footer">
												{/*<Moment fromNow>{post.date}</Moment>*/}
												<Link to={`/post/${post.id}`} className="btn btn-secondary float-right">Read More</Link>
											</div>
										</div>
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

export default Home;