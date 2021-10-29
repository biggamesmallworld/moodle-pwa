import React, {useState, useEffect} from 'react';
import PageWrapper from '../PageWrapper';
import axios from 'axios';
import { Redirect, useParams } from 'react-router-dom';


function Page(props) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const siteUrl = 'https://moodle.develop-modular.com/moodle-3.9';
    const token = '96b784127c9b7107db7c0a986921ca2b';
    const params = useParams(); 
    console.log(params.moduleid);

    useEffect(() => {
        axios.get(`${siteUrl}/webservice/rest/server.php?wsfunction=mod_page_get_pages_by_courses&courseids[0]=${props.courseid}&wstoken=${token}&moodlewsrestformat=json`)
          .then(res => {
            setData(res.data);
            console.log(res.data);
            setLoading(false);
          })
          .catch(err => {
              console.log(err);
          })
      }, []);
      
    return (
        <div>
            {!loading &&
                <div className="col-md-12">
                   <h3>Test</h3>
                </div>
            }
        </div>
    )
}

export default Page;