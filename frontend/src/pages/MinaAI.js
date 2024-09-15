import {Avatar, Input, ScrollShadow} from "@nextui-org/react";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import { useAuthContext } from '../hooks/useAuthContext';
import {useRef, useState, useEffect} from 'react'
import React from 'react'
import { Error } from "../components/alertBox";
import { useGetProfile } from '../hooks/useGetProfile';
import {useParams, useNavigate} from 'react-router-dom';
import minaAi from '../assets/minaAi.jpg'
import Loading from "./Loading";
const MinaAi = () => {
    const {convId} = useParams();
    const navigate = useNavigate();
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
    const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth <= 725);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
        window.removeEventListener('resize', checkScreenSize);
    };

    }, []);

    const [isMenuOpen, setIsMenuOpen] = useState(true);

    useEffect(() =>{
        if(isSmallScreen) 
            setIsMenuOpen(false);
        else
            setIsMenuOpen(true);
    }, [isSmallScreen])
    const {user} = useAuthContext();
    const { viewUser: userData, refetchProfile} = useGetProfile(user?.username)
    const [prompt, setPrompt] = useState('')
    const [prompts, setPrompts] = useState([])
    const [conversatii, setConversatii] = useState();
    const [loading, setLoading] = useState(false);
    //loading, save prompts, display prompts (user prompt, mina prompt, user prompt, mina prompt, ...)

    const getPromptsConv = async() =>{
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API}/api/minaAi/getPromptsConv/${convId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                username: user && user.username ? user.username : null
            })
        })
        const json = await response.json()
        if(!response.ok){
            setLoading(false);
            setError(json.error)
            setTimeout(() => {
                setError(null);
            }, 7000)
        }else{
            setPrompts(json.prompts);
            setLoading(false);
        }
    }

    const [max3, setMax3] = useState(0)

    if(convId && max3<3 && user){
        getPromptsConv();
        setMax3(prevMax3 => prevMax3 + 1);
    }

    const getPromptsHistory = async () =>{
        const response = await fetch(`${process.env.REACT_APP_API}/api/minaAi/getPromptsHistory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                username: user && user.username ? user.username : null
            })
        })
        const json = await response.json()
        if(!response.ok){
            console.log(json)
            setError(json.error)
            setTimeout(() => {
                setError(null);
            }, 7000)
        }else{
            setConversatii(json.prompts);
        }
    }

    useEffect(() =>{
        setConversatii([]);
        if(user){
            getPromptsHistory();
        }
    }, [user, prompts]);


    const getPrompt = async() => {
        if(convId){
            setIsTyping(true);
            prompts.push({role: 'user', content: prompt})
                const response = await fetch(`${process.env.REACT_APP_API}/api/minaAi/chatMinaAi/${convId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify({
                        prompt, username: user && user.username ? user.username : null
                    })
                })
                const json = await response.json()
                if(!response.ok){
                    console.log(json)
                    setError(json.error)
                    setTimeout(() =>{
                        setError(null);
                        setPrompts([]);
                        navigate('/minaAi')
                    }, 7000)
                    setIsTyping(false);
                }else{
                    console.log(json)
                    setPrompts([...prompts, {role: 'assistant', content: json.message}]);
                    setIsTyping(false);
                }
        }else{
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_API}/api/minaAi/newChatMinaAi`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    prompt, username: user && user.username ? user.username : null
                })
            })
            const json = await response.json()
            if(!response.ok){
                console.log(json)
                setError(json.error)
                setTimeout(() =>{
                    setError(null);
                }, 7000)
                setLoading(false);
            }else{
                console.log(json);
                setLoading(false);
                navigate(`/minaAI/${json.chatId}`);
            }
        }
    }



    const [azi, setAzi] = useState([]);
    const [ieri, setIeri] = useState([]);
    const [tzz, setTzz] = useState([]);
    const [altele, setAltele] = useState([]);

    useEffect(() =>{
        setAzi([]); setIeri([]); setTzz([]); setAltele([]);
        const today = new Date();
        today.setDate(today.getDate() - 1);

        const yesterday = today.toLocaleDateString('ro-RO');

        today.setDate(today.getDate() - 30);

        if(conversatii){
            conversatii.forEach((conversatie) =>{
                let parts = conversatie.date.split('.');
                let day = parseInt(parts[0], 10);
                let month = parseInt(parts[1], 10) - 1;
                let year = parseInt(parts[2], 10);

                let convDate = new Date(year, month, day);

                if(conversatie.date === new Date().toLocaleDateString('ro-RO')){
                    setAzi(prevAzi => [...prevAzi, conversatie])
                }else if(conversatie.date === yesterday){
                    setIeri(prevIeri => [...prevIeri, conversatie])
                }else if(convDate > today){
                    setTzz(prevTzz => [...prevTzz, conversatie])
                }else{
                    setAltele(prevAltele => [...prevAltele, conversatie])
                }
            })
        }
    },[conversatii]);

    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current && prompts.length > 0) {

            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [prompts, isTyping]);

    return (
        <div className="minaAi-principal">
            {loading && <Loading/>}
            {error && <Error error={error}/>}
            {isSmallScreen &&
            <button style={{zIndex: '3'}}
                auto
                bordered
                className="custom-toggle absolute left-2 text-2xl rounded-md shadow-sm"
                onClick={() => {
                    if(isMenuOpen)
                        setIsMenuOpen(false);
                    else
                        setIsMenuOpen(true);
                }}
            >
                {isMenuOpen ? '✕' : '☰'}
            </button>
            }
            {isMenuOpen &&
            <div className="sidebar-minaAi">
                <div style={{borderBottom:'1px solid white'}}>
                    <h1 style={{
                    background: 'linear-gradient(to right, blue, cyan)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                    }}>MinaAi</h1>
                </div>
                <ScrollShadow  className='minaAi-byyou'>
                    <p style={{paddingBottom:'5px'}} >Azi: </p>
                    <div className='flex flex-col mb-3'>
                    {azi?.slice().reverse().map((conv, index) => (
                        <div key={index} className='flex gap-2 p-1 mr-5' style={{cursor:'pointer'}} onClick={() => {
                            navigate(`/minaAi/${conv.chatId}`)
                            window.location.reload();
                        }}>
                            <ChatBubbleOutlineIcon/>
                            {conv.promptName}
                        </div>
                    ))}
                    </div>
                    <p style={{paddingBottom:'5px'}} >Ieri: </p>
                    <div className='flex flex-col mb-3'>
                    {ieri?.slice().reverse().map((conv, index) => (
                        <div key={index} className='flex gap-2 p-1 mr-5' style={{cursor:'pointer'}}  onClick={() => {
                            navigate(`/minaAi/${conv.chatId}`)
                            window.location.reload();
                        }}>
                            <ChatBubbleOutlineIcon/>
                            {conv.promptName}
                        </div>
                    ))}
                    </div>
                    <p style={{paddingBottom:'5px'}} >Ultimele 30 de zile: </p>
                    <div className='flex flex-col mb-3'>
                    {tzz.slice().reverse()?.map((conv, index) => (
                        <div key={index} className='flex gap-2 p-1 mr-5' style={{cursor:'pointer'}} onClick={() => {
                            navigate(`/minaAi/${conv.chatId}`)
                            window.location.reload();
                        }}>
                            <ChatBubbleOutlineIcon/>
                            {conv.promptName}
                        </div>
                    ))}
                    </div>
                    <p style={{paddingBottom:'5px'}} >Altele: </p>
                    <div className='flex flex-col mb-3'>
                    {altele.slice().reverse()?.map((conv, index) => (
                        <div key={index} className='flex gap-2 p-1 mr-5' style={{cursor:'pointer'}} onClick={() => {
                            navigate(`/minaAi/${conv.chatId}`)
                            window.location.reload();
                        }}>
                            <ChatBubbleOutlineIcon/>
                            {conv.promptName}
                        </div>
                    ))}
                    </div>
                </ScrollShadow>
                <div className="sidebar-minaAi-bottompart" style={{borderTop:'1px solid white'}}>
                    <div className='flex flex-row gap-1' style={{cursor:'pointer'}}>
                        <LiveHelpIcon style={{width:'20px', height:'20px', marginTop:'7px'}}/>
                        Help
                    </div>
                    <div className='flex flex-row gap-1' style={{cursor:'pointer'}}>
                        <SettingsIcon style={{width:'20px', height:'20px', marginTop:'7px'}}/>
                        Settings
                    </div>
                </div>
            </div>
            }
            <div className="chat-minaAi">
                <div className={isSmallScreen ? "w-[95%] mx-auto" : "w-[85%] mx-auto"}>
                    {user ?
                    <p style={{fontSize:'2rem'}}>
                        Welcome, {user.username.charAt(0).toUpperCase()}{user.username.substring(1, user.username.length)}!
                    </p>
                    : 
                    <p style={{fontSize:'2rem'}}>
                        Welcome, Newbie!
                    </p>
                    }
                    <p style={{fontSize:'1.2rem'}}>
                        Mina ignites minds with wisdom, making everything brighter...
                    </p>
                    {prompts.length == 0 && (
                                            <div className="flex w-[100%] mx-auto flex-row justify-evenly mt-12 mina-contains-prompt-ideas">
                                            <div className="prompt-ideas-mina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <div className="pl-4 pt-2 pr-4">
                                                    <p> What are data structures and why are they important in programming?</p>
                                                </div>
                                                <SendIcon className="pb-3 pr-4 iconitaSend" style={{width:'40px', height:'40px', cursor:'pointer'}}
                                                      onMouseEnter={() =>{
                                                        setPrompt("What are data structures and why are they important in programming?");
                                                    }}
                                                    onClick={() =>{
                                                        getPrompt();
                                                        setPrompt('');
                                                    }}/>          
                                            </div>
                                            <div className="prompt-ideas-mina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <div className="pl-4 pt-2 pr-4">
                                                    <p> Differences between object-oriented programming and functional programming?</p>
                                                </div>
                                                <SendIcon 
                                                    onMouseEnter={() =>{
                                                        setPrompt("What are the differences between object-oriented programming and functional programming?");
                                                    }}
                                                    onClick={() =>{
                                                        getPrompt();
                                                        setPrompt('');
                                                    }}
                                                className="pb-3 pr-4 iconitaSend" style={{width:'40px', height:'40px', cursor:'pointer'}}/>
                                            </div>
                                            <div className="prompt-ideas-mina prompt-hidden-mina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <div className="pl-4 pt-2 pr-4">
                                                    <p> What are the most important principles in object-oriented programming?</p>
                                                </div>
                                                <SendIcon 
                                                    onMouseEnter={() =>{
                                                        setPrompt("What are the most important principles in object-oriented programming?");
                                                    }}
                                                    onClick={() =>{
                                                        getPrompt();
                                                        setPrompt('');
                                                    }}
                                                    className="pb-3 pr-4" style={{width:'40px', height:'40px', cursor:'pointer'}}/>
                                            </div>
                                            <div className="prompt-ideas-mina prompt-hidden-mina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <div className="pl-4 pt-2 pr-4">
                                                    <p> How can you optimize the performance of a web application?</p>
                                                </div>
                                                <SendIcon 
                                                    onMouseEnter={() =>{
                                                        setPrompt("How can you optimize the performance of a web application?");
                                                    }}
                                                    onClick={() =>{
                                                        getPrompt();
                                                        setPrompt('');
                                                    }}
                                                    className="pb-3 pr-4" style={{width:'40px', height:'40px', cursor:'pointer'}}/>
                                            </div>
                                        </div>
                    )}
                <ScrollShadow>
                    {prompts.length !== 0 ? (
                        <div ref={containerRef} className="flex flex-col gap-5 mt-5 h-[500px] overflow-y-auto">
                            {prompts.map((prompt, index) => (
                                <div key={index} className={prompt.role==='user' ? 'flex justify-end mr-2 gap-3' : 'flex mr-2 gap-3'}>
                                    {prompt.role==='user' &&
                                    <div className="bg-zinc-800 rounded-md max-w-[85%]">
                                        <div className="bg-zinc-800 rounded-md">
                                            <p className="p-3" style={{wordBreak:'break-word', whiteSpace:'normal'}}>
                                                {prompt.content}
                                            </p>
                                        </div>
                                    </div>
                                    }
                                    {prompt.role !='system' &&
                                    <div className='p-1'>
                                        <Avatar
                                            isBordered
                                            className={isSmallScreen && prompt.role==='user' ? 'hidden' : ' '}
                                            size={isSmallScreen ? 'sm' : 'md'}
                                            color="primary"
                                            showFallback
                                            name={prompt.role === 'user' ? user?.username.charAt(0).toUpperCase() : 'AI'}
                                            src={prompt.role === 'user' ? userData?.avatar : minaAi}
                                        />
                                    </div>
                                    }
                                    {prompt.role==='assistant' &&
                                    <div className="bg-zinc-800 rounded-md max-w-[85%]">
                                        <div className="bg-zinc-800 rounded-md">
                                            <p className="p-3" style={{wordBreak:'break-word', whiteSpace:'normal'}}>
                                                {prompt.content}
                                            </p>
                                        </div>
                                    </div>
                                    }
                                </div>
                            ))}
                            {isTyping &&
                            <div className='flex mr-2 gap-8'>
                                <div className='p-1'>
                                    <Avatar
                                        isBordered
                                        size={isSmallScreen ? 'sm' : 'md'}
                                        color="primary"
                                        showFallback
                                        name='AI'
                                        src={minaAi}
                                    />
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="flex justify-center items-center">
                                        <div class="col-3">
                                            <div class="snippet" data-title="dot-flashing">
                                                <div class="stage">
                                                    <div class="dot-flashing"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    ) : <div></div>}
                </ScrollShadow>
                </div>
                <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} type="email" size="lg" variant="underlined" label="Message Mina"
                className={isSmallScreen ? "w-[95%] mx-auto" : "w-[85%] mx-auto"}
                endContent={
                    <button onClick={() => {
                        getPrompt(); 
                        setPrompt("")}} size="sm" auto icon={<SendIcon/>} color='primary'>
                        <SendIcon/>
                    </button>
                }
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        getPrompt();
                        setPrompt("");
                    }
                }}
                />
            </div>
        </div>
    );
}
 
export default MinaAi;