import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import {login as userLogin} from '../api/';

// custom hook which will use useContext hook and return the global state(reason to use this custom hook: so that we don't have to useContext hook in every component)
export const useAuth = () => {
  return useContext(AuthContext);   
}

// custom hook which will handle all the functionalities of authentication
export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    //get the response from api
    const response = await userLogin(email, password);

    if(response.success){
      setUser(response.data.user);
      return {
        success: true
      }
    }else{
      return {
        success: false,
        message: response.message
      }
    }
  };

  const logout = () => {
    setUser(null);
  };

  //return the global state
  return {
    user,
    loading,
    login,
    logout
  };
};