import styles from '../styles/home.module.css';
import {CreatePost, FriendsList, Loader, Post} from '../components/';
import { useAuth, usePosts } from '../hooks';
// import PropTypes from 'prop-types';

function Home() {
  //define the global auth and posts state
  const auth = useAuth();
  const posts = usePosts();

  //if loader is set to true, the page keeps loading 
  if(posts.loading){
    return <Loader />
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        {auth.user && <CreatePost />}
        {posts.data.map((post) => (
          // Post container
          <Post post={post} key={`post-${post._id}`}/>
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
}

//define the types of props that Home component can take as input
// Home.propTypes = {
//   posts: PropTypes.array.isRequired
// }

export default Home;