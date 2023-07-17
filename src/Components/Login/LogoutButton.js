import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextProvider } from '../../Providers/Provider';
import Cookies from 'universal-cookie';


const LogoutButton = () => {
  const navigate = useNavigate();
  const { setAuthToken, setUserID, setIsSignedIn } = useContextProvider();

  const handleLogout = () => {
    const cookies = new Cookies();

    // Clear cookies or perform any other necessary logout actions
    setAuthToken(null);
    setUserID(null);
    setIsSignedIn(null);

    cookies.remove('authToken');
    cookies.remove('userID');
    cookies.remove('isSignedIn');

    // Navigate to the home page
    navigate('/');

    // Refresh the page to rerender all states
    window.location.reload();
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
