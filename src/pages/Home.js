import React from 'react'
import {getPosts} from '../api';
import { useState, useEffect } from 'react';
import styles from '../styles/home.module.css';
import UserPicture from '../images/man.png';
import Like from '../images/heart.png';
import CommentImg from '../images/chat-bubble.png';
import {Comment, Loader} from '../components/';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

function Home() {
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
    // Container for all the posts
    <div className={styles.postsList}>
      {posts.map((post) => (
        // Post container
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img src={UserPicture} alt="user-pic"/>
              <div>
                <Link to={`/user/${post.user._id}`} state={{user: post.user}} className={styles.postAuthor}>
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
  );
}

//define the types of props that Home component can take as input
// Home.propTypes = {
//   posts: PropTypes.array.isRequired
// }

export default Home;