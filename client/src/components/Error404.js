import React from 'react';
import {Link} from "react-router-dom";


function Error404() {
    return (
        <>
            <h2>Error: 404</h2>
            <h2> Oops! It looks like the page you are looking for cannot be found.</h2>
            <p>Please check your spelling and try again.</p>
            <p>Return to <Link to="/">Home Page</Link>.</p>


        </>
    )
}


export default Error404;