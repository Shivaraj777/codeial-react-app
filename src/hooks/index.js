import { useState, useContext, useEffect } from "react";
import { AuthContext, PostsContext } from "../providers/";
import {editProfile, getPosts, getUserFriends, login as userLogin} from '../api/';
import {signup as userSignup} from '../api/';
import { removeItemsFromLocalStorage, setItemsInLocalStorage, getItemsFromLocalStorage, LOCALSTORAGE_TOKEN_KEY } from "../utils";
import jwt from 'jwt-decode';

/* Global Authentication state */

// custom hook which will use useContext hook and return the global state(reason to use this custom hook: so that we don't have to useContext hook in every component)
export const useAuth = () => {
  return useContext(AuthContext);   
}

// custom hook which will handle all the functionalities of authentication
export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  // const [userFriends, setUserFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [userName, setUserName] = useState(user.name);

  //decode the token and update the user state(page refresh scenario)
  useEffect(() => {
    const updateUser = async () => {
      const userToken = getItemsFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      let friends = [];

      if(userToken){
        const user = jwt(userToken);
        friends = await fetchFriends();  //as user friends are not present in token, fetch friends and addit to user state
        setUser({...user, friends});
      }

      setLoading(false);
    }

    updateUser();
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

  //function to fetch current user friends(user should be logged in)
  const fetchFriends = async () => {
    const response = await getUserFriends();

    let friends = [];
    if(response.success){
      friends = response.data.friends;
    }

    return friends;
  }

  //function for login
  const login = async (email, password) => {
    //get the response from api
    const response = await userLogin(email, password);

    if(response.success){
      const userData = response.data.user;
      //store the token in local storage
      setItemsInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
      //fetch friends of user and add it to user state
      let friends = await fetchFriends();
      setUser({...userData, friends});
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

  //function to update the users friends in state
  const updateUserFriends = (addFriend, friend) => {
    if(addFriend){
      setUser({
        ...user,
        friends: [...user.friends, friend]
      });
    }else{
      const friendId = friend.to_user._id;
      const updatedFriends = user.friends.filter((friendX) => friendX.to_user._id !== friendId);

      setUser({
        ...user,
        friends: [...updatedFriends]
      });
    }
    return;
  }

  //return the global state
  return {
    user,
    loading,
    login,
    logout,
    signup,
    updateUser,
    updateUserFriends
  };
};

/* Global Posts state */

// custom hook which will use useContext hook and return the global state
export const usePosts = () => {
  return useContext(PostsContext);   
}

//custom hook which will handle the functions of posts
export const useProvidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //fetch the posts from api(ComponentDidMount)
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('Response: ', response);

      //if post is fetched successfully
      if(response.success){
        setPosts(response.data.posts);
      }
      setLoading(false); //set Loader to false after fetching the posts
    }

    fetchPosts();
  }, []);

  const addPostToState = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return {
    data: posts,
    loading,
    addPostToState
  }
}