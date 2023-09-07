import React, { useState } from 'react';

const ProfileEditPage = ({userProfile}) => {
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

    return (
        <div className='user--profile--edit'>
           <div className='user--profile--edit--photobadge--container'>
                <div className='user--profile--edit--photobadge--photo--container'>
                    <img></img>
                </div>
                <div className='user--profile--edit--photobadge--name--container'>
                    <span>{userProfile.name}</span>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" value={userDetails.email} onChange={handleUserDetailsChange} />
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="name" id="password" value={userDetails.password} onChange={handleUserDetailsChange} />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="address" id="address" value={userDetails.password} onChange={handleUserDetailsChange} />
                </div>
                
            </form>
        </div>
    );
};

export default ProfileEditPage;