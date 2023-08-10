import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useContextProvider } from '../../Providers/Provider.js';
import { useNavigate } from 'react-router-dom';
import "./LoginComponent.css"

const LoginComponent = () => {
  const { API, axios, authToken, setAuthToken, userID, setUserID, isSignedIn, setIsSignedIn } = useContextProvider();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies, setCookie] = useCookies(['authToken']);

  const handleLoginDetailsChange = (event) => {
    setLoginDetails({ ...loginDetails, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${API}/users/login`, loginDetails)
      .then((response) => {
        setAuthToken(response.data.token);
        setUserID(response.data.user_id);
        setError('');

        // Save auth token in a cookie
        setCookie('authToken', response.data.token, { path: '/' });
        setCookie('name', response.data.name,{ path: '/' } )
        setCookie('userID', response.data.user_id,{ path: '/' } )
        
        axios.defaults.headers.common["authorization"] = `Bearer ${authToken}`;

        // Set isSignedIn flag to true
        setIsSignedIn(true);

        // Redirect to desired page
        navigate('/dispensary');
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred during login.');
        setErrorMessage(error.response.data.error);
      });

    setLoginDetails({
      email: '',
      password: '',
    });
  };

  return (
    <div className="loginCard">
      <h1>Sign-In</h1>
      <p>Please enter your login details below to login.</p>
      <hr />
      {error && (
        <div className="error-login">
          <p>{error}</p>
          <p>{errorMessage}</p>
          <hr />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={loginDetails.email} onChange={handleLoginDetailsChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={loginDetails.password} onChange={handleLoginDetailsChange} />
        </div>
        <button className="loginbutton" type="submit">
          Submit
        </button>
      </form>
      <br />
      <div className="loginCard-button-area"> Sign up
      </div>
    </div>
  );
};

export default LoginComponent;
