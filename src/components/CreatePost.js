import React, { useState } from 'react';
import styles from '../styles/home.module.css';

function CreatePost() {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);

  const handleChange = (e) => {
    setPost(e.target.value);
  };

  //add the post on submit
  const addPost = () => {

  };

  return (
    <div className={styles.createPost}>
      <textarea className={styles.addPost} value={post} onChange={handleChange} placeholder='What&apos;s on your mind?' />
      <div>
        <button className={styles.addPostBtn} onClick={addPost} disabled={addingPost}>
          {addingPost ? 'Adding Post...' : 'Add Post'}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;