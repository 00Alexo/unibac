import {Button, Input, ScrollShadow} from "@nextui-org/react";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import { useAuthContext } from '../hooks/useAuthContext';
import {useState} from 'react'
const MinaAi = () => {
    const {user} = useAuthContext();
    const [prompt, setPrompt] = useState('')
    const [prompts, setPrompts] = useState([])
    //loading, save prompts, display prompts (user prompt, mina prompt, user prompt, mina prompt, ...)
    const getPrompt = async() => {
        prompts.push(prompt)
        try{
            const response = await fetch(`${process.env.REACT_APP_API}/api/minaAi/chatMinaAi`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt, username: user.username || 0
                })
            })
            const json = await response.json()
            if(response.success === false){
                console.log(json.error)
            }else{
                console.log(json)
                setPrompts([...prompts, json.message])
            }
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="minaAi-principal">
            <div className="sidebar-minaAi">
                <div style={{borderBottom:'1px solid white'}}>
                    <h1 style={{
                    background: 'linear-gradient(to right, blue, cyan)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                    }}>MinaAi</h1>
                </div>
                <div className='minaAi-byothpeople'>
                    <p style={{paddingBottom:'5px'}}>Your generations:</p>
                    <div className='flex  flex-col gap-2'>
                    <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Elefant 1
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Elefant 2
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Elefant 3
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Elefant 4
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Elefant 5
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Elefant 6
                        </div>
                    </div>
                </div>
                <div className='minaAi-byyou'>
                    <p style={{paddingBottom:'5px'}} >New generations:</p>
                    <div className='flex  flex-col gap-2'>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Pisoi 1
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Pisoi 2
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Pisoi 3
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Pisoi 4
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Pisoi 5
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Pisoi 6
                        </div>
                        {/* <p style={{fontSize:'2rem', marginTop:'-20px'}}> ... </p> */}
                    </div>
                </div>
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
            <div className="chat-minaAi">
                <div className="w-[80%] mx-auto">
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
                         <div className="flex flex-col gap-5 mt-5 h-[500px]">
                         {prompts.map((prompt, index) => (
                                 <div className="bg-zinc-800 rounded-md">
                                     <p className="p-3">
                                         <pre style={{whiteSpace: 'break-spaces'}}>{prompt}</pre>
                                     </p>
                                 </div>
                             ))}
                        </div>
                       ) : <div></div>}
                    </ScrollShadow>
                </div>
                <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} type="email" size="lg" variant="underlined" label="Message Mina" className="w-[80%] mx-auto"
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