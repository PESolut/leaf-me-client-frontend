import React, { useState, useEffect } from 'react';
import { useContextProvider } from '../Providers/Provider';
import LogoutButton from '../Components/Login/LogoutButton';
import ProfileIndex from '../Components/Profile/ProfileIndex';
import ProfileEditPage from '../Components/Profile/ProfileEditPage';

const Profile = () => {
  const { API, axios, authToken, setAuthToken, userID, setUserID, isSignedIn, setIsSignedIn, userProfileState } = useContextProvider();
  const [userProfile, setUserProfile] = useState({});
  // const [userProfileState, setUserProfileState] = useState(0)

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

      {
        userProfileState == 0 && <ProfileIndex userProfile={userProfile}/> ||
        userProfileState == 1 && <ProfileEditPage userProfile={userProfile}/> 
      }
      <LogoutButton/>
    </div>
  );
};

export default Profile;
