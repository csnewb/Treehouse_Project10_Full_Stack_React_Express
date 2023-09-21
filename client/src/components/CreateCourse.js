import React, {useState, useRef, useContext} from 'react';
import {api} from "../utils/apiHelper";
import {useNavigate} from "react-router-dom";
import UserContext from "../context/UserContext";

function CreateCourse(props) {

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    // State to manage form field values
    const title = useRef('');
    const description = useRef('');
    const estimatedTime = useRef('');
    const materialsNeeded = useRef('');


    // Set Credentials for API Request
    let credentials = null;  // declare an empty credentials variable
    const { authUser } = useContext(UserContext)  //first we check if a user is signed in
    if (authUser) {
        credentials = { // if user is signed in, then we update the credentials variable
            emailAddress: authUser.emailAddress,
            password: authUser.password,
        }
    }

    // Get userId
    const userId = authUser.id
    console.log(`userId: ${userId}`)


    const handleSubmit = async (event) => {
        event.preventDefault();

        // We only need to pass the fields that are being changed, Sequelize handles the others
        // We are not comparing against response.data for changes, but rather just overwriting the form data to db
        const formData = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: userId,
        }

        console.log(`formData:`)
        console.log(formData)


        // uses apiHelper to make the fetch request
        try {
            const response = await api(`/courses`, "POST", formData, credentials)
            if (response.status === 201) {
                console.log(`${formData.title} is successfully created`)
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
        event.preventDefault();
        navigate(-1)
    }




    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
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
                                id="courseTitle"
                                name="courseTitle"
                                type="text"
                                ref={title}
                            />

                            <p>By {authUser.firstName} {authUser.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea
                                id="courseDescription"
                                name="courseDescription"
                                ref={description}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                ref={estimatedTime}
                            />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                ref={materialsNeeded}
                            ></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
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

export default CreateCourse;
