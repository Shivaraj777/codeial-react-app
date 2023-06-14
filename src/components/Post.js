import React, { useState } from 'react';
import styles from '../styles/home.module.css';
import { usePosts } from '../hooks';
import { useToasts } from 'react-toast-notifications';
import { addComment } from '../api';
import { Link } from 'react-router-dom';
import UserPicture from '../images/man.png';
import Like from '../images/heart.png';
import CommentImg from '../images/chat-bubble.png';
import {Comment} from './';
import PropTypes from 'prop-types';

function Post({post}) {
  // const auth = useAuth();
  const posts = usePosts();
  const {addToast} = useToasts();
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);

  const handleAddComment = async (e, postId) => {
    if(e.key === 'Enter'){
      setCreatingComment(true);
      //handle empty comment
      if(comment === ''){
        return addToast('Comment cannot be empty', {
          appearance: 'error'
        });
      }

      const response = await addComment(postId, comment);

      if(response.success){
        setComment('');  //clear the comment input field
        posts.updatePostComments(postId, response.data.comment);
        addToast('Comment added successfully', {
          appearance: 'success'
        });
      }else{
        addToast(response.message, {
          appearance: 'error'
        });
      }
      setCreatingComment(false);
    }
  }

  return (
    <div className={styles.postWrapper}>
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
          <input placeholder="Start typing a comment" value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => handleAddComment(e, post._id)} disabled={creatingComment} />
        </div>

        {/* Display the comments of posts */}
        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`comment-${comment._id}`}/>
          ))}
        </div>
      </div>
    </div>
  )
}

//define the types of props that Post component can take as input
Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default Post;