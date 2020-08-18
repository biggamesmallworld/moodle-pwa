import React from 'react';
import NavbarDrawer from "./NavbarDrawer";

//here is where I pull in the one post that is attached to my username

class EditProfile extends React.Component {
    render() {
        return (
            <div>
                <NavbarDrawer />
				<div className="ml-auto mr-auto content-container"> 
                    <h2>Edit {this.props.userName}'s profile</h2>
                </div>
            </div>
        );
    }

}

export default EditProfile;