import React, {useState, useEffect} from 'react';
import PageWrapper from './PageWrapper';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';


function Dashboard(props) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const siteUrl = 'https://moodle.develop-modular.com/moodle-3.9';
    const token = '96b784127c9b7107db7c0a986921ca2b';
    const userid = localStorage.getItem('userid');
    console.log(userid);

    const site2Url = 'https://naimc.develop-modular.com/';
    const token2 = '4c7bff2215de17678865f0f63d5a1404';

    useEffect(() => {
        axios.get(`${siteUrl}/webservice/rest/server.php?wsfunction=core_enrol_get_users_courses&wstoken=${token}&userid=${userid}&moodlewsrestformat=json`)
          .then(res => {
            let courses = res.data;
            setData({ courses: courses });
            console.log(courses);
            setLoading(false);
            axios.get(`${site2Url}/webservice/pluginfile.php/54/mod_data/content/6/Annex%201%20TOM%20Hetzner.pdf?token=${token2}`)
                .then((res2) => {
                    console.log(res2);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
      }, [userid]);
      
    return (
        <PageWrapper>
            <h2>My Courses</h2>
            {userid ?
                <div className="row col-md-12">
                    {!loading && data.courses.map((course, index) => {
                        return (
                            <Link to={`/course/${course.id}`} key={index} className="col-md-4 p-3">
                                <div className="single-course shadow rounded p-3">
                                    <p>{course.fullname}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                
            :
                <Redirect to='/login' />
            }
        </PageWrapper>
    )
}

export default Dashboard;