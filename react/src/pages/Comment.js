import React, { useState, useEffect } from 'react';


function Comment() {
  const [picture, setPicture] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('https://backend-deployment-sm6z.onrender.com//pictures')
      .then(response => response.json())
      .then(data => {
      
        setPicture(data.image_file);
      })
      .catch(error => {
        console.error('Error fetching picture:', error);
        
      });

    fetch('https://backend-deployment-sm6z.onrender.com//comments') 
      .then(response => response.json())
      .then(data => {
      
        setComments(data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
       
      });
  }, []);

  const handleCommentSubmit = () => {
 
    const pictureId = 'YOUR_PICTURE_ID'; 
    const userId = 'YOUR_USER_ID'; 

    const formData = new FormData();
    formData.append('comment', comment);
    formData.append('user_id', userId);
    formData.append('picture_id', pictureId);

    fetch('/comments/newcomment', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Comment added:', data);
  
        setComments(prevComments => [...prevComments, data]);
        setComment('');
      })
      .catch(error => {
        console.error('Error adding comment:', error);
       
      });
  };

  return (
    <div>
      <h1>Picture Display and Comments</h1>

      {picture && (
        <div>
          <img src={picture} alt="Picture" />
          <FontAwesomeIcon icon="fa-solid fa-comment" style={{color: "#5d96f8",}} />
        </div>
      )}

      <h2>Comments</h2>

      {comments.length > 0 ? (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}

      <h2>Add a Comment</h2>

      <textarea
        rows="4"
        cols="50"
        value={comment}
        onChange={event => setComment(event.target.value)}
      ></textarea>

      <br />
      <br />

      <button onClick={handleCommentSubmit}>Add Comment</button>
    </div>
  );
}

export default Comment;
