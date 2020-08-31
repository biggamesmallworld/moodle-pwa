import React from 'react';
import NavbarDrawer from "./NavbarDrawer";
import axios from 'axios';
import { Link } from '@reach/router';
import renderHTML from 'react-render-html';
//import Moment from 'react-moment';
import Loader from '../loader.gif';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfiniteScroll from 'react-infinite-scroll-component';


class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading:false,
			posts: [],
			error: '',
			search: '',
			page: 2,
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

	fetchMoreData = () => {
		const wordPressSiteUrl = 'https://baseballjobsoverseas.com';
		console.log(this.state.page);

		axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/posts?page=${this.state.page}`)
			.then(res => {
				console.log(`${wordPressSiteUrl}/wp-json/wp/v2/posts?page=${this.state.page}`);
				this.setState({loading:false, posts: this.state.posts.concat(res.data), page: this.state.page + 1});
			})
			.catch(error => this.setState({loading: false, error: error.response.data.message}));

	};


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
				<div className="ml-auto mr-auto contentContainer col-md-8">
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
					{items.length ? (
						<div className="mt-5 ">
							<InfiniteScroll
								dataLength={this.state.posts.length}
								style={{overflow: 'visible !important'}}
								next={this.fetchMoreData}
								hasMore={true}
								loader={
									<div className="loaderContainer w-100">
										<img src={Loader} className="loader m-auto" alt="Loader" /> 
									</div>}
							>
								{items.map(post => (
										<div key={post.id} className="card listItem mb-3" >
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
											<div className="excerptContainer">
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
							</InfiniteScroll>
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

export default Home;