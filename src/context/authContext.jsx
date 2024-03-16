import React from "react";
import { useEffect } from "react";
import { saveActivity } from "../services/usersService";
const AuthContext = React.createContext(false);


const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(false);   // Login Not = false // login Yes = {user object}

  // to get LocalState user Login on reload Page
  useEffect(()=>{
    const user= localStorage.getItem("user_session");
    const login= localStorage.getItem("auth");
    console.log(user, login,5252)

    if(login && login === "true"){
      let userData= JSON.parse(user)
      setAuth(userData)
    }else{
      setAuth(false)
    }

  },[])

  const saveLogin=(login)=>{
    localStorage.setItem("user_session", JSON.stringify(login));
    localStorage.setItem("auth", JSON.stringify(true));
    setAuth(login)
  }

  const logout=()=>{
    saveActivity("logged out");
    localStorage.setItem("user_session", null);
    localStorage.setItem("auth", false);
    setAuth(false)
  }
  
  return (
    <AuthContext.Provider value={{auth,setAuth, saveLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };
