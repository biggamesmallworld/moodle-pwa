import React, {useState, useEffect} from 'react';
import PageWrapper from './PageWrapper';
import axios from 'axios';
import { Redirect, useParams, Link } from 'react-router-dom';

function Account(props) {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState({})

    const siteUrl = 'https://moodle.develop-modular.com/moodle-3.9';
    const token = '96b784127c9b7107db7c0a986921ca2b';
    const userid = localStorage.getItem('userid');
    const params = useParams(); 

    useEffect(() => {
        axios.get(`${siteUrl}/webservice/rest/server.php?wsfunction=core_user_get_users_by_field&field=id&values[0]=${userid}&wstoken=${token}&moodlewsrestformat=json`)
            .then(res => {
                setUserData(res.data[0]);
                console.log(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
      }, []);
      
    return (
        <PageWrapper>
            {!loading &&
                <div className="col-md-12">
                   <img src={userData.profileimageurl} />
                   <h3>{userData.fullname}</h3>
                </div>
            }
        </PageWrapper>
    )
}

export default Account;