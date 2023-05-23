import {getPosts} from '../api';
import { useEffect } from 'react';

function App() {
  //fetch the posts from api
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('Response: ', response);
    }

    fetchPosts();
  }, []);

  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;
