import { useContext } from "react";
import UserContext from "../context/UserContext";
import {Outlet, Navigate} from "react-router-dom";
import {useLocation} from "react-router-dom";


const PrivateRoute = () => {
    const{authUser} = useContext(UserContext);
    const location = useLocation();


    if (authUser) {
        return <Outlet />

    } else {
        return <Navigate to="/signin" state={{from: location.pathname}}/>
    }


}

export default PrivateRoute