import {useState, useRef, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { useGetProfile } from '../hooks/useGetProfile';
import PageNotFound from './404';
import { format } from 'date-fns';
import {Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { useAuthContext } from '../hooks/useAuthContext';
import {Error, NotificationBox} from '../components/alertBox';
import Loading from "../pages/Loading";
import uploadImage from '../assets/uploadImage.png'

export const SearchIcon = (props) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );

const ViewProfile = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
    const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth < 950);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
        window.removeEventListener('resize', checkScreenSize);
    };

    }, []);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2} = useDisclosure();
    const [notification, setNotification] = useState(null);
    const [eroare, setErroare] = useState('')
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const {username} = useParams();
    const {view} = useParams();
    const { viewUser: userProfile, error, isLoading, refetchProfile} = useGetProfile(username);
    const { viewUser: userData, refetchProfile: refetchProfile2} = useGetProfile(user?.username);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [isHovered, setIsHovered] = useState(null);

    if(view != undefined && view != null && view?.toLowerCase() != 'setari' && view?.toLowerCase() != 'articole' && view?.toLowerCase() != 'subiecte'
    && view?.toLowerCase() != 'activitate' && view?.toLowerCase() != 'clase' && view?.toLowerCase() != 'profil')
        return <PageNotFound/>

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

    const updateUserAvatar = async (pic) =>{
        setLoading(true);
        if (!pic) {
            console.log("No file selected");
            return;
        }
        const formdata = new FormData();
        console.log(pic);
        formdata.append("file", pic);
        formdata.append("upload_preset", "unibac07");
        formdata.append("cloud_name", "dopoxnlkb");
        const cloudinary = await fetch(`${process.env.REACT_APP_CLOUDINARY_API}`, {
            method: "post",
            body: formdata,
          })
        const js = await cloudinary.json();
        if(!cloudinary.ok){
            console.log(js.error);
            setErroare("A apărut o eroare la încărcarea avatarului.");
            setTimeout(() => {
                setErroare(null);
            }, 7000);
            setLoading(false);
            return;
        }
        console.log(js);
        const avatarUrl = js.secure_url;
        console.log(avatarUrl);
        userProfile.avatar = avatarUrl;
        console.log(userProfile.avatar);
        setAvatar(avatarUrl);

        const response = await fetch(`${process.env.REACT_APP_API}/api/user/updateUserAvatar`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({avatar: avatarUrl, username: user.username, userAuth: user.username})
        })
        const json = await response.json();
        if(!response.ok){
            console.log(json.error);
            setErroare("A apărut o eroare la încărcarea avatarului.");
            setTimeout(() => {
                setErroare(null);
            }, 7000);
            setLoading(false);
        }
        if(response.ok){
            console.log(json);
            setNotification(`Avatarul a fost schimbat cu succes!`);
            setTimeout(() => {
                setNotification(null);
            }, 7000)
            setLoading(false);
        }
    }

    const handleFollow = async () =>{
        const response = await fetch(`${process.env.REACT_APP_API}/api/social/followUser`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({toBeFollowed: userProfile.username, follower: user.username, userAuth: user.username})
        })
        const json = await response.json();
        
        if(!response.ok){
            setErroare(json.error);
            setTimeout(() =>{
                setErroare(null);
            }, 7000)
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
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({toBeUnfollowed: userProfile.username, unfollower: user.username, userAuth: user.username})
        })
        const json = await response.json();
        
        if(!response.ok){
            console.log(json.error);
            setErroare(json.error);
            setTimeout(() =>{
                setErroare(null);
            }, 7000)
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


    const handleFollow2 = async (follower, toBeFollowed) =>{
        const response = await fetch(`${process.env.REACT_APP_API}/api/social/followUser`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({toBeFollowed: toBeFollowed, follower: follower, userAuth: user.username})
        })
        const json = await response.json();
        
        if(!response.ok){
            console.log(json.error);
            setErroare(json.error);
            setTimeout(() =>{
                setErroare(null);
            }, 7000)
        }
        
        if(response.ok){
            setNotification(null);
            refetchProfile2();
            setNotification(`I-ai dat follow cu succes lui ${toBeFollowed}`);
            setTimeout(() =>{
                setNotification(null);
            }, 7000)
        }
      }

    const getFollowers = async (username) =>{
        const response = await fetch(`${process.env.REACT_APP_API}/api/social/getFollowers?username=${username}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        
        if(!response.ok){
            console.log(json.error);
        }
        
        if(response.ok){
            console.log(json);
            setFollowers(json.followers.followers);
        }
    }

    const getFollowing = async (username) =>{
        const response = await fetch(`${process.env.REACT_APP_API}/api/social/getFollowing?username=${username}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        
        if(!response.ok){
            console.log(json.error);
        }
        
        if(response.ok){
            console.log(json);
            setFollowing(json.following.following);
        }
    }
    return (
        <div>
            {notification && <NotificationBox notification={notification}/>}
            {loading && <Loading/>}
            {error && <Error error={error}/>}
            {eroare && <Error error={eroare}/>}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior='inside'
                placement='center'
            >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1 mx-auto">
                        Followers
                    </ModalHeader>
                    {followers?.length > 0 &&
                    <Input className='mx-auto mb-3'
                        classNames={{
                            base: "max-w-[90%] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Search"
                        size="sm"
                        startContent={<SearchIcon size={18} />}
                        type="search"
                    />
                    }
                    <ModalBody>
                    {followers?.length > 0 ?
                    <div className='flex gap-3 flex-col'>
                        {followers?.map(follower =>{
                            return(
                                <div className='flex gap-3 items-center justify-between'>
                                    <div className='flex flex-row gap-2 items-center' style={{cursor:'pointer'}}
                                    onClick={() => {
                                        navigate(`/profile/${follower.username}`);
                                        onClose();
                                    }}>
                                        <Avatar src={follower.avatar} size="md" onError={handleImageError}/>
                                        <p>{follower.username}</p>
                                    </div>
                                    <div>
                                    {!userData.following.some(f => f.username === follower.username) && (
                                        <Button 
                                        size="md"
                                        color='default' 
                                        variant="ghost" 
                                        onClick={() => handleFollow2(user.username, follower.username)}
                                        > 
                                        Follow
                                        </Button>
                                    )}
                                    {userData.following.some(f => f.username === follower.username) && (
                                        <Button 
                                        color='default' 
                                        size="md"
                                        variant="ghost" 
                                        isDisabled
                                        > 
                                        Following
                                        </Button>
                                    )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    : <p style={{margin:'0 auto'}}> Acest utilizator nu urmareste pe nimeni.</p>}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isOpen2}
                onOpenChange={onOpenChange2}
                scrollBehavior='inside'
                placement='center'
            >
                <ModalContent>
                {(onClose2) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1 mx-auto">
                        Following
                    </ModalHeader>
                    {following?.length > 0 &&
                    <Input className='mx-auto mb-3'
                        classNames={{
                            base: "max-w-[90%] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Search"
                        size="sm"
                        startContent={<SearchIcon size={18} />}
                        type="search"
                    />
                    }
                    <ModalBody>
                    {following?.length > 0 ?
                    <div className='flex gap-3 flex-col'>
                        {following?.map(follower =>{
                            return(
                                <div className='flex gap-3 items-center justify-between'>
                                    <div className='flex flex-row gap-2 items-center' style={{cursor:'pointer'}}
                                    onClick={() => {
                                        navigate(`/profile/${follower.username}`);
                                        onClose2();
                                    }}>
                                        <Avatar src={follower.avatar} size="md" onError={handleImageError}/>
                                        <p>{follower.username}</p>
                                    </div>
                                    <div>
                                    {!userData.following.some(f => f.username === follower.username) && (
                                        <Button 
                                        size="md"
                                        color='default' 
                                        variant="ghost" 
                                        onClick={() => handleFollow2(user.username, follower.username)}
                                        > 
                                        Follow
                                        </Button>
                                    )}
                                    {userData.following.some(f => f.username === follower.username) && (
                                        <Button 
                                        color='default' 
                                        size="md"
                                        variant="ghost" 
                                        isDisabled
                                        > 
                                        Following
                                        </Button>
                                    )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    : <p style={{margin:'0 auto'}}> Acest utilizator nu este urmarit de nimeni.</p>}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose2}>
                        Close
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
            <div className='contains-profile'>
                <input
                    style={{display:'none'}}
                    ref={fileInputRef}
                    type='file'
                    accept='image/*' 
                    onChange={(e) => {
                        updateUserAvatar(e.target.files[0]);
                        console.log(e.target.files[0]);
                    }}>
                </input>
                <div className='contains-images'>
                    <div className='background-image'></div>
                    <img src={isHovered ? uploadImage : `${userProfile.avatar}`} className="cursor-pointer text-large avatar-image-profile"
                        onMouseEnter={() => {
                            if(user && user.username === userProfile.username){
                            setIsHovered(true); 
                            }
                        }}
                        onMouseLeave={() => {
                            if(user && user.username === userProfile.username){
                                setIsHovered(false); 
                            }
                        }}
                        onClick={() => {if(user && user.username === userProfile.username) fileInputRef.current?.click()}}
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
                        <div onClick={() => {onOpen(); getFollowers(userProfile.username)}} style={{cursor:'pointer'}}>
                            <p>
                                Followers
                            </p>
                            <p>
                                {userProfile.followers.length}
                            </p>
                        </div>
                        <div className='despartitor-butoane'></div>
                        <div onClick={() => {onOpen2(); getFollowing(userProfile.username)}} style={{cursor:'pointer'}}>
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
                                {user && userProfile ? (
                                userProfile.followers.some(follower => follower.username === user.username) ? (
                                    <Button color='default' variant="ghost" onClick={handleUnfollow}>Unfollow</Button>
                                ) : (
                                    <Button color='default' variant="ghost" onClick={handleFollow}>Follow</Button>
                                )
                                ) : <></>}
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
                <div className='distantator mt-5 mb-2'></div>
            </div>
            <div className='contains-profile-phone'>
                <div className='contains-images'>
                    {/* <div className='onlinedot-phone' style={{backgroundColor:'green'}}></div> */}
                    <div style={{position:'fixed', left: 0, top:'0px', zIndex:40, marginLeft:'60px', width:'40%', padding:'10px', marginTop:'5px',
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
                            <div onClick={() => {onOpen(); getFollowers(userProfile.username)}}>
                                <p>
                                    Followers
                                </p>
                                <p>
                                    {userProfile.followers.length}
                                </p>
                            </div>
                            <div onClick={() => {onOpen2(); getFollowing(userProfile.username)}}>
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
                    {user && userProfile ? (
                    userProfile.followers.some(follower => follower.username === user.username) ? (
                        <Button color='default' variant="ghost" onClick={handleUnfollow}>Unfollow</Button>
                    ) : (
                        <Button color='default' variant="ghost" onClick={handleFollow}>Follow</Button>
                    )
                    ) : <></>}
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
            <div className='contains-profile-pages w-full'>
                <div className='profile-navbar w-full flex flex-row gap-7 justify-center text-lg'>
                    <div className="dropdownHead cursor-pointer pb-2" onClick={() => navigate(`/profile/${username}/profil`)}>
                        <p>Profil</p>
                    </div>
                    <div className="dropdownHead cursor-pointer" onClick={() => navigate(`/profile/${username}/clase`)}>
                        <p>Clase</p>
                    </div>
                    <div className="dropdownHead cursor-pointer pb-2" onClick={() => navigate(`/profile/${username}/activitate`)}>
                        <p>Activitate</p>
                    </div>
                    <div className="dropdownHead cursor-pointer" onClick={() => navigate(`/profile/${username}/subiecte`)}>
                        <p>Subiecte</p>
                    </div>
                    <div className='dropdownHead cursor-pointer' onClick={() => navigate(`/profile/${username}/articole`)}> 
                        <p> Articole </p>
                    </div>
                    {user?.username === username &&
                    <div className="dropdownHead cursor-pointer" onClick={() => navigate(`/profile/${username}/setari`)}>
                        <p>Setari</p>
                    </div>
                    }
                </div>
                {(!view || view?.toLowerCase() === 'profil') &&
                    <div className={isSmallScreen ? 'bg-[#26272B] pt-5 pb-5 border-t-2 border-[#44444d] flex flex-row justify-between min-h-[calc(100vh-475px)] pl-[2%] pr-[2%]'
                    : 'bg-[#26272B] border-t-2 border-[#44444d] pt-5 pb-5 flex flex-row justify-between min-h-[calc(100vh-475px)] pl-[10%] pr-[10%]'
                    }>
                        <div className={isSmallScreen ? 'w-[55%] bg-[#707aa3]' : 'w-[50%] bg-[#707aa3]'}>
                            test
                        </div>
                        <div className='w-[40%] flex justify-center'>
                            <div className='w-full bg-[#3F3F46] flex rounded-md h-[100px] pr-4 pl-4 pt-2 pb-2 flex-col gap-2'> 
                                <p className='text-xl'> Pagina principala</p>
                                {userProfile?.pagina ? 
                                <div onClick={() => window.open(userProfile?.pagina, '_blank')}
                                className='bg-[#51525C] w-full pl-3 pr-3 pt-2 pb-2 rounded-md flex justify-between items-center cursor-pointer'>
                                    <p>{userProfile?.pagina.length > 60 ? 
                                    `${userProfile?.pagina.slice(0, 50)}...${userProfile?.pagina.slice(-10)}` 
                                    : userProfile?.pagina}
                                    </p>
                                    <div> 
                                        <svg style={{marginBottom:'-5px'}}height="30px" width="30px" viewBox="0 0 24 30" fill="white" x="0px" y="px"><path d="M14.9849 2C14.4327 2 13.9849 2.44771 13.9849 3C13.9849 3.55228 14.4327 4 14.9849 4L18.5858 4L10.2929 12.2929C9.90237 12.6834 9.90237 13.3166 10.2929 13.7071C10.6834 14.0976 11.3166 14.0976 11.7071 13.7071L20 5.41422L20 9.01503C20 9.56732 20.4477 10.015 21 10.015C21.5523 10.015 22 9.56732 22 9.01504L22 3C22 2.44772 21.5523 2 21 2L14.9849 2Z" fill="white"/><path d="M4 8C4 7.44772 4.44772 7 5 7H11.3333C11.8856 7 12.3333 6.55228 12.3333 6C12.3333 5.44772 11.8856 5 11.3333 5H5C3.34315 5 2 6.34315 2 8V19C2 20.6569 3.34315 22 5 22H16C17.6569 22 19 20.6569 19 19V13.2619C19 12.7096 18.5523 12.2619 18 12.2619C17.4477 12.2619 17 12.7096 17 13.2619V19C17 19.5523 16.5523 20 16 20H5C4.44772 20 4 19.5523 4 19V8Z" fill="white"/></svg>
                                    </div>
                                </div> : 
                                <div className='bg-[#51525C] w-full pl-3 pr-3 pt-2 pb-2 rounded-md flex justify-between'>
                                    <p> None </p>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                }
                {view?.toLowerCase() === 'clase' &&
                    <div>
                        clase
                    </div>
                }
                {view?.toLowerCase() === 'activitate' &&
                    <div>
                        activitate
                    </div>
                }
                {view?.toLowerCase() === 'subiecte' &&
                    <div>
                        subiecte
                    </div>
                }
                {view?.toLowerCase() === 'articole' &&
                    <div>
                        articole
                    </div>
                }
                {view?.toLowerCase() === 'setari' &&
                    <div>
                        setari
                    </div>
                }
            </div>
        </div>
    );
}
 
export default ViewProfile;