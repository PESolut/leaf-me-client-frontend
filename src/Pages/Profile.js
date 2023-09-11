import React, { useState, useEffect } from 'react';
import { useContextProvider } from '../Providers/Provider';
import LogoutButton from '../Components/Login/LogoutButton';
import ProfileIndex from '../Components/Profile/ProfileIndex';
import ProfileEditPage from '../Components/Profile/ProfileEditPage';

const Profile = () => {
  const { API, axios, authToken, setAuthToken, userID, setUserID, isSignedIn, setIsSignedIn } = useContextProvider();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      // console.log(authToken)
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

  console.log(userProfile);

  return (
    <div>
      {/* Render the profile data */}
      {/* <ProfileIndex userProfile={userProfile}/> */}
      <ProfileEditPage userProfile={userProfile}/> 
      <LogoutButton/>
    </div>
  );
};

export default Profile;
