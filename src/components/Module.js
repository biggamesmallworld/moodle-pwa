import React, {useState, useEffect} from 'react';
import PageWrapper from './PageWrapper';
import axios from 'axios';
import { Redirect, useParams } from 'react-router-dom';
import Page from './modules/Page';
import Forum from './modules/Forum';


function Module(props) {
    const [module, setModule] = useState({});
    const [loading, setLoading] = useState(true);

    const siteUrl = 'https://moodle.develop-modular.com/moodle-3.9';
    const token = '96b784127c9b7107db7c0a986921ca2b';
    const params = useParams(); 
    console.log(params.moduleid);

    useEffect(() => {
        axios.get(`${siteUrl}/webservice/rest/server.php?wsfunction=core_course_get_course_module&wstoken=${token}&cmid=${params.moduleid}&moodlewsrestformat=json`)
          .then(res => {
            setModule(res.data);
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
                   <h3>{module.cm.name}</h3>
                   {module.cm.modname === "page" && <Page />}
                </div>
            }
        </PageWrapper>
    )
}

export default Module;