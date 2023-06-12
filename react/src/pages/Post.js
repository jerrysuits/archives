import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Post() {
  const [selectedImage, setSelectedImage] = useState('');
  const [pictures, setPictures] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [onChange, setOnChange] = useState(false);
  const { current_user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    fetch('https://backend-deployment-sm6z.onrender.com//pictures')
      .then(response => response.json())
      .then(data => {
        console.log('Pictures:', data);
        setPictures(data);
      })
      .catch(error => {
        console.error('Error fetching pictures:', error);
      });

    fetch('https://backend-deployment-sm6z.onrender.com//comments')
      .then(response => response.json())
      .then(data => {
        console.log('Comments:', data);
        setComments(data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  const handleImageUpload = () => {
    if (!current_user) {
      Swal.fire('Error', 'Please sign in or to upload an image!If you do not have an account,then register', 'error');
      return;
    }

    if (selectedImage) {
      const formData = new FormData();
      formData.append('image_file', selectedImage);
      formData.append('user_id', current_user.id);

      fetch('https://backend-deployment-sm6z.onrender.com//pictures/newpicture', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Image uploaded:', data);
          Swal.fire('Success', 'Image uploaded successfully!', 'success');
          setSelectedImage('');
          setOnChange(!onChange);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          Swal.fire('Success', 'Image uploaded');
        });
    }
  };

  // const handleCommentSubmit = () => {
  //   if (comment) {
  //     const formData = new FormData();
  //     formData.append('content', comment);
  //     formData.append('user_id', current_user.id); // Replace with the actual user ID
  //     formData.append('picture_id', '1'); // Replace with the actual picture ID

  //     fetch('/comments/newcomment', {
  //       method: 'POST',
  //       body: formData,
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('Comment created:', data);
  //         setComment('');
  //         // Refresh the comments by making another request
  //         fetch('/comments')
  //           .then(response => response.json())
  //           .then(data => {
  //             console.log('Comments:', data);
  //             setComments(data);
  //           })
  //           .catch(error => {
  //             console.error('Error fetching comments:', error);
  //           });
  //       })
  //       .catch(error => {
  //         console.error('Error creating comment:', error);
  //       });
  //   }
  // };


  return (
    <div>
    

      {selectedImage && (
        <div className='text-center rounded '>
          <img alt="not found" width="250px" src={selectedImage} />
          <br />
          <button className='bg-success text-white rounded-pill' onClick={() => setSelectedImage('')}>Remove</button>
        </div>
      )}

      <br />
      <br />
      <div className='text-center form-group mt-3'>
  <input
    type="text"
    className='text-center rounded'
    placeholder="Enter image URL"
    style={{ width: '500px', height: '40px', fontSize: '16px', padding: '8px' }}
    value={selectedImage}
    onChange={event => setSelectedImage(event.target.value)}
  />
  
</div>

      <br />
      <br />
<div className='text-center'>
      <button className='bg-success text-white rounded-pill t' onClick={handleImageUpload}>Upload Image</button>
</div>
      <br />
      <br />
{/* 
      <input
        type="text"
        value={comment}
        onChange={event => setComment(event.target.value)}
      />

      <button onClick={handleCommentSubmit}>Add Comment</button> */}

      <br />
      <br />

      <br />
      <br />

      <h2></h2>//
      {comments && comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <p>By: {comment.user.username}</p>
        </div>
      ))}
    </div>
  );
}

export default Post;