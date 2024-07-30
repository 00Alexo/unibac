import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Navbar, Input, NavbarBrand, NavbarContent, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Switch, Badge,
Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Tabs, Tab, Card, CardBody, Tooltip,
NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Avatar, cn, DropdownSection} from "@nextui-org/react";
import { useLogout } from '../hooks/useLogout';
import { useGetProfile } from '../hooks/useGetProfile';
import { useAuthContext } from '../hooks/useAuthContext';
import React from "react";
import { NotificationBox } from './alertBox';

export const NotificationIcon = ({size, height, width, ...props}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
        fill='currentColor'
        fillRule="evenodd"
      />
    </svg>
  );
};

export const DeleteDocumentIcon = (props) => (
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
      d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
      fill="currentColor"
    />
    <path
      d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
      fill="currentColor"
      opacity={0.399}
    />
    <path
      clipRule="evenodd"
      d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);


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


export const MoonIcon = (props) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunIcon = (props) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

const NavBar = () => {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    const menuItems = [
      "Bibliografie",
      'Articole',
      "MinaAi",
      "Compiler",
      "Games",
      "Clase",
      "Concursuri"
    ];

    const [isHovered, setIsHovered] = useState([]);

const handleMouseEnter = (index) => {
  setIsHovered(prevState => {
    const newState = [...prevState];
    newState[index] = true;
    return newState;
  });
};

const handleMouseLeave = (index) => {
  setIsHovered(prevState => {
    const newState = [...prevState];
    newState[index] = false;
    return newState;
  });
};

const {logout} = useLogout();

const handleLogoutClick = () =>{
  logout();
}

const {user} = useAuthContext();

const { viewUser: userData, error, isLoading, refetchProfile} = useGetProfile(user?.username)

const {isOpen, onOpen, onOpenChange} = useDisclosure();
const [notification, setNotification] = useState(null);
const [notification2, setNotification2] = useState(null);

const markOneAsRead = async (username, id, action) =>{
  const response = await fetch(`${process.env.REACT_APP_API}/api/notifications/markOneAsRead`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
    },
    body: JSON.stringify({username: username, id: id, userAuth: user.username})
  })

  const json = await response.json();

  if(!response.ok){
    console.log(json.error);
  }
  
  if(response.ok){
    refetchProfile();
    if(action){
      setNotification(null);
      setNotification(`Ai marcat mesajul ca si citit!`);
      setTimeout(() =>{
          setNotification(null);
      }, 7000)
    }
  }

}

const handleFollow = async (follower, toBeFollowed, id) =>{
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
  }
  
  if(response.ok){
      setNotification(null);
      console.log(json);  
      markOneAsRead(follower, id, 0);
      setNotification(`I-ai dat follow cu succes lui ${toBeFollowed}`);
      setTimeout(() =>{
          setNotification(null);
      }, 7000)
  }
}


const markAllAsRead = async () =>{
  const response = await fetch(`${process.env.REACT_APP_API}/api/notifications/markAllAsRead`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
    },
    body: JSON.stringify({username: user.username, userAuth: user.username})
  })

  const json = await response.json();

  if(!response.ok){
    console.log(json.error);
  }
  
  if(response.ok){
    setNotification(null);
    refetchProfile();
    setNotification2(`Ai marcat toate mesajele ca si citite!`);
    setTimeout(() =>{
        setNotification2(null);
    }, 7000)
  }
}

const [isSmallScreen, setIsSmallScreen] = useState(false);
const [search, setSearch] = useState(null);

useEffect(() => {
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 500);
  };

  checkScreenSize();

  window.addEventListener('resize', checkScreenSize);

  return () => {
    window.removeEventListener('resize', checkScreenSize);
  };

}, []);

const navigateToProfile = (sender) => {
  navigate(`/profile/${sender}`);
};

window.navigateToProfile = navigateToProfile;


  return (
    <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen} className="dark text-foreground bg-background" isBordered
    classNames={{
      item: [
        "flex",
        "relative",
        "h-full",
        "items-center",
        "data-[active=true]:after:content-['']",
        "data-[active=true]:after:absolute",
        "data-[active=true]:after:bottom-0",
        "data-[active=true]:after:left-0",
        "data-[active=true]:after:right-0",
        "data-[active=true]:after:h-[2px]",
        "data-[active=true]:after:rounded-[2px]",
        "data-[active=true]:after:bg-primary",
      ],
    }}>
      {notification2 && <NotificationBox notification={notification2}/>}
      
      <Modal style={{marginTop:'-1px'}}
        isOpen={isOpen}
        size='xl'
        onOpenChange={onOpenChange}
        scrollBehavior='inside'
        backdrop='opaque'
        placement='center'
      >
        {notification && <NotificationBox notification={notification}/>}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={isSmallScreen ? 'px-3 flex flex-col gap-1' : 'px-6 flex flex-col gap-1'}>
                Notificari
              </ModalHeader>
              <ModalBody className={isSmallScreen ? 'px-3 !important' : 'px-6'}>
                {userData?.notifications.notifications.length == 0 ? <p>No new notifications</p> : (
                <Tabs aria-label="Options" size={isSmallScreen ? 'sm' : 'md'}>
                  <Tab key="All" title="All">
                  {userData?.notifications.notifications.slice().reverse().map((notification) =>{
                  return (
                    <div style={{padding:'5px'}}> 
                        {notification &&
                        <div className="flex items-center justify-between">
                          <div className='flex flex-row gap-3 items-center' style={{paddingRight:'10px'}}>
                            <div className={notification.status==='unread' ? 'notificationsBulinuta' : ' '}>
                              {/* {notification.status === 'unread' &&
                              <div style={{width:'10px', height:'10px', borderRadius:'50%', backgroundColor:'#0DA1D4', position:'absolute',
                              zIndex:'999999', marginTop:'-3px', marginLeft:'-5px'}} className='notificationsBulinuta'></div>
                              } */}

                              <img src={notification?.avatar.avatar} className=" text-large avatar-image-profile notificationsImage" 
                                onError={(e) => {
                                e.target.src = `https://via.placeholder.com/150?text=${notification.sender.charAt(0).toUpperCase()}`;
                                }}
                              />
                            </div>
                            <p className='notificationsText' onClick={() => onClose()} dangerouslySetInnerHTML={{ __html: notification.message }}></p>
                          </div>
                          <div className='flex gap-2'>
                          {notification.type == 'newFollower' && !userData.following.some(f => f.username === notification.sender) && (
                            <Button 
                              size={isSmallScreen ? 'sm' : 'md'} 
                              style={isSmallScreen ? { marginRight: '-10px' } : {}}
                              color='default' 
                              variant="ghost" 
                              onClick={() => handleFollow(user.username, notification.sender, notification.id)}
                            > 
                              Follow
                            </Button>
                          )}
                          {notification.type == 'newFollower' && userData.following.some(f => f.username === notification.sender) && (
                            <Button 
                              size={isSmallScreen ? 'sm' : 'md'} 
                              style={isSmallScreen ? { marginRight: '-10px' } : {}}
                              color='default' 
                              variant="ghost" 
                              isDisabled
                            > 
                              Following
                            </Button>
                          )}
                          {!isSmallScreen &&
                          <Tooltip showArrow={true} placement = 'right' color='primary' content="Mark as unread">
                            <Button className='min-w-unit-10 px-unit-2 gap-unit-2' style={{marginRight:'-10px'}}
                            color='primary' variant="shadow" isDisabled={notification.status === 'read'}
                            onClick={()=> markOneAsRead(user.username, notification.id, 1)} size={isSmallScreen ? 'sm' : 'md'}> 
                              <p style={{fontSize:'1.2rem'}}>ℛ</p>
                            </Button>
                          </Tooltip>
                          }
                          </div>
                        </div>
                    }
                    </div>
                    )
                  })} 
                  </Tab>
                  <Tab key="unread" title="Unread">
                  {userData?.notifications.notifications.slice().reverse().filter(notification => notification.status === 'unread').map((notification) =>{
                    return (
                      <div style={{padding:'5px'}}>
                        {notification.status =='unread' &&
                          <div className="flex items-center justify-between">
                            <div className='flex flex-row gap-3 items-center'>
                              <div className='notificationsBulinuta'>
                                <img src={notification?.avatar.avatar} className=" text-large avatar-image-profile notificationsImage" 
                                  onError={(e) => {
                                  e.target.src = `https://via.placeholder.com/150?text=${notification.sender.charAt(0).toUpperCase()}`;
                                  }}
                                />
                              </div>
                              <p className='notificationsText' onClick={() => onClose()} dangerouslySetInnerHTML={{ __html: notification.message }}></p>
                            </div>
                            <div className='flex gap-2'>
                              {notification.type == 'newFollower' && !userData.following.includes(notification.sender) && (
                                <Button size={isSmallScreen ? 'sm' : 'md'} style={isSmallScreen ? {marginRight:'-10px'} : {}}
                                color='default' variant="ghost" onClick={() => handleFollow(user.username, notification.sender, notification.id)}> 
                                  Follow
                                </Button>
                              )}
                              {notification.type == 'newFollower' && userData.following.includes(notification.sender) && (
                                <Button color='default' variant="ghost" isDisabled size={isSmallScreen ? 'sm' : 'md'}
                                style={isSmallScreen ? {marginRight:'-10px'} : {}}> 
                                  Following
                                </Button>
                              )}
                              {!isSmallScreen &&
                              <Tooltip showArrow={true} placement = 'right' color='primary' content="Mark as unread">
                                <Button className='min-w-unit-10 px-unit-2 gap-unit-2' style={{marginRight:'-10px'}}
                                color='primary' variant="shadow" isDisabled={notification.status === 'read'}
                                onClick={()=> markOneAsRead(user.username, notification.id, 1)}> 
                                  <p style={{fontSize:'1.2rem'}}>ℛ</p>
                                </Button>
                              </Tooltip>
                              }
                            </div>
                          </div>
                        }
                      </div>
                      )
                    })} 
                  </Tab>
                </Tabs>
                )}
              </ModalBody>
              <ModalFooter className={isSmallScreen ? 'px-3 !important' : 'px-6'}>
                <Button color="danger" variant="light" onPress={onClose} size={isSmallScreen ? 'sm' : 'md'}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={markAllAsRead} isDisabled = {!userData.notifications.unread} size={isSmallScreen ? 'sm' : 'md'}>
                  Mark all as read
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand style={{cursor:'pointer'}} onClick={() => navigate('/home')}>
          {/* <img src={logo_unibac} alt="logo" className="h-10 w-10" /> */}
          <p className="font-bold text-inherit">UNIBAC</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem style={{cursor:'pointer'}} isActive={isHovered[0]} onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={() => handleMouseLeave(0)}>
          <Link color="foreground" onClick={() => navigate('/bibliografie')} >
            Bibliografie
          </Link>
        </NavbarItem>
        <Dropdown>
        <NavbarItem style={{cursor:'pointer'}} isActive={isHovered[1]} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)}>
          <DropdownTrigger>
            <Link color="foreground">
              Articole
            </Link>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu variant="faded"
        itemClasses={{
          base: "gap-4",
        }}>
        <DropdownSection showDivider title="Elevi"> 
        <DropdownItem
          onClick={() => navigate('/articole/informatica')}
          key="Informatica"
        >
          Informatica
        </DropdownItem>
        <DropdownItem
          onClick={() => navigate('/articole/matematica')}
          key="Matematica"
        >
          Matematica
        </DropdownItem>
        <DropdownItem
          onClick={() => navigate('/articole/fizica')}
          key="Fizica"
        >
          Fizica
        </DropdownItem>
        <DropdownItem
          onClick={() => navigate('/articole/chimie')}
          key="Chimie"
        >
          Chimie
        </DropdownItem>
        <DropdownItem
          onClick={() => navigate('/articole/romana')}
          key="Romana"
        >
          Romana
        </DropdownItem>
        <DropdownItem
          onClick={() => navigate('/articole/biologie')}
          key="Biologie"
        >
          Biologie
        </DropdownItem>
        <DropdownItem
          onClick={() => navigate('/articole/Istorie')}
          key="Istorie"
        >
          Istorie
        </DropdownItem>
        <DropdownItem
          onClick={() => navigate('/articole/geografie')}
          key="Geografie"
        >
          Geografie
        </DropdownItem>
        <DropdownItem
          onClick={() => navigate('/articole/Psihologie')}
          key="Psihologie"
        >
          Psihologie
        </DropdownItem>
        </DropdownSection>
        <DropdownSection  title="Profesori">
          <DropdownItem
            onClick={() => navigate('/articole/Posteaza un articol')}
            key="Posteaza"
          >
            Posteaza un articol
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem style={{cursor:'pointer'}} isActive={isHovered[2]} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)}>
            <DropdownTrigger>
              <Link color="foreground">
                Features
              </Link>
            </DropdownTrigger>
          </NavbarItem>
            <DropdownMenu variant="faded"
            itemClasses={{
              base: "gap-4",
            }}>
            <DropdownItem onClick={() => {navigate('/minaAi'); window.location.reload();}}
              key="MinaAi"
            >
              MinaAi
            </DropdownItem>
            <DropdownItem onClick={() => {navigate('/compiler')}}
              key="MinaAi"
            >
              Compiler
            </DropdownItem>
            <DropdownItem onClick={() => navigate('/games')}
              key="Games"
            >
              Games
            </DropdownItem>
            <DropdownItem onClick={() => navigate('/clase')}
              key="clase"
            >
              Clase
            </DropdownItem>
            <DropdownItem onClick={() => navigate('/concursuri')}
              key="concursuri"
            >
              Concursuri
            </DropdownItem>
          </DropdownMenu>
      </Dropdown>
      {userData?.statut === 'profesor' &&
      <Dropdown>
          <NavbarItem style={{cursor:'pointer'}} isActive={isHovered[3]} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={() => handleMouseLeave(3)}>
            <DropdownTrigger>
              <Link color="foreground">
                Profesori
              </Link>
            </DropdownTrigger>
          </NavbarItem>
            <DropdownMenu variant="faded"
            itemClasses={{
              base: "gap-4",
            }}>
            <DropdownSection showDivider title="Subiecte"> 
              <DropdownItem onClick={() => {navigate('/subiecte/posteaza')}}
                key="Subiect"
              >
                Posteaza un subiect
              </DropdownItem>
              <DropdownItem onClick={() => {navigate(`/profile/${user.username}/idkyet`)}}
                key="Subiect"
              >
                Subiecte postate de tine
              </DropdownItem>
            </DropdownSection>
            
            <DropdownSection showDivider title="Articole"> 
              <DropdownItem onClick={() => {navigate('/articole/posteaza')}}
                key="Subiect"
              >
                Posteaza un articol
              </DropdownItem>
              <DropdownItem onClick={() => {navigate(`/profile/${user.username}/idkyet`)}}
                key="Subiect"
              >
                Articole postate de tine
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider title="Clase"> 
              <DropdownItem onClick={() => {navigate('/createClass')}}
                key="Subiect"
              >
                Creeaza o clasa
              </DropdownItem>
              <DropdownItem onClick={() => {navigate(`/profile/${user.username}/idkyet`)}}
                key="Subiect"
              >
                Clasele tale
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
      </Dropdown>
      }
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Input className='search-input'
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
                navigate(`/search/${search}`);
                window.location.reload()
            }
          }}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        {user &&
        <NavbarItem >
          <Badge content={userData?.notifications.unread > 0 && `${userData?.notifications.unread}`} shape="circle" color="danger">
            <Button
              onClick={onOpen}
              radius="full"
              isIconOnly
              variant="light"
            >
              <NotificationIcon size={30} />
            </Button>
          </Badge>  
        </NavbarItem>}
        {user &&
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                color = "primary"
                showFallback
                name = {user.username.charAt(0).toUpperCase()}
                as="button"
                className="transition-transform"
                src={userData?.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownSection showDivider>
                <DropdownItem key="settings" onClick={() => navigate(`/profile/${user.username}`)}>
                  Profil
                </DropdownItem>
                <DropdownItem key="settings" onClick={() => navigate(`/profile/${user.username}/setari`)}>
                  Setari
                </DropdownItem>
              </DropdownSection>
              <DropdownSection showDivider>
                <DropdownItem key="settings" onClick={() => navigate(`/profile/${user.username}/clase`)}>
                  Clasele mele
                </DropdownItem>
                <DropdownItem key="settings" onClick={() => navigate(`/profile/${user.username}/teme`)}>
                  Teme
                </DropdownItem>
              </DropdownSection>
              <DropdownItem key="logout" color="danger" className="text-danger" onClick={handleLogoutClick}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        }
        {!user &&
        <NavbarItem>
          <Button as={Link} color="primary" variant="flat" onClick={() => navigate('/sign-in')}>
            LOGIN
          </Button>
        </NavbarItem>
        }
      </NavbarContent>
      <NavbarMenu>
      <Input
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
                navigate(`/search/${search}`);
                window.location.reload()
            }
          }}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          
        />
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            {index !== 1 &&
            <Link
              onClick={() => {navigate(`/${item}`); window.location.reload();}}
              color={
                "foreground"
              }
              style={{cursor:'pointer'}}
              className="w-full"
              size="lg"
            >
              {item}
            </Link>
            }
            {index === 1 &&
              <Dropdown>
              <DropdownTrigger>
                <Link
                  color={
                    "foreground"
                  }
                  style={{cursor:'pointer'}}
                  className="w-full"
                  size="lg"
                >
                  Articole
                </Link>
              </DropdownTrigger>
              <DropdownMenu variant="faded"
              itemClasses={{
                base: "gap-4",
              }}>
              <DropdownSection showDivider title="Elevi"> 
              <DropdownItem
                onClick={() => navigate('/articole/informatica')}
                key="Informatica"
              >
                Informatica
              </DropdownItem>
              <DropdownItem
                onClick={() => navigate('/articole/matematica')}
                key="Matematica"
              >
                Matematica
              </DropdownItem>
              <DropdownItem
                onClick={() => navigate('/articole/fizica')}
                key="Fizica"
              >
                Fizica
              </DropdownItem>
              <DropdownItem
                onClick={() => navigate('/articole/chimie')}
                key="Chimie"
              >
                Chimie
              </DropdownItem>
              <DropdownItem
                onClick={() => navigate('/articole/romana')}
                key="Romana"
              >
                Romana
              </DropdownItem>
              <DropdownItem
                onClick={() => navigate('/articole/biologie')}
                key="Biologie"
              >
                Biologie
              </DropdownItem>
              <DropdownItem
                onClick={() => navigate('/articole/Istorie')}
                key="Istorie"
              >
                Istorie
              </DropdownItem>
              <DropdownItem
                onClick={() => navigate('/articole/geografie')}
                key="Geografie"
              >
                Geografie
              </DropdownItem>
              <DropdownItem
                onClick={() => navigate('/articole/Psihologie')}
                key="Psihologie"
              >
                Psihologie
              </DropdownItem>
              </DropdownSection>
              <DropdownSection  title="Profesori">
                <DropdownItem
                  onClick={() => navigate('/articole/posteaza')}
                  key="Posteaza"
                >
                  Posteaza un articol
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
            </Dropdown>
            }
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    );
};

export default NavBar;