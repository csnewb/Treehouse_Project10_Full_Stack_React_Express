import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";
import {api} from "../utils/apiHelper";


function UserSignUp(props) {
    const {actions} = useContext(UserContext)
    const navigate = useNavigate();


    // State
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    // event handlers
    const handleSubmit =  async (event) => {
        event.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        }




        try {
            const response = await api("/users", "POST", user)
            if (response.status === 201) {
                console.log(`${user.emailAddress} is successfully signed up`)
                await actions.signIn(user);
                navigate("/authenticated")
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
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
        navigate("/")
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        ref={firstName}/>

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        ref={lastName}/>

                    <label htmlFor="emailAddress">Email Address</label>
                    <input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        placeholder="Enter your email address"
                        ref={emailAddress} />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        ref={password} />

                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>
                    Already have a user account? Click here to <Link to="/signin">Sign In</Link>!
                </p>
            </div>
        </main>
    );
}

export default UserSignUp;
