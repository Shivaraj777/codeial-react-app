import React from 'react'
import styles from '../styles/home.module.css';
import UserPicture from '../images/man.png';
import Like from '../images/heart.png';
import CommentImg from '../images/chat-bubble.png';
import {Comment, CreatePost, FriendsList, Loader} from '../components/';
import { Link } from 'react-router-dom';
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
          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img src={UserPicture} alt="user-pic"/>
                <div>
                  <Link to={`/users/${post.user._id}`} state={{user: post.user}} className={styles.postAuthor}>
                      {post.user.name}
                  </Link>
                  <span className={styles.postTime}>a minute ago</span>
                </div>
              </div>
              <div className={styles.postContent}>{post.content}</div>

              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <img
                    src={Like}
                    alt="likes-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <img
                    src={CommentImg}
                    alt="comments-icon"
                  />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>

              {/* Display the comments of posts */}
              <div className={styles.postCommentsList}>
                {post.comments.map((comment) => (
                  <Comment comment={comment} key={`comment-${comment._id}`}/>
                ))}
              </div>
            </div>
          </div>
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