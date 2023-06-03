import React from 'react'
import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';

function Comment({comment}) {
  return (
      <div className={styles.postCommentsItem}>
        <div className={styles.postCommentHeader}>
          <span className={styles.postCommentAuthor}>{comment.user.name}</span>
          <span className={styles.postCommentTime}>a minute ago</span>
          <span className={styles.postCommentLikes}>{comment.likes.length}</span>
        </div>

        <div className={styles.postCommentContent}>{comment.content}</div>
      </div>
  );
}

// define the types of props that Comment component can take as input
Comment.propTypes = {
  comment: PropTypes.object.isRequired
}

export default Comment;
