import {getPosts} from '../api';
import { useEffect } from 'react';
import {Home} from '../pages';

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
      <Home />
    </div>
  );
}

export default App;
