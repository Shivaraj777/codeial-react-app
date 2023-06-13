// Entry point for APIs

import {API_URLS, LOCALSTORAGE_TOKEN_KEY} from '../utils';
import { getFormBody } from '../utils';

//global fetch function to make api calls
const customFetch = async (url, {body, ...customConfig}) => {
  //get the access token
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  //define the data to be sent and accepted in application
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',  //application/json
    // Accept: 'application/json'
  };

  //if the token exists in local storage, add it to Authorization header
  if(token){
    headers.Authorization = `Bearer ${token}`;
  }

  //define the configuration for fetch
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };

  //if config data(JS object) is present in body, add it to config
  if(body){
    config.body = getFormBody(body);
  }

  try{
    //fetch data from api
    const response = await fetch(url, config); 
    const data = await response.json(); //convert to json object(response.json() returns a promise)

    //if data is fetched successfully
    if(data.success){
      return {
        data: data.data,
        success: true
      };
    }

    //if data is not fetched successfully
    throw new Error(data.message);
  }catch(error){
    console.log(error);
    return {
      message: error.message,
      success: false
    };
  }
}

//function to fetch the posts from API
export const getPosts = (page=1, limit=5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET'
    // mode: 'no-cors'
  });
}

//function to fetch user details from login API
export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: {
      email,
      password
    }
  });
};

//function to sign up user using signup API
export const signup = (newUser) => {
  console.log(newUser);
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      confirm_password: newUser.confirmPassword
    }
  });
};

//function to fetch response for editing user profile
export const editProfile = (userId, name, password, confirmPassword) => {
  return customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: {
      id: userId,
      name,
      password,
      confirm_password: confirmPassword
    }
  });
}

//function to fetch user details
export const getUserProfile = (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: 'GET'
  });
}

//function to fetch the friends of a user(uses token at BE to identify user)
export const getUserFriends = () => {
  return customFetch(API_URLS.friends(), {
    method: 'GET'
  });
}

//function to add a friend
export const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: 'POST'
  });
}

//function to remove a friend
export const unFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: 'POST'
  });
}

export const addPost = (postContent) => {
  return customFetch(API_URLS.createPost(), {
    method: 'POST',
    body: {
      content: postContent
    }
  });
}

/* customConfig can contain:
  {
    method: post/get/patch/put
    headers: ....
  }
*/