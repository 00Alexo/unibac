import {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
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
    const navigate = useNavigate();
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
            <div className='contains-profile-phone'>
                <div className='contains-images'>
                    {/* <div className='onlinedot-phone' style={{backgroundColor:'green'}}></div> */}
                    <div style={{position:'absolute', left: 0, top:'0px', zIndex:99, marginLeft:'60px', width:'40%', padding:'10px', marginTop:'5px',
                    backgroundColor:'black', cursor:'pointer'}} onClick={() => navigate('/home')}>
                        <p style={{fontSize:'1.3rem'}}>
                            @{userProfile.username.charAt(0).toUpperCase() + userProfile.username.slice(1)}
                        </p>
                    </div>
                    <img src={`${userProfile.avatar}`} className=" text-large avatar-image-profile-phone" style={{marginLeft:'-25px'}}
                        onError={(e) => {
                        e.target.src = `https://via.placeholder.com/150?text=${userProfile.displayName.charAt(0)}`;
                        }}
                    />
                    <div className='contains-profile-data-phone'>
                        <div className='contains-profile-data-followers-phone'>
                            <div>
                                <p>
                                    Followers
                                </p>
                                <p>
                                    {userProfile.followers.length}
                                </p>
                            </div>
                            <div>
                                <p>
                                    Following
                                </p>
                                <p>
                                    {userProfile.following.length}
                                </p>                  
                            </div>
                        </div>
                    </div>
                </div>
                <div className='distantator'></div>
                {user && username && username === user.username ? (
                    <div style={{width:'95%', margin:'0 auto', marginTop: '10px'}} className='flex gap-3 justify-center'>
                        <Button color='primary' className='w-full'> Edit profile</Button>
                        <Button color='default' variant="ghost" className='min-w-unit-10'> 
                        <svg fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" 
                            width="25px" height="25px" viewBox="0 0 45.902 45.902"
                            xmlspace="preserve">
                        <g>
                            <g>
                                <path d="M43.162,26.681c-1.564-1.578-3.631-2.539-5.825-2.742c1.894-1.704,3.089-4.164,3.089-6.912
                                    c0-5.141-4.166-9.307-9.308-9.307c-4.911,0-8.932,3.804-9.281,8.625c4.369,1.89,7.435,6.244,7.435,11.299
                                    c0,1.846-0.42,3.65-1.201,5.287c1.125,0.588,2.162,1.348,3.066,2.26c2.318,2.334,3.635,5.561,3.61,8.851l-0.002,0.067
                                    l-0.002,0.057l-0.082,1.557h11.149l0.092-12.33C45.921,30.878,44.936,28.466,43.162,26.681z"/>
                                <path d="M23.184,34.558c1.893-1.703,3.092-4.164,3.092-6.912c0-5.142-4.168-9.309-9.309-9.309c-5.142,0-9.309,4.167-9.309,9.309
                                    c0,2.743,1.194,5.202,3.084,6.906c-4.84,0.375-8.663,4.383-8.698,9.318l-0.092,1.853h14.153h15.553l0.092-1.714
                                    c0.018-2.514-0.968-4.926-2.741-6.711C27.443,35.719,25.377,34.761,23.184,34.558z"/>
                                <path d="M6.004,11.374v3.458c0,1.432,1.164,2.595,2.597,2.595c1.435,0,2.597-1.163,2.597-2.595v-3.458h3.454
                                    c1.433,0,2.596-1.164,2.596-2.597c0-1.432-1.163-2.596-2.596-2.596h-3.454V2.774c0-1.433-1.162-2.595-2.597-2.595
                                    c-1.433,0-2.597,1.162-2.597,2.595V6.18H2.596C1.161,6.18,0,7.344,0,8.776c0,1.433,1.161,2.597,2.596,2.597H6.004z"/>
                            </g>
                        </g>
                        </svg>
                        </Button>
                    </div>
                ) :(
                <div style={{width:'95%', margin:'0 auto', marginTop: '10px'}} className='flex gap-3 justify-center'>
                    {user && userProfile && !userProfile.followers.includes(user.username) ? (
                        <Button className='w-full' color='default' variant="ghost" onClick={handleFollow}> Follow</Button>
                        ) : user && userProfile && userProfile.followers.includes(user.username) ? (
                        <Button  className='w-full' color='default' variant="ghost" onClick={handleUnfollow}> Unfollow</Button>
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
                )}
            </div>
        </div>
    );
}
 
export default ViewProfile;