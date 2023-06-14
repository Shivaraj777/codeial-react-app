import { createContext } from "react";
import {useProvidePosts} from '../hooks/';

//set the initial state for posts
const initialState = {
    posts: [],
    loading: false,
    addPostToState: () => {},
    updatePostComments: () => {}
}

//creating the PostsContext
export const PostsContext = createContext(initialState);

// component used to wrap the app component so that posts state is provided to all child components of App
export const PostsProvider = ({children}) => {
    //fetch the current posts state
    const posts = useProvidePosts();

    //provide posts state to children components
    return <PostsContext.Provider value={posts} > {children} </PostsContext.Provider>   //we pass the posts state to PostsContext.Provider so that the state will be available to all the children components
}