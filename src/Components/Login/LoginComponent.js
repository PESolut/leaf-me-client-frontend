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
    <div className="login">
      <h2>Welcome back!</h2>
      {/* <p>Please enter your login details below to login.</p> */}
      {/* <hr /> */}
      {error && (
        <div className="login--error">
          <p>{error}</p>
          <p>{errorMessage}</p>
          {/* <hr /> */}
        </div>
      )}
      <form className="login--form" onSubmit={handleSubmit}>
        <div className='login--form--email'>
          <label htmlFor="email">Email Address</label>
          <input type="text" id="email" value={loginDetails.email} onChange={handleLoginDetailsChange} />
          <div className='login--form--line' />
        </div>
        <div className={error && "login--form--password--error" || !error && "login--form--password"}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={loginDetails.password} onChange={handleLoginDetailsChange} />
          <div className='login--form--line'/>
        </div>
        <div className='login--form--buttons--container'>
        <button className="login--form--buttons--login--button" type="submit">
          Submit
        </button>
   

        </div>
        
      </form>
      <button className='login--form--buttons--register--button'>
          Register
        </button>
      <br />
    </div>
  );
};

export default LoginComponent;
