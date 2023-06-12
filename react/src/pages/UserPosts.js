import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

function UserPosts() {
  const { current_user } = useContext(AuthContext);
  const [userPictures, setUserPictures] = useState([]);
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchUserPictures = async () => {
      try {
        if (current_user && current_user.id) {
          const response = await fetch(`https://backend-deployment-sm6z.onrender.com//pictures?user_id=${current_user.id}`);
          const data = await response.json();
          setUserPictures(data);
        }
      } catch (error) {
        console.error('Error fetching user pictures:', error);
      }
    };

    fetchUserPictures();
  }, [current_user]);

  if (!current_user) {
    return <div>Loading...</div>;
  }

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
        fetch(`https://backend-deployment-sm6z.onrender.com//pictures/delete/${picture_id}`, {
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
      <h2>My posts</h2>
      {userPictures
        .filter((picture) => picture.user_id === current_user.id)
        .map((picture) => (
          <div key={picture.id}>
            <div  style={{ display: 'flex', alignItems: 'center' }}>
              <img src={picture.image_file} alt="User Picture" className='rounded' />
              <button className='mt-1 mb-2 btn bg-danger text-white rounded-pill ms-3' onClick={() => handleDeletePicture(picture.id)}>Delete</button>
            </div>
            <p>By: {current_user.username}</p>
          </div>
        ))}
    </div>
  );
}

export default UserPosts;
