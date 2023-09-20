import React, {useState, useEffect, useContext} from 'react';
import {NavLink, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import UserContext from "../context/UserContext";
import {api} from "../utils/apiHelper";

function CourseDetails() {
    let params = useParams();
    let courseID = params.id
    const navigate = useNavigate();  // Use the useHistory hook


    const [course, setCourse] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${courseID}`)
            .then(response => {
                setCourse(response.data);
                console.log(response.data)
            });
    }, []);


    const firstName = course.User ? course.User.firstName : '';
    const lastName = course.User ? course.User.lastName : '';
    const emailAddress = course.User ? course.User.emailAddress : '';

    // Set Credentials for API Request
    const { authUser } = useContext(UserContext)
    const credentials = {
        emailAddress: authUser.emailAddress,
        password: authUser.password,
    }


    // Check for ownership of the course
    let isSameUser = false;
    if (authUser.emailAddress == emailAddress  ) {
        console.log(`User: ${firstName} owns this course and is authorized to make changes`)
        isSameUser = true;
    } else {
        console.log(`User: ${firstName} does NOT own this course and is NOT authorized to make changes`)
    }



    const handleDelete = async () => {
        // axios.delete(`http://localhost:5000/api/courses/${courseID}`)
        //     .then(response => {
        //         if (response.status === 204) {
        //             navigate("/");  // Redirect to root path
        //         } else {
        //             console.error('Failed to delete course');
        //         }
        //     }).catch(error => {
        //     console.error('Error:', error);
        // });
        // uses apiHelper to make the fetch request
        try {
            const response = await api(`/courses/${courseID}`, "DELETE", null, credentials)
            if (response.status === 204) {
                console.log(`${courseID} is successfully deleted`)
                navigate("/")
            } else if (response.status === 400) {
                const data = await response.json();
                console.log(`Error returned from server - bad request`)
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error)
            navigate("/error")
        }



    }



    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {isSameUser ?
                        <>
                            <NavLink className="button" to={`/courses/${courseID}/update`}>Update Course</NavLink>
                            <button className="button" onClick={handleDelete}>Delete Course</button>
                        </>
                    :
                        null
                    }
                    <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                </div>
            </div>

            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {firstName} {lastName}</p>
                            <ReactMarkdown children={course.description}/>



                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown children={course.materialsNeeded}/>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default CourseDetails;
