import React from 'react';
import {Route, Routes} from "react-router-dom";


import '../css/reset.css'
import '../css/global.css'
import CourseDetail from "./CourseDetail";
import Courses from "./Courses";
import Header from "./Header";
import UpdateCourse from "./UpdateCourse";
import UserSignIn from "./UserSignIn";
import UserSignOut from "./UserSignOut";
import UserSignUp from "./UserSignUp";
import CreateCourse from "./CreateCourse";
import Error404 from "./Error404";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./ErrorPage";

function App() {


    return (
        <div className="App">

            <Header />
            <Routes>
                <Route path="/" element={<Courses/>}/>
                <Route path="/courses/:id" element={<CourseDetail/>}/>
                <Route path="/signin" element={<UserSignIn/>}/>
                <Route path="/signup" element={<UserSignUp/>}/>
                <Route path="/signout" element={<UserSignOut/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="/courses/create" element={<CreateCourse/>}/>
                    <Route path="/courses/:id/update" element={<UpdateCourse/>}/>
                </Route>
                <Route path="/error" element={<ErrorPage/>}/>
                <Route path="*" element={<Error404/>}/>
            </Routes>
        </div>
    );
}

export default App;

