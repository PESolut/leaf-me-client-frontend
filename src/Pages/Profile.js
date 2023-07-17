import React, { useState, useEffect } from 'react';
import { useContextProvider } from '../Providers/Provider';
import LogoutButton from '../Components/Login/LogoutButton';

const Profile = () => {
  const { API, axios, authToken, setAuthToken, userID, setUserID, isSignedIn, setIsSignedIn } = useContextProvider();
  const [profile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (authToken) {
        try {
          const response = await axios.get(`${API}/users/${userID}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setUserProfile(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchUserProfile();
  }, [userID, authToken, API, axios]);

  console.log(profile);

  return (
    <div>
      {/* Render the profile data */}
      <LogoutButton/>
    </div>
  );
};

export default Profile;
