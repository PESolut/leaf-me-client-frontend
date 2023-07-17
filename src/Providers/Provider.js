import React, { useContext, createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Nav from '../Components/App/Nav';

export const ContextD = createContext();
export function useContextProvider() {
  return useContext(ContextD);
}

const API = process.env.REACT_APP_API_URL;

const Provider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['authToken', 'userID', 'isSignedIn']);

  const [authToken, setAuthToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    if (cookies.authToken) {
      setAuthToken(cookies.authToken);
    }
    if (cookies.userID) {
      setUserID(cookies.userID);
    }
    if (cookies.isSignedIn) {
      setIsSignedIn(cookies.isSignedIn);
    }
  }, [cookies]);

  useEffect(() => {
    axios.defaults.headers.common["authorization"] = `Bearer ${authToken}`;

  }, [authToken])

  

  return (
    <div>
      <ContextD.Provider
        value={{
          API,
          axios,
          authToken,
          setAuthToken,
          userID,
          setUserID,
          isSignedIn,
          setIsSignedIn,
        }}
      >
        {children}
        <Nav />
      </ContextD.Provider>
    </div>
  );
};

export default Provider;
