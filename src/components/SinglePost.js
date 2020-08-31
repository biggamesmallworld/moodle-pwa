import React from 'react';
import NavbarDrawer from "./NavbarDrawer";
import axios from 'axios';
import renderHTML from 'react-render-html';
import Moment from 'react-moment';
import Loader from '../loader.gif';

class SinglePost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading:false,
			post: {},
			error: ''
		}
	}
	componentDidMount() {

		const wordPressSiteUrl = 'https://baseballjobsoverseas.com';
		this.setState({loading:true}, () =>{
			axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/posts/${this.props.id}`)
				.then(res => {
					this.setState({loading:false, post: res.data});
				})
				.catch(error => this.setState({loading: false, error: error.response.data.message}) )
		});
	}
	render() {
		const {post, error, loading} = this.state;
		return (
			<div>
				<NavbarDrawer />
				<div class="ml-auto mr-auto contentContainer col-md-8">
					{error && <div className="alert alert-danger">{error}</div>}
					{Object.keys(post).length ? (
						<div className="mt-2 ">
							<div key={post.id} className="card  mb-3 " >
								{/* Title */}
								<div className="card-header">
									<div className="w-100 text-center mb-3">
										<img className="postFeaturedImage m-auto" src={post.fimg_url} alt={post.title.rendered}/>
									</div>
									<h2>
										{renderHTML(post.title.rendered)}
									</h2>
								</div>
								{/* Body */}
								<div className="card-body">
									<div className="card-text post-content">
										{renderHTML(post.content.rendered)}
									</div> 
								</div>
								{/* Footer */}
								<div className="card-footer">
									<Moment fromNow>{post.date}</Moment>
								</div>
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
		)
	}
}

export default SinglePost;