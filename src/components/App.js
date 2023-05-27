import {getPosts} from '../api';
import { useState, useEffect } from 'react';
import {Home, Login} from '../pages';
import {Loader, Navbar} from './';
import { Routes, Route } from 'react-router-dom';

function App() {
  //define the state for posts and loader
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  //fetch the posts from api
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('Response: ', response);

      //if post is fetched successfully
      if(response.success){
        setPosts(response.data.posts);
      }
      setLoader(false); //set Loader to false after fetching the posts
    }

    fetchPosts();
  }, []);

  //if loader is set to true, the page keeps loading 
  if(loader){
    return <Loader />
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home posts={posts} />} />
        <Route exact path='/login' element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
