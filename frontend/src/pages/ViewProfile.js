import {useState} from 'react';
import {useParams} from 'react-router-dom';
import { useGetProfile } from '../hooks/useGetProfile';
import PageNotFound from './404';
import { format } from 'date-fns';
import {Avatar} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { useAuthContext } from '../hooks/useAuthContext';
import {Error, NotificationBox} from '../components/alertBox';


const ViewProfile = () => {
    const [notification, setNotification] = useState(null);
    const {user} = useAuthContext();
    const{username} = useParams();
    const { viewUser: userProfile, error, isLoading, refetchProfile} = useGetProfile(username);

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

    const handleFollow = async () =>{
        const response = await fetch(`${process.env.REACT_APP_API}/api/social/followUser`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({toBeFollowed: userProfile.username, follower: user.username})
        })
        const json = await response.json();
        
        if(!response.ok){
            console.log(json.error);
        }
        
        if(response.ok){
            setNotification(null);
            console.log(json);  
            refetchProfile();
            setNotification(`I-ai dat follow cu succes lui ${userProfile.displayName}`);
            setTimeout(() =>{
                setNotification(null);
            }, 7000)
        }
    }

    const handleUnfollow = async () =>{
        const response = await fetch(`${process.env.REACT_APP_API}/api/social/unfollowUser`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({toBeUnfollowed: userProfile.username, unfollower: user.username})
        })
        const json = await response.json();
        
        if(!response.ok){
            console.log(json.error);
        }
        
        if(response.ok){
            setNotification(null);
            console.log(json);
            refetchProfile();
            setNotification(`I-ai dat unfollow cu succes lui ${userProfile.displayName}`);
            setTimeout(() =>{
                setNotification(null);
            }, 7000)
        }
    }
    return (
        <div>
            {notification && <NotificationBox notification={notification}/>}
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
                                {userProfile.followers.length}
                            </p>
                        </div>
                        <div className='despartitor-butoane'></div>
                        <div>
                            <p>
                                Following
                            </p>
                            <p>
                                {userProfile.following.length}
                            </p>                  
                        </div>
                        <div className='despartitor-butoane'></div>
                        {user && username && username === user.username ? (
                        <Button color='primary'> Edit profile</Button>
                        ) :(
                            <div style={{display:'flex', gap:'10px'}}>
                                {user && userProfile && !userProfile.followers.includes(user.username) ? (
                                    <Button color='default' variant="ghost" onClick={handleFollow}> Follow</Button>
                                    ) : user && userProfile && userProfile.followers.includes(user.username) ? (
                                    <Button color='default' variant="ghost" onClick={handleUnfollow}> Unfollow</Button>
                                    ) : <></>
                                }
                                <Button color='default' variant="ghost" className='min-w-unit-10'> 
                                    <svg fill="white" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                                        viewBox="0 0 32.055 32.055" xmlSpace="preserve">
                                    <g>
                                        <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
                                            C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
                                            s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
                                            c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"/>
                                    </g>
                                    </svg>
                                </Button>
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