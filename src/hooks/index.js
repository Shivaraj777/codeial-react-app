import { useState } from "react";

// custom hook which will handle all the functionalities of authentication
export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (email, password) => {};

    const logout = () => {};

    //return the global state
    return {
        user,
        loading,
        login,
        logout
    };
};