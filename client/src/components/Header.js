import React from 'react';
import {NavLink} from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";


function Header() {

    const { authUser     } = useContext(UserContext)

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="/">Courses</a></h1>
                <nav>
                    {authUser === null ?
                        <>
                            <ul className="header--signedout">
                                <li><NavLink to='/signup'>Sign Up</NavLink></li>
                                <li><NavLink to='/signin'>Sign In</NavLink></li>
                            </ul>
                        </>
                        :
                        <>
                            <ul className="header--signedin">
                                <li>Welcome {authUser.firstName}</li>
                                <li><NavLink to='/signOut'>Sign Out</NavLink></li>
                            </ul>
                        </>
                    }
                </nav>
            </div>
        </header>
    );
}

export default Header;
