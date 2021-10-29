import React, {useState, useEffect} from 'react';
import PageWrapper from '../PageWrapper';
import axios from 'axios';
import { Redirect, useParams } from 'react-router-dom';


function Forum(props) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const siteUrl = 'https://moodle.develop-modular.com/moodle-3.9';
    const token = '96b784127c9b7107db7c0a986921ca2b';
    const params = useParams(); 
    console.log(params.moduleid);

    useEffect(() => {
        axios.get(`${siteUrl}/webservice/rest/server.php?wsfunction=mod_forum_get_discussion_posts&wstoken=${token}&moodlewsrestformat=json`)
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
        <PageWrapper>
            {!loading &&
                <div className="col-md-12">
                   <h3>Test</h3>
                </div>
            }
        </PageWrapper>
    )
}

export default Forum;