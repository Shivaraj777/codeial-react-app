import React, { useState } from 'react';
import styles from '../styles/home.module.css';
import { useToasts } from 'react-toast-notifications';
import { addPost } from '../api';
import { usePosts } from '../hooks';

function CreatePost() {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const {addToast} = useToasts();
  const posts = usePosts();

  const handleChange = (e) => {
    setPost(e.target.value);
  };

  //add the post on submit
  const handleAddPost = async () => {
    setAddingPost(true);
    if(post === ''){
      addToast('Post content cannot be empty', {
        appearance: 'error'
      });
      return setAddingPost(false);;
    }

    const response = await addPost(post);

    if(response.success){
      setPost(''); //clear the create-post input box
      posts.addPostToState(response.data.post);  //update the global posts state with newly added post
      addToast('Post created successfully', {
        appearance: 'success'
      });
    }else{
      addToast(response.message, {
        appearance: 'error'
      });
    }

    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea className={styles.addPost} value={post} onChange={handleChange} placeholder='What&apos;s on your mind?' />
      <div>
        <button className={styles.addPostBtn} onClick={handleAddPost} disabled={addingPost}>
          {addingPost ? 'Adding Post...' : 'Add Post'}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;