import {useState} from 'react';
import {useParams} from 'react-router-dom';
import { useGetProfile } from '../hooks/useGetProfile';
import PageNotFound from './404';
import { format } from 'date-fns';
import {Avatar} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { useAuthContext } from '../hooks/useAuthContext';

const ViewProfile = () => {
    const {user} = useAuthContext();
    const{username} = useParams();
    const { viewUser: userProfile, error, isLoading} = useGetProfile(username);

    const joinedAt = userProfile && userProfile.createdAt
    ? format(new Date(userProfile.createdAt), 'dd.MM.yyyy')
    : null;

    if (!userProfile){
        return <PageNotFound/>
    }
    const handleImageError = (e) => {
        if (userProfile && userProfile.displayName) {
            e.target.src = `https://via.placeholder.com/150?text=${userProfile.displayName.charAt(0)}`;
        } else {
            e.target.src = 'https://via.placeholder.com/150?text=?';
        }
    };
    return (
        <div>
            <div className='contains-profile'>
                <div className='contains-images'>
                    <div className='background-image'></div>
                    <img src={`${userProfile.avatar}`} className=" text-large avatar-image-profile"
                        onError={(e) => {
                        e.target.src = `https://via.placeholder.com/150?text=${userProfile.displayName.charAt(0)}`;
                        }}
                    />
                </div>
                <div className='contains-profile-data'>
                    <div className='profile-data-displayname-div'>
                        <p>{userProfile.displayName}</p>
                        <div className='onlinedot' style={{backgroundColor:'green'}}></div>
                    </div>
                    <div className='profile-data-username-div'>
                        <div className='profile-data-username-div-details'>
                            <p>@{userProfile.username}</p>
                            <p>&bull;</p>
                            <p>S-a alaturat: {joinedAt}</p>
                            <p>&bull;</p>
                            <p>{userProfile.statut}</p>
                        </div>
                    </div>
                    <div className='profile-data-buttons'>
                        <div>
                            <p>
                                Followers
                            </p>
                            <p>
                                2023
                            </p>
                        </div>
                        <div className='despartitor-butoane'></div>
                        <div>
                            <p>
                                Following
                            </p>
                            <p>
                                2024
                            </p>                  
                        </div>
                        <div className='despartitor-butoane'></div>
                        <div>
                            <p>
                                Friends
                            </p>
                            <p>
                                0
                            </p>                  
                        </div>
                        <div className='despartitor-butoane'></div>
                        {user && username && username === user.username ? (
                        <Button color='primary'> Edit profile</Button>
                        ) :(
                            <div style={{display:'flex', gap:'10px'}}>
                            <Button color='default' variant="ghost"> Message</Button>
                            <Button color='default' variant="ghost" className='min-w-unit-10'> ...</Button>
                            </div>
                        )
                        }
                    </div>
                </div>
                <div className='distantator mt-5 mb-5'></div>
            </div>
        </div>
    );
}
 
export default ViewProfile;