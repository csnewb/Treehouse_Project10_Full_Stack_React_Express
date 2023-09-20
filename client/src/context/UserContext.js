import { createContext, useState} from "react";
import Cookies from "js-cookie"
import {api} from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const cookie = Cookies.get("authenticatedUser");
  const [authUser, setAuthUser]  = useState(cookie ? JSON.parse(cookie) : null);


  const signIn = async (credentials) => {

    const response = await api("/users", "GET", null, credentials)
    if (response.status === 200) {
      const user = await response.json();
      console.log(`SUCCESS: ${user.emailAddress} is signed in`);
      setAuthUser(user);
      Cookies.set("authenticatedUser", JSON.stringify(user),{expires: 1});
      return user

    }
    else if (response.status === 401) {
      console.log("Could not find user");
      return null
    }
    else {
      throw new Error();
    }
  }

  const signOut = () => {
    setAuthUser(null);
    console.log("User Logged Out");
    Cookies.remove("authenticatedUser")

  }

  return (
    <UserContext.Provider value={{
      authUser,
      actions: {
        signIn,
        signOut,
      }
    }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;