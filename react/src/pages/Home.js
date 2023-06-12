import React, { useState, useEffect } from 'react';

function Home() {
  const [pictures, setPictures] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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
  }, []);

  const fetchUsername = async (id) => {
    try {
      const response = await fetch(`https://backend-deployment-sm6z.onrender.com//users/${id}`);
      const user = await response.json();
      return user.username;
    } catch (error) {
      console.error(`Error fetching username for user ID ${id}:`, error);
      return 'Unknown';
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      const picturesWithUsernames = await Promise.all(
        pictures.map(async (picture) => {
          const username = await fetchUsername(picture.user_id);
          return { ...picture, username };
        })
      );
      setPictures(picturesWithUsernames);
    };

    fetchUsernames();
  }, []); 

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        alignContent: 'flex-start',
        gridGap: '10px',
      }}
    >
      {pictures.map((picture) => (
        <div
          key={picture.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transition: 'transform 5s ease',
            cursor: 'pointer',
            
          }}
          
          
          
          onClick={() => handleImageClick(picture)}
        >
          <img
            src={picture.image_file}
            alt="Picture"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '20px',
            }}
          />
          <p
            style={{
              margin: '0',
              fontSize: '14px',
            }}
          >
          
          </p>
        </div>
      ))}
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            display: 'flex',
            borderRadius: '30px',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: '999',
            transition: 'opacity 1s ease',
          }}
          onClick={handleImageClose}
        >
          <img
            src={selectedImage.image_file}
            alt="Selected Picture"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: '80%',
              height: '80%',
              objectFit: 'contain',
              borderRadius: '30px',
              opacity: '1',
              transition: 'opacity 5s ease',
              imageRendering: 'smooth'
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
