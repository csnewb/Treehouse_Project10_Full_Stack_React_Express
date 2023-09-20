import React from 'react';
import {Link} from "react-router-dom";


function ErrorPage() {
    return (
        <>
            <h2>Error:</h2>
            <h2>Sorry, something unexpected occurred.</h2>
            <p>Return to <Link to="/">Home Page</Link>.</p>


        </>
    )
}


export default ErrorPage;