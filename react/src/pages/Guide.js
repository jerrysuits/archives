import React from 'react';

function Guide() {
  return (
    <div>
      <h1>Guide Page</h1>
      <p>
        Home page
      <ul>
          <li>Here you will see your posta and those from other users.</li>
          <li>If you see an image you like click on it and it wil enlarge.</li>

        </ul>
      </p>
      <p>
        Post Page:
        <ul>
          <li>To share a post, click on the "Post" link in the navigation menu.</li>
          <li>On the post page, you can upload an image and add comments related to the image.</li>
          <li>Enter the image URL in the designated text field or choose a local file using the provided upload button.</li>
          <li>Add any comments or description related to the image in the comment section.</li>
          <li>Click the "Upload Image" button to share your post.</li>
          <li>See yourpicture in home</li>
        </ul>
        Login and Sign up:
        <ul>
          <li>If you already have an account, click on the "Login" link in the navigation menu.</li>
          <li>Enter your username and password to log in.</li>
          <li>If you are a new user, click on the "Sign up" link in the navigation menu.</li>
          <li>Provide the required information, such as username, email, and password, to create a new account.</li>
          <li>After user registration is successful ,once again login to get to your account</li>
          <li>After successful login or sign up, you will have access to additional features and functionalities.</li>
        </ul>
      </p>
    </div>
  );
}

export default Guide;


