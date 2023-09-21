import React, {useState, useEffect, useRef, useContext} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../utils/apiHelper";
import UserContext from "../context/UserContext";

function UpdateCourse(props) {
    let params = useParams();
    let courseID = params.id;
    const navigate = useNavigate();

    // State to manage form field values
    const title = useRef('');
    const description = useRef('');
    const estimatedTimeNeeded = useRef('');
    const materialsNeeded = useRef('');


    const [course, setCourse] = useState('');
    const [errors, setErrors] = useState([]);

    // Set Credentials for API Request
    let credentials = null;  // declare an empty credentials variable
    const { authUser } = useContext(UserContext)  //first we check if a user is signed in
    if (authUser) {
        credentials = { // if user is signed in, then we update the credentials variable
            emailAddress: authUser.emailAddress,
            password: authUser.password,
        }
    }


    // Get the initial course information to populate the form... probably doesn't need to be a useEffect
    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${courseID}`)
            .then(response => {
                setCourse(response.data);
                console.log(response.data)
            });
    }, [courseID]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // We only need to pass the fields that are being changed, Sequelize handles the others
        // We are not comparing against response.data for changes, but rather just overwriting the form data to db
        const formData = {
            title: title.current.value,
            description: description.current.value,
            estimatedTimeNeeded: estimatedTimeNeeded.current.value,
            materialsNeeded: materialsNeeded.current.value,
        }

        console.log(`formData:`)
        console.log(formData)


        // uses apiHelper to make the fetch request
        try {
            const response = await api(`/courses/${courseID}`, "PUT", formData, credentials)
            if (response.status === 204) {
                console.log(`${formData.title} is successfully updated`)
                navigate("/")
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.error);
                console.log(`Error returned from server - bad request`)
                console.log(data.error)
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error)
            navigate("/error")
        }



    }

    const handleCancel = (event) => {
        // if the cancel button is clicked we will navigate back 1 page in history
        event.preventDefault();
        navigate(-1)
    }

    // to prevent an error with null values, we use this ternary to check if the value is there or set an empty string
    const firstName = course.User ? course.User.firstName : '';
    const lastName = course.User ? course.User.lastName : '';


    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                { errors.length > 0 ?
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ) )}
                        </ul>
                    </div>
                    :
                    null
                }
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input
                                ref={title}
                                id="courseTitle"
                                name="courseTitle"
                                type="text"
                                defaultValue={course.title}
                            />

                            <p>By {firstName} {lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea
                                ref={description}
                                id="courseDescription"
                                name="courseDescription"
                                defaultValue={course.description}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input
                                ref={estimatedTimeNeeded}
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                defaultValue={course.estimatedTime}
                            />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea
                                ref={materialsNeeded}
                                id="materialsNeeded"
                                name="materialsNeeded"
                                defaultValue={course.materialsNeeded}
                            ></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <button
                        className="button button-secondary"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </form>

            </div>
        </main>
    );

}

export default UpdateCourse;
