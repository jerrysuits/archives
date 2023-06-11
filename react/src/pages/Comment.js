import React, { useState, useEffect } from 'react';


function Comment() {
  const [picture, setPicture] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('/pictures') // Replace with your API endpoint to fetch the picture
      .then(response => response.json())
      .then(data => {
        // Assuming the response contains the picture data
        setPicture(data.image_file);
      })
      .catch(error => {
        console.error('Error fetching picture:', error);
        // Handle the error
      });

    fetch('/comments') // Replace with your API endpoint to fetch the comments
      .then(response => response.json())
      .then(data => {
        // Assuming the response contains the comments data
        setComments(data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
        // Handle the error
      });
  }, []);

  const handleCommentSubmit = () => {
    // Assuming you have the picture ID and user ID available
    const pictureId = 'YOUR_PICTURE_ID'; // Replace with the actual picture ID
    const userId = 'YOUR_USER_ID'; // Replace with the actual user ID

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
        // Handle the response from the API
        // For example, you can update the comments state with the new comment
        setComments(prevComments => [...prevComments, data]);
        setComment('');
      })
      .catch(error => {
        console.error('Error adding comment:', error);
        // Handle the error
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
