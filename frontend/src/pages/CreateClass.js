import {Input, Button, Select, SelectItem, Autocomplete, AutocompleteItem, Tooltip, Textarea} from "@nextui-org/react";
import {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import PageNotFound from '../pages/404.js'
import { Error } from "../components/alertBox.js";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./SignUp.js";
import CmpCreateClass from "../components/CmpCreateClass.js";
import {useCreateClass} from "../hooks/useCreateClass.js";

const CreateClass = () => {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useAuthContext()

    const [isVisible, setIsVisible] = useState(false);;

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [isVisibleConf, setIsVisibleConf] = useState(false);;

    const toggleVisibilityConf = () => setIsVisibleConf(!isVisibleConf);

    const subiecte = [
        { label: 'Informatica', value: 'informatica' },
        { label: 'Matematica', value: 'matematica' },
        { label: 'Fizica', value: 'fizica' },
        { label: 'Chimie', value: 'chimie' },
        { label: 'Romana', value: 'romana' },
        { label: 'Biologie', value: 'biologie' },
        { label: 'Istorie', value: 'istorie' },
        { label: 'Geografie', value: 'geografie' },
        { label: 'Psihologie', value: 'psihologie' }
    ];

    const [status, setStatus] = useState(null);
    const [subiect, setSubiect] = useState(null);
    const [avatar, setAvatar] = useState('https://static.vecteezy.com/system/resources/thumbnails/002/227/847/small/programmer-computer-expert-black-linear-icon-vector.jpg');
    const [className, setClassName] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [descriere, setDescriere] = useState(null);
    const {createClass, error, isLoading, errorFields} = useCreateClass();

    const handleSignUpSubmit = async (e) =>{
        e.preventDefault()

        await createClass(user.username, className, password, confirmPassword, subiect, descriere, avatar, status, user.token);
    }

    useEffect(()=>{
        const userVerify = async() =>{
            const response = await fetch(`${process.env.REACT_APP_API}/api/user/statusVerifier?username=${user?.username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            const json = await response.json();

            if(!response.ok){
                console.log(json.error);
                navigate('/404');
            }

            if(response.ok){
                console.log(json.user.statut);
                if(json.user.statut !== 'profesor')
                    navigate('/404');
            }
        }
        
        if(user)
            userVerify();
    }, [user])

    if(!user)
        return (
            <PageNotFound/>
        )
    return (
        <div className="flex">
            {error && <Error error={error}/>}
            <div className="flex flex-row mx-auto w-[100%] mb-5 mt-[30px] pl-7 gap-10 pr-7 justify-between" style={{borderRadius:'10px'}}>
                <div className="w-[60%] bg-[#030108] contains-cmp-createclass">
                    <CmpCreateClass/>
                </div>
                <form className="flex flex-col contains-createclass w-[40%]">
                    <p className="create-class-text text-center mt-5">CREATE CLASS</p>
                    <div className="contains-class-inputs mt-20 w-full mx-auto">
                        <div className={errorFields?.includes('className') ? 
                        'oSaAibaEroare flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4' : 'flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4'}>
                            <Input required isClearable type="email" variant="bordered"
                            label="Numele clasei" size='lg'
                            onChange={(e) => {setClassName(e.target.value)}}
                            value={className}
                            />
                        </div>
                        <div className="w-full flex justify-between">
                            <div className={errorFields?.includes('status') ? 'oSaAibaEroare w-[48%]' : 'w-[48%]'}>
                                <Select required
                                    size='md'
                                    label="Status" 
                                    variant = "bordered"
                                    onChange={(e) => { setStatus(e.target.value); console.log(e.target.value)}}
                                    value={status}
                                >
                                    <SelectItem value = "Privat">
                                        Privat
                                    </SelectItem>
                                    <SelectItem value = "Public">
                                        Public
                                    </SelectItem>
                                </Select>
                            </div>
                            <div className={errorFields?.includes('subject') ? 'oSaAibaEroare w-[48%]' : 'w-[48%]'}>
                                <Autocomplete required
                                    size='md'
                                    defaultItems={subiecte}
                                    label="Subiect" 
                                    variant = "bordered"
                                    onSelectionChange={(value) => { setSubiect(value); console.log(subiect)}}
                                    value={subiect}
                                >
                                    {(subiecte) => <AutocompleteItem key={subiecte.value}>{subiecte.label}</AutocompleteItem>}
                                </Autocomplete>
                            </div>
                        </div>
                        <div className={errorFields?.includes('password') && status != '$.1' ? 'oSaAibaEroare flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4' : 
                        'flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4'}>
                            {status === '$.1' &&
                                <Tooltip key="danger" color="danger" content="Parola este disponibila doar pentru clasele private" 
                                className="capitalize" placement="right">
                                <div className="capitalize absolute" style={{marginLeft:'-33px'}}>
                                    <svg fill="#631530" height="60px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                                        viewBox="0 0 27.963 27.963" xmlSpace="preserve">
                                    <g>
                                        <g id="c129_exclamation">
                                            <path d="M13.983,0C6.261,0,0.001,6.259,0.001,13.979c0,7.724,6.26,13.984,13.982,13.984s13.98-6.261,13.98-13.984
                                                C27.963,6.259,21.705,0,13.983,0z M13.983,26.531c-6.933,0-12.55-5.62-12.55-12.553c0-6.93,5.617-12.548,12.55-12.548
                                                c6.931,0,12.549,5.618,12.549,12.548C26.531,20.911,20.913,26.531,13.983,26.531z"/>
                                            <polygon points="15.579,17.158 16.191,4.579 11.804,4.579 12.414,17.158 		"/>
                                            <path d="M13.998,18.546c-1.471,0-2.5,1.029-2.5,2.526c0,1.443,0.999,2.528,2.444,2.528h0.056c1.499,0,2.469-1.085,2.469-2.528
                                                C16.441,19.575,15.468,18.546,13.998,18.546z"/>
                                        </g>
                                        <g id="Capa_1_207_">
                                        </g>
                                    </g>
                                    </svg>
                                </div>   
                            </Tooltip>
                            }
                            <Input isDisabled={status === '$.1'}
                            required variant="bordered"label="Password" size='md'
                            endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                            }
                            type={isVisible ? "text" : "password"}
                            onChange={(e) => { setPassword(e.target.value); console.log(password)}}
                            value={password}
                            />
                        </div>
                        <div className={errorFields?.includes('confirmPassword') && status != '$.1' ? 'oSaAibaEroare flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4' : 
                        'flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4'}>
                            {status === '$.1' &&
                                <Tooltip key="danger" color="danger" content="Parola este disponibila doar pentru clasele private" 
                                className="capitalize" placement="right">
                                <div className="capitalize absolute" style={{marginLeft:'-33px'}}>
                                    <svg fill="#631530" height="60px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                                        viewBox="0 0 27.963 27.963" xmlSpace="preserve">
                                    <g>
                                        <g id="c129_exclamation">
                                            <path d="M13.983,0C6.261,0,0.001,6.259,0.001,13.979c0,7.724,6.26,13.984,13.982,13.984s13.98-6.261,13.98-13.984
                                                C27.963,6.259,21.705,0,13.983,0z M13.983,26.531c-6.933,0-12.55-5.62-12.55-12.553c0-6.93,5.617-12.548,12.55-12.548
                                                c6.931,0,12.549,5.618,12.549,12.548C26.531,20.911,20.913,26.531,13.983,26.531z"/>
                                            <polygon points="15.579,17.158 16.191,4.579 11.804,4.579 12.414,17.158 		"/>
                                            <path d="M13.998,18.546c-1.471,0-2.5,1.029-2.5,2.526c0,1.443,0.999,2.528,2.444,2.528h0.056c1.499,0,2.469-1.085,2.469-2.528
                                                C16.441,19.575,15.468,18.546,13.998,18.546z"/>
                                        </g>
                                        <g id="Capa_1_207_">
                                        </g>
                                    </g>
                                    </svg>
                                </div>   
                            </Tooltip>
                            }
                            <Input isDisabled={status === '$.1'}
                            required variant="bordered"label="Confirm Password" size='md'
                            endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibilityConf}>
                                {isVisibleConf ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                            }
                            type={isVisibleConf ? "text" : "password"}
                            onChange={(e) => { setConfirmPassword(e.target.value); console.log(confirmPassword)}}
                            value={confirmPassword}
                            />
                        </div>
                        <div className={errorFields?.includes('description') ? 'oSaAibaEroare flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4'
                            : 'flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4'}>
                            <Textarea required variant="bordered" label="Descriere" size='md'
                            onChange={(e) => { setDescriere(e.target.value); console.log(descriere)}}
                            value={descriere}
                            />
                        </div>
                    </div>
                    <input
                        style={{display:'none'}}
                        ref={fileInputRef}
                        type='file'
                        accept='image/*' 
                        onChange={(e) => {
                            setAvatar(e.target.files[0]);
                            console.log(e.target.files[0]);
                        }}>
                    </input>
                    <div className="flex w-full mt-5">
                        <div className="flex flex-row items-center gap-3 cursor-pointer" onClick={() => {fileInputRef.current?.click()}}>
                            <svg
                                version="1.1"
                                id="Layer_1"
                                height='40px'
                                width='40px'
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                fill="#71717A"
                                viewBox="0 0 121.86 122.88"
                                style={{ enableBackground: "new 0 0 121.86 122.88" }}
                                xmlSpace="preserve"
                            >
                                <g>
                                <path
                                    className="st0"
                                    d="M72.09,18.72h42.37c2.05,0,3.89,0.84,5.22,2.18c1.34,1.34,2.18,3.2,2.18,5.22v89.36 c0,2.05-0.84,3.89-2.18,5.22c-1.34,1.34-3.2,2.18-5.22,2.18H24.48c-2.05,0-3.89-0.84-5.22-2.18c-1.34-1.34-2.18-3.2-2.18-5.22 V71.46c2.47,1,5.05,1.78,7.72,2.29v20.28h0.03l0,0C37.72,81.7,46.26,75.61,59.08,65.2c0.05,0.05,0.1,0.1,0.15,0.15 c0.03,0.03,0.03,0.06,0.06,0.06l26.82,31.73l4.1-25.24c0.28-1.62,1.8-2.73,3.42-2.45c0.62,0.09,1.18,0.4,1.62,0.81l18.82,19.77 V27.91c0-0.4-0.16-0.75-0.44-0.99c-0.25-0.25-0.62-0.44-0.99-0.44H74.05C73.64,23.8,72.98,21.21,72.09,18.72L72.09,18.72z M32.79,0 C50.9,0,65.58,14.68,65.58,32.79c0,18.11-14.68,32.79-32.79,32.79C14.68,65.58,0,50.9,0,32.79C0,14.68,14.68,0,32.79,0L32.79,0z M15.37,33.37h11.04v15.76h12.45V33.37h11.36L32.8,16.44L15.37,33.37L15.37,33.37L15.37,33.37z M94.27,35.66 c2.95,0,5.66,1.21,7.58,3.14c1.96,1.96,3.14,4.63,3.14,7.59c0,2.95-1.21,5.66-3.14,7.58c-1.96,1.96-4.63,3.14-7.58,3.14 c-2.95,0-5.66-1.21-7.59-3.14c-1.96-1.96-3.14-4.63-3.14-7.58c0-2.95,1.21-5.65,3.14-7.59C88.65,36.84,91.32,35.66,94.27,35.66 L94.27,35.66L94.27,35.66z"
                                />
                                </g>
                            </svg>
                            <p> Upload avatar </p>
                        </div>
                        <div className="ml-auto">
                            <Button 
                            isDisabled ={isLoading} onClick={handleSignUpSubmit}
                            color="default" type = "submit" 
                            variant="bordered" size='lg' className="btnSgnUp">
                                Submit
                            </Button> 
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default CreateClass;