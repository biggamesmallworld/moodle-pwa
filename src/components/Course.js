import React, {useState, useEffect} from 'react';
import PageWrapper from './PageWrapper';
import axios from 'axios';
import { Redirect, useParams, Link } from 'react-router-dom';


function Course(props) {
    const [sections, setSections] = useState({});
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState({})

    const siteUrl = 'https://moodle.develop-modular.com/moodle-3.9';
    const token = '96b784127c9b7107db7c0a986921ca2b';
    const params = useParams(); 

    useEffect(() => {
        axios.get(`${siteUrl}/webservice/rest/server.php?wsfunction=core_course_get_contents&wstoken=${token}&courseid=${params.id}&moodlewsrestformat=json`)
            .then(res => {
                setSections(res.data);
                console.log(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
        /*axios.get(`${siteUrl}/webservice/rest/server.php?wsfunction=core_course_get_courses_by_field&wstoken=${token}&shortname=${params.shortname}&moodlewsrestformat=json`)
            .then(res => {
                console.log(res.data);
                setCourse(res.data);
                course && axios.get(`${siteUrl}/webservice/rest/server.php?wsfunction=core_course_get_contents&wstoken=${token}&courseid=${course.id}&moodlewsrestformat=json`)
                    .then(res => {
                        setSections(res.data);
                        console.log(res.data);
                        setLoading(false);
                    })
            })
            .catch(err => {
                console.log(err);
            })*/
      }, []);
      
    return (
        <PageWrapper>
            {!loading &&
                <div className="col-md-12">
                   {sections.map((section, index) => {
                       return (
                           <div key={index} className="w-100">
                               <h4>{section.name}</h4>
                               {section.modules.map((mod, index2) => {
                                   return(
                                       <p key={index2}>
                                            <Link to={`/course/${params.id}/${mod.id}`}>
                                            {mod.name}
                                            </Link>
                                        </p>
                                   )
                               })}
                            </div>
                        )
                   })}
                </div>
            }
        </PageWrapper>
    )
}

export default Course;