import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const [onChange, setOnChange] = useState(false);

  const registerUser = async () => {
    // Create a new user object with the form data
    const newUser = {
      username,
      password,
    };

    try {
      const response = await fetch('https://backend-deployment-sm6z.onrender.com/users/newuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Registration successful
        console.log('User registered successfully!');
        if (responseData.error) {
          Swal.fire('Error', responseData.error, 'error');
        } else if (responseData.success) {
          nav('/login');
          Swal.fire('Great', responseData.success, 'success.');
          setOnChange(!onChange);
        } else {
          Swal.fire('Error', 'Something went wrong', 'error');
        }
      } else {
        // Registration failed
        console.error('User registration failed.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };

  return (
    <div className="container my-auto">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <form
          className="col-sm-6 bg-light rounded p-4 mt-5 border bg-dark"
          onSubmit={handleFormSubmit}
        >
         
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              name="username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              name="password"
            />
          </div>
          <button type="submit" className="mt-3 btn btn-success">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
