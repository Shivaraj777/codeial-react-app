import React from 'react'
import styles from '../styles/home.module.css';
import UserPicture from '../images/man.png';
import Like from '../images/heart.png';
import Comment from '../images/chat-bubble.png';
import PropTypes from 'prop-types';

function Home({posts}) {
  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src={UserPicture}
              alt="user-pic"
            />
            <div>
              <span className={styles.postAuthor}>{post.user.name}</span>
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
                src={Comment}
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input placeholder="Start typing a comment" />
          </div>

          <div className={styles.postCommentsList}>
            <div className={styles.postCommentsItem}>
              <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>Bill</span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <span className={styles.postCommentLikes}>22</span>
              </div>

              <div className={styles.postCommentContent}>Random comment</div>
            </div>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
}

//define the types of props that Home component can take as input
Home.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Home;