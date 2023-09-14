import React from 'react';
import { useContextProvider } from '../../Providers/Provider';
import {ReactComponent as UnkownUserPhotoBadge} from '../../Assets/Icons/unknown-user.svg';
import "./ProfileIndex.css"


const ProfileIndex = ({userProfile}) => {
    const { API, axios, authToken, userProfileState, setUserProfileState } = useContextProvider();

    
    const handleEditButton = (event) => {
        if(userProfileState == 0){
            setUserProfileState(1)

        } else if (userProfileState == 1){
            setUserProfileState(0)
        }

        console.log('userProfileState',userProfileState)
    }


    return (
        <div className='user--profile'>
            <div className='user--profile--photobadge--container'>
                <div className='user--profile--photobadge--photo--container'>
                    <UnkownUserPhotoBadge className='user--profile--photobadge--svg'/>
                </div>
                <div className='user--profile--photobadge--name--container'>
                    <span>{userProfile.name}</span>
                    <button onClick={handleEditButton}>✏️</button>
                </div>
            </div>

            <div className='user--profile--orders--badges--container'>
                <div className='user--profile--orders--badge--pending--container'>
                    <span className='user--profile--orders--badge--pending--title'>Pending orders</span>
                    <span className='user--profile--orders--badge--pending--value'>0</span> {/* Users Pending Order Count Here*/}

                </div>
                <div className='user--profile--orders--badge--nonpending--container'>
                    <span className='user--profile--orders--badge--nonpending--title'>Orders</span>
                    <span className='user--profile--orders--badge--nonpending--value'>0</span> {/* Users Order Count Here*/}

                </div>
            </div>

            <div className='user--profile--dashboard--container'>
                <span className='user--profile--dashboard--container--title '>Dashboard</span>
                <div className='user--profile--dashboard--wallet--container'>
                    {/* <img> Wallet Icon Image Here</img> */}
                    <UnkownUserPhotoBadge className='user--profile--dashboard--wallet--icon'/> {/* replace with dashboard wallet icon*/}
                    <span>Wallet</span>

                </div>
                <div className='user--profile--dashboard--favorite--container'>
                    {/* <img> Favorite Stores Icon Image Here</img> */}
                    <UnkownUserPhotoBadge className='user--profile--dashboad--favorite--icon'/>
                    <span>Favorite Stores</span>

                </div>
                <div className='filler'></div>
            </div>
            
        </div>
    );
};

export default ProfileIndex;