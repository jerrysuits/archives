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
    fetch('/pictures')
      .then(response => response.json())
      .then(data => {
        console.log('Pictures:', data);
        setPictures(data);
      })
      .catch(error => {
        console.error('Error fetching pictures:', error);
      });

    fetch('/comments')
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
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image_file', selectedImage);
      formData.append('user_id', current_user.id);

      fetch('/pictures/newpicture', {
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

  const handleCommentSubmit = () => {
    if (comment) {
      const formData = new FormData();
      formData.append('content', comment);
      formData.append('user_id', current_user.id); // Replace with the actual user ID
      formData.append('picture_id', '1'); // Replace with the actual picture ID

      fetch('/comments/newcomment', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Comment created:', data);
          setComment('');
          // Refresh the comments by making another request
          fetch('/comments')
            .then(response => response.json())
            .then(data => {
              console.log('Comments:', data);
              setComments(data);
            })
            .catch(error => {
              console.error('Error fetching comments:', error);
            });
        })
        .catch(error => {
          console.error('Error creating comment:', error);
        });
    }
  };

  const handleDeletePicture = (picture_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this image!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/pictures/delete/${picture_id}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(data => {
            console.log('Picture deleted:', data);
            Swal.fire('Deleted!', 'Image has been deleted.', 'success');
            // Refresh the pictures by making another request
            fetch('/pictures')
              .then(response => response.json())
              .then(data => {
                console.log('Pictures:', data);
                setPictures(data);
              })
              .catch(error => {
                console.error('Error fetching pictures:', error);
              });
          })
          .catch(error => {
            console.error('Error deleting picture:', error);
            Swal.fire('Great', 'Image deleted refresh page to update');
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Image deletion was cancelled', 'info');
      }
    });
  };

  return (
    <div>
      <h1></h1>

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
      <div >
      <h2 className='text-center'>Pictures:</h2>
      {pictures.map(picture => (
        <div key={picture.id} className='text-center'>
          <img src={picture.image_file} alt="Picture" width="400px " className='rounded img-fluid' />
          <p>By: {picture.user ? picture.user.username : 'Unknown User'}</p>
          <button className=' mt-1 mb-2 btn bg-danger text-white rounded-pill' onClick={() => handleDeletePicture(picture.id)}>Delete</button>
        </div>
      ))}
      </div>

      <br />
      <br />

      <h2>Comments:</h2>
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