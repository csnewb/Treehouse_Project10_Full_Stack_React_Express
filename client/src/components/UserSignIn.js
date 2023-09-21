import { useContext, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserContext from "../context/UserContext";

function UserSignIn(props) {
    const { actions } = useContext(UserContext)
    const navigate = useNavigate();
    const location = useLocation();

    // State
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    // Event Handlers
    const handleSubmit = async (event) => {
        event.preventDefault();
        let from = '/';
        if (location.state) {
            from = location.state.from
        }

        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        };

        try {
            const user = await actions.signIn(credentials);
            if (user) {
                navigate(from)
            }
            else {
                setErrors(["Sign in was unsuccessful"])
            }

        }
        catch (error) {
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
                <h2>Sign In</h2>
                { errors ?
                    <p>{errors[0]}</p>
                    :
                    null
                }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        ref={emailAddress}
                        placeholder="email@somewhere.com"/>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        ref={password}
                        placeholder="Password" />
                    <button className="button" type="submit">Sign In</button>
                    <button
                        className="button button-secondary"
                        onClick={handleCancel}>Cancel</button>
                </form>
                <p>
                    Don't have a user account? Click here to <Link to="/signup">Sign Up</Link>!
                </p>
            </div>
        </main>


    );
}

export default UserSignIn;
