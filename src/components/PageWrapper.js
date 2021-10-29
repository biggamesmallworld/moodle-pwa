import React from 'react';
import {Link} from "react-router-dom";

function PageWrapper(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark" id="mainNav">
                <div className="container">
                    <Link className="navbar-brand js-scroll-trigger" to="/"><img src="assets/img/navbar-logo.svg" alt="" /></Link>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars ml-1"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav text-uppercase ml-auto">
                            
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to="/dashboard/">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to="/my-account/">My Account</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {props.children}
        </div>
    )
};

export default PageWrapper;