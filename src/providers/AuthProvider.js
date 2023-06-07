import { createContext } from "react";
import {useProvideAuth} from '../hooks/';

//set the initial state for authentication
const initialState = {
    user: null,
    login: () => {},
    logout: () => {},
    loading: true, 
    signup: () => {},
    updateUser: () => {}
}

//creating the AuthContext
export const AuthContext = createContext(initialState);

// component used to wrap the app component so that auth state is provided to all child components of App
export const AuthProvider = ({children}) => {
    //fetch the current authentication state
    const auth = useProvideAuth();

    //provide authentication state to children components
    return <AuthContext.Provider value={auth} > {children} </AuthContext.Provider>   //we pass the auth state to AuthContext.Provider so that the state will be available to all the children components
}