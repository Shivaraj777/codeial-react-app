import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import {editProfile, login as userLogin} from '../api/';
import {signup as userSignup} from '../api/';
import { removeItemsFromLocalStorage, setItemsInLocalStorage, getItemsFromLocalStorage, LOCALSTORAGE_TOKEN_KEY } from "../utils";
import jwt from 'jwt-decode';

// custom hook which will use useContext hook and return the global state(reason to use this custom hook: so that we don't have to useContext hook in every component)
export const useAuth = () => {
  return useContext(AuthContext);   
}

// custom hook which will handle all the functionalities of authentication
export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [userName, setUserName] = useState(user.name);

  //decode the token and update the user state
  useEffect(() => {
    const userToken = getItemsFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    
    if(userToken){
      const user = jwt(userToken);
      setUser(user);
    }

    setLoading(false);
  },[]);

  //function to edit user details
  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);

    if(response.success){
      console.log(response);
      setUser(response.data.user);
      //update the token in local storage as well
      setItemsInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
      return {
        success: true
      }
    }else{
      return {
        success: false,
        message: response.message
      };
    }
  };

  //function for login
  const login = async (email, password) => {
    //get the response from api
    const response = await userLogin(email, password);

    if(response.success){
      //set the user if user exists
      setUser(response.data.user);
      //store the token in local storage
      setItemsInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
      return {
        success: true
      }
    }else{
      return {
        success: false,
        message: response.message
      };
    }
  };

  //function for sign up
  const signup = async (newUser) => {
    const response = await userSignup(newUser);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  //function for logout
  const logout = () => {
    setUser(null);
    removeItemsFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  //return the global state
  return {
    user,
    loading,
    login,
    logout,
    signup,
    updateUser
  };
};