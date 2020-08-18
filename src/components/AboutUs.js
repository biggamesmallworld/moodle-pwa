import React from 'react';
import axios from 'axios';
import renderHTML from 'react-render-html';
import Loader from '../loader.gif';
import NavbarDrawer from './NavbarDrawer';



class AboutPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading:false,
			page: {},
			pageContent: '',
			error: ''
		}
	}
	componentDidMount() {

		const wordPressSiteUrl = 'https://baseballjobsoverseas.com';
		this.setState({loading:true}, () =>{
			axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/pages/405835`)
				.then(res => {
					let filteredContent = res.data.content.rendered.sub
					this.setState({loading:false, page: res.data, pageContent: filteredContent});
				})
				.catch(error => this.setState({loading: false, error: error.response.data.message}) )
		});
	}
	render() {
		const { page, error, loading} = this.state;
		return (
			<div>
				<NavbarDrawer />
				<div className="ml-auto mr-auto content-container col-md-8">
					{error && <div className="alert alert-danger">{error}</div>}
					{Object.keys(page).length ? (
						<div className="mt-5">
							<div key={page.id} className="card mb-3" >
								{/* Body */}
								<div className="card-body">
									<h3 className="text-center">{page.title.rendered}</h3>
									<div className="card-text post-content">
										{renderHTML(page.content.rendered)}
									</div> 
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

export default AboutPage;