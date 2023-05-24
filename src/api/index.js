// Entry point for APIs

import {API_URLS, LOCALSTORAGE_TOKEN_KEY} from '../utils';

//global fetch function to make api calls
const customFetch = async (url, {body, ...customConfig}) => {
  //get the access token
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  //define the data to be sent and accepted in application
  const headers = {
    'content-type': 'application/json',  //application/json
    Accept: 'application/json'
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
    config.body = JSON.stringify(body);
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

export const getPosts = (page=1, limit=5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET'
    // mode: 'no-cors'
  });
}

/* customConfig can contain:
  {
    method: post/get/patch/put
    headers: ....
  }
*/