import React, { useState } from 'react';
import { useContextProvider } from '../../Providers/Provider';
import {ReactComponent as UnkownUserPhotoBadge} from "../../Assets/Icons/unknown-user.svg"
import "./ProfileEditPage.css"

const ProfileEditPage = ({userProfile}) => {
    const { API, axios, authToken, userProfileState, setUserProfileState } = useContextProvider();


    console.log(userProfile)
    const [userDetails, setUserDetails] = useState({
        email: "",
        name: "",
        Address: "",
    })

    const handleUserDetailsChange = (event) => {
        setUserDetails({ ...userDetails, [event.target.id]: event.target.value });
      };
    

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleEditButton = (event) => {
        if(userProfileState == 0){
            setUserProfileState(1)

        } else if (userProfileState == 1){
            setUserProfileState(0)
        }

        console.log('userProfileState',userProfileState)
    }

    return (
        <div className='user--profile--edit'>
           <div className='user--profile--edit--photobadge--container'>
                <div className='user--profile--edit--photobadge--photo--container'>
                    <UnkownUserPhotoBadge className='user--profile--edit--photobadge--photo'/>
                </div>
                <div className='user--profile--edit--photobadge--name--container'>
                    <span>{userProfile.name}</span>
                    <button onClick={handleEditButton}>✏️</button>

                </div>
            </div>
            <form className="user--profile--edit--form" onSubmit={handleSubmit}>
                <div className='user--profile--edit--form--email'>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email" value={userProfile.email} onChange={handleUserDetailsChange} />
                    <div className='user--profile--edit--form--line'></div>
                </div>
                <div className='user--profile--edit--form--name'>
                    <label htmlFor="name">Name</label>
                    <input type="name" id="name" value={userProfile.name} onChange={handleUserDetailsChange} />
                    <div className='user--profile--edit--form--line'></div>
                </div>
                <div className='user--profile--edit--form--address'>
                    <label htmlFor="address">Address</label>
                    <input type="address" id="address" value={userProfile.address} onChange={handleUserDetailsChange} />
                    <div className='user--profile--edit--form--line'></div>
                </div>
                <div className='filler'/>
                
            </form>
        </div>
    );
};

export default ProfileEditPage;