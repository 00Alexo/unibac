import {Input, Button, Select, SelectItem, Autocomplete, AutocompleteItem, Tooltip, Textarea, CircularProgress, 
Checkbox, Spinner} from "@nextui-org/react";
import {useEffect, useState} from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import {Error, NotificationBox} from '../components/alertBox';
import Loading from "../pages/Loading";
import { useNavigate } from 'react-router-dom';

const PosteazaSubiect = () => {
    const navigate = useNavigate();

    const materii = [
        { label: 'Informatica', value: 'informatica' },
        { label: 'Matematica', value: 'matematica' },
        { label: 'Fizica', value: 'fizica' },
        { label: 'Chimie', value: 'chimie' },
        { label: 'Romana', value: 'romana' },
        { label: 'Biologie', value: 'biologie' },
        { label: 'Istorie', value: 'istorie' },
        { label: 'Geografie', value: 'geografie' },
        { label: 'Psihologie', value: 'psihologie' }
    ]
    
    const profiluriLiceu = [
        "Mate-Info",
        "Bio-Chimie",
        "Filologie",
        "Economic",
    ];

    const {user} = useAuthContext();
    const [postingSubject, setPostingSubject] = useState(false);

    const [notification, setNotification] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [errorFields, setErrorFields] = useState([]);

    const [materie, setMaterie] = useState('');
    const [profil, setProfil] = useState('');
    const [allowHelp, setAllowHelp] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [subiectIntreg, setSubiectIntreg] = useState(0);
    const [baremIntreg, setBaremIntreg] = useState(0);

    const [forS1, setForS1] = useState([1, 2, 3, 4, 5, 6]);
    const [s1r1, s1setR1] = useState(null);
    const [s1r2, s1setR2] = useState(null);
    const [s1r3, s1setR3] = useState(null);
    const [s1r4, s1setR4] = useState(null);
    const [s1r5, s1setR5] = useState(null);
    const [s1r6, s1setR6] = useState(null);
    const [s1b1, s1setB1] = useState(null);
    const [s1b2, s1setB2] = useState(null);
    const [s1b3, s1setB3] = useState(null);
    const [s1b4, s1setB4] = useState(null);
    const [s1b5, s1setB5] = useState(null);
    const [s1b6, s1setB6] = useState(null);

    const [forS2_1, setForS2_1] = useState(['1a', '1b', '1c']);
    const [s2r1a, s2setR1a] = useState(null);
    const [s2r1b, s2setR1b] = useState(null);
    const [s2r1c, s2setR1c] = useState(null);
    const [s2b1a, s2setB1a] = useState(null);
    const [s2b1b, s2setB1b] = useState(null);
    const [s2b1c, s2setB1c] = useState(null);

    const [forS2_2, setForS2_2] = useState(['2a', '2b', '2c']);
    const [s2r2a, s2setR2a] = useState(null);
    const [s2r2b, s2setR2b] = useState(null);
    const [s2r2c, s2setR2c] = useState(null);
    const [s2b2a, s2setB2a] = useState(null);
    const [s2b2b, s2setB2b] = useState(null);
    const [s2b2c, s2setB2c] = useState(null);

    const [s2r1, s2setR1] = useState(null);
    const [s2r2, s2setR2] = useState(null);


    const [forS3_1, setForS3_1] = useState(['1a', '1b', '1c']);
    const [s3r1a, s3setR1a] = useState(null);
    const [s3r1b, s3setR1b] = useState(null);
    const [s3r1c, s3setR1c] = useState(null);
    const [s3b1a, s3setB1a] = useState(null);
    const [s3b1b, s3setB1b] = useState(null);
    const [s3b1c, s3setB1c] = useState(null);

    const [forS3_2, setForS3_2] = useState(['2a', '2b', '2c']);
    const [s3r2a, s3setR2a] = useState(null);
    const [s3r2b, s3setR2b] = useState(null);
    const [s3r2c, s3setR2c] = useState(null);
    const [s3b2a, s3setB2a] = useState(null);
    const [s3b2b, s3setB2b] = useState(null);
    const [s3b2c, s3setB2c] = useState(null);

    const [s3r1, s3setR1] = useState(null);
    const [s3r2, s3setR2] = useState(null);

    const handleSetareProblemaS1 = (index, file) => {
        switch (index) {
          case 1: s1setR1(file); break;
          case 2: s1setR2(file); break;
          case 3: s1setR3(file); break;
          case 4: s1setR4(file); break;
          case 5: s1setR5(file); break;
          case 6: s1setR6(file); break;
          default: console.error("Index invalid pentru problema");
        }
      };
    
      const handleSetareBaremS1 = (index, file) => {
        switch (index) {
          case 1: s1setB1(file); break;
          case 2: s1setB2(file); break;
          case 3: s1setB3(file); break;
          case 4: s1setB4(file); break;
          case 5: s1setB5(file); break;
          case 6: s1setB6(file); break;
          default: console.error("Index invalid pentru barem");
        }
      };

      const handleSetareProblemaS2_1 = (index, file) =>{
        switch (index) {
            case '1a': s2setR1a(file); break;
            case '1b': s2setR1b(file); break;
            case '1c': s2setR1c(file); break;
            default: console.error("Index invalid pentru problema");
          }
      }

      const handleSetareProblemaS2_2 = (index, file) =>{
        switch (index) {
            case '2a': s2setR2a(file); break;
            case '2b': s2setR2b(file); break;
            case '2c': s2setR2c(file); break;
            default: console.error("Index invalid pentru problema");
          }
      }

      const handleSetareBaremS2_1 = (index, file) =>{
        switch (index) {
            case '1a': s2setB1a(file); break;
            case '1b': s2setB1b(file); break;
            case '1c': s2setB1c(file); break;
            default: console.error("Index invalid pentru problema");
          }
      }

      const handleSetareBaremS2_2 = (index, file) =>{
        switch (index) {
            case '2a': s2setB2a(file); break;
            case '2b': s2setB2b(file); break;
            case '2c': s2setB2c(file); break;
            default: console.error("Index invalid pentru problema");
          }
      }

      const handleSetareProblemaS3_1 = (index, file) =>{
        switch (index) {
            case '1a': s3setR1a(file); break;
            case '1b': s3setR1b(file); break;
            case '1c': s3setR1c(file); break;
            default: console.error("Index invalid pentru problema");
          }
      }

      const handleSetareProblemaS3_2 = (index, file) =>{
        switch (index) {
            case '2a': s3setR2a(file); break;
            case '2b': s3setR2b(file); break;
            case '2c': s3setR2c(file); break;
            default: console.error("Index invalid pentru problema");
          }
      }

      const handleSetareBaremS3_1 = (index, file) =>{
        switch (index) {
            case '1a': s3setB1a(file); break;
            case '1b': s3setB1b(file); break;
            case '1c': s3setB1c(file); break;
            default: console.error("Index invalid pentru problema");
          }
      }

      const handleSetareBaremS3_2 = (index, file) =>{
        switch (index) {
            case '2a': s3setB2a(file); break;
            case '2b': s3setB2b(file); break;
            case '2c': s3setB2c(file); break;
            default: console.error("Index invalid pentru problema");
          }
      }

    const [questions, setQuestions] = useState([]);

    const postImg = async (pic) =>{
        const formdata = new FormData();
        console.log(pic);
        formdata.append("file", pic);
        formdata.append("upload_preset", "unibac07");
        formdata.append("cloud_name", process.env.REACT_APP_CLOUDINARY_API2);
        const cloudinary = await fetch(`${process.env.REACT_APP_CLOUDINARY_API}`, {
            method: "post",
            body: formdata,
        })
        const js = await cloudinary.json();
        if(!cloudinary.ok){
            console.log(js.error);
            setError("A apărut o eroare la încărcarea avatarului.");
            setTimeout(() => {
                setError(null);
            }, 7000);
            setLoading(false);
            return;
        }
        console.log(js);
        const avatarUrl = js.secure_url;
        
        return avatarUrl;
    }

    const posteazaSubiect = async ()=>{
        setPostingSubject(true);
        const barrez = [
            s1r1, s1r2, s1r3, s1r4, s1r5, s1r6, s1b1, s1b2, s1b3, s1b4, s1b5, s1b6,
            s2r1a, s2r1b, s2r1c, s2b1a, s2b1b, s2b1c, s2r2a, s2r2b, s2r2c, s2b2a, s2b2b, s2b2c,
            s3r1a, s3r1b, s3r1c, s3b1a, s3b1b, s3b1c, s3r2a, s3r2b, s3r2c, s3b2a, s3b2b, s3b2c
        ];

        const subiect = await postImg(subiectIntreg);
        const barem = await postImg(baremIntreg);

        console.log(subiect, barem);

        for (let i = 0; i < barrez.length; i++) {
            const variable = barrez[i];
            if (variable) {
                try {
                    const result = await postImg(variable); 
                    questions.push(result);
                } catch (error) {
                    console.error(`EROARE: ${error}`);
                }
            }
        }

        const response = await fetch(`${process.env.REACT_APP_API}/api/subiecteBac/createSubiectBac`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({subject: materie, teacher: user.username, profil, allowsHelp: allowHelp, questions, subiect, barem})
        })
        const json = await response.json();
        if(!response.ok){
            console.log(json.error);
            setError(json.error);
            setTimeout(() => {
                setError(null);
            }, 7000);
            setPostingSubject(false);
        }
        if(response.ok){
            setNotification(json.msg);
            setTimeout(() => {
                setNotification(null);
            }, 7000);
            console.log(json);
            setPostingSubject(false);
            navigate(`/home`, { state: { fromPostareSubiect: true }});
        }
    }
    
    return (
        <div>
            {notification && <NotificationBox notification={notification}/>}
            {postingSubject &&
                <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    zIndex: 999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <p className="text-xl text-center"> Subiectul este in curs de procesare...</p>
                            <p className="text-md text-center"> Dupa procesare o sa fii redirectionat spre pagina principala...</p>
                        </div>
                        <Spinner size="lg" color="primary" />
                    </div>
                </div>
            }
            {loading && <Loading/>}
            {error && <Error error={error}/>}
            <div className="w-[100vw] flex justify-center items-center mx-auto p-7 min-h-[80vh]">
                <div className="absolute left-1 z-50 top-0 mt-[70px]">
                    <CircularProgress
                        size="lg"
                        value={activeStep *33}
                        color="primary"
                        showValueLabel={true}
                    />
                </div>
                <div className="flex flex-col min-w-[375px] min-h-[600px] justify-between">
                    <div className="flex flex-col gap-3">
                        <p className="create-class-text text-center">POSTEAZA UN SUBIECT</p>
                        {activeStep === 0 && (
                            <>
                                <Autocomplete 
                                    label="Selecteaza materia" 
                                    isRequired
                                    className={errorFields.includes('materie') ? "mt-10 max-w-full oSaAibaEroare" : "mt-10 max-w-full"} 
                                    variant = "bordered"
                                    onSelectionChange={(value) => { setMaterie(value); console.log(materie)}}
                                    value={materie}
                                >
                                    {materii.map((materie) => (
                                    <AutocompleteItem key={materie.value} value={materie.value}>
                                        {materie.label}
                                    </AutocompleteItem>
                                    ))}
                                </Autocomplete>

                                <Autocomplete 
                                    label="Selecteaza profilul" 
                                    isRequired
                                    className={errorFields.includes('profil') ? "max-w-full oSaAibaEroare" : "max-w-full"} 
                                    variant = "bordered"
                                    onSelectionChange={(value) => { setProfil(value); console.log(profil)}}
                                    value={profil}
                                >
                                    {profiluriLiceu.map((profil) => (
                                    <AutocompleteItem key={profil} value={profil}>
                                        {profil}
                                    </AutocompleteItem>
                                    ))}
                                </Autocomplete>
                                
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col">
                                        <p className="text-lg"> Subiectul intreg:</p>

                                        <input
                                            onChange={(e) => {
                                                setSubiectIntreg(e.target.files[0]);
                                                console.log(e.target.files[0]);
                                            }}
                                            type="file"
                                            name="file-input-subiect"
                                            id="file-input-subiect"
                                            accept='image/*' 
                                            class="file-input__input"
                                        />
                                        <label class={errorFields.includes('subiectIntreg') ? "file-input_error file-input__label mt-1 min-w-[120px]" : 
                                        "file-input__label mt-1 min-w-[120px]"} 
                                        for="file-input-subiect">
                                            <svg
                                                height="20px"
                                                width="20px"
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fas"
                                                data-icon="upload"
                                                class="svg-inline--fa fa-upload fa-w-16"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                            <path
                                                fill="currentColor"
                                                d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                            ></path>
                                            </svg>
                                            <span>Upload file</span>
                                        </label>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-lg"> Baremul intreg:</p>

                                        <input
                                            onChange={(e) => {
                                                setBaremIntreg(e.target.files[0]);
                                                console.log(e.target.files[0]);
                                            }}
                                            type="file"
                                            name="file-input-barem"
                                            id="file-input-barem"
                                            accept='image/*' 
                                            class="file-input__input"
                                        />
                                        <label class={errorFields.includes('baremIntreg') ? "file-input_error file-input__label mt-1 min-w-[120px]" : 
                                        "file-input__label mt-1 min-w-[120px]"} 
                                        for="file-input-barem">
                                            <svg
                                                height="20px"
                                                width="20px"
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fas"
                                                data-icon="upload"
                                                class="svg-inline--fa fa-upload fa-w-16"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                            <path
                                                fill="currentColor"
                                                d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                            ></path>
                                            </svg>
                                            <span>Upload file</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <Checkbox
                                        isSelected={allowHelp}
                                        label="Permite MinaAi smart help"
                                        onValueChange={(value) => {setAllowHelp(value); console.log(allowHelp)}}
                                        classNames={{
                                        label: "text-small",
                                        }}
                                    >
                                        Permite MinaAi smart help
                                    </Checkbox>
                                </div>
                            </>
                        )}
                        {activeStep === 1 && (
                            <>
                                {materie === 'matematica' &&
                                    <>
                                        <div className="flex flex-col gap-7">
                                            <p className="text-xl bold mt-5"> 
                                                Subiectul I
                                            </p>

                                            <div className="flex flex-col gap-2">
                                            {forS1.map(nr=> (
                                                <div className="flex flex-row w-full justify-between">
                                                    <div className="flex flex-col">
                                                    {nr}. Problema
                                                        <input
                                                            onChange={(e) => {
                                                                handleSetareProblemaS1(nr, e.target.files[0])
                                                            }}
                                                            type="file"
                                                            name={`file-input-s1r${nr}`}
                                                            id={`file-input-s1r${nr}`}
                                                            accept='image/*' 
                                                            class="file-input__input"
                                                        />
                                                        <label class={errorFields.includes(`s1r${nr}`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                        for={`file-input-s1r${nr}`}>
                                                            <svg
                                                                height="20px"
                                                                width="20px"
                                                                aria-hidden="true"
                                                                focusable="false"
                                                                data-prefix="fas"
                                                                data-icon="upload"
                                                                class="svg-inline--fa fa-upload fa-w-16"
                                                                role="img"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 512 512"
                                                            >
                                                            <path
                                                                fill="currentColor"
                                                                d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                            ></path>
                                                            </svg>
                                                            <span>Upload file</span>
                                                        </label>
                                                    </div>

                                                    <div className="flex flex-col">
                                                    {nr}. Barem
                                                        <input
                                                            onChange={(e) => {
                                                                handleSetareBaremS1(nr, e.target.files[0])
                                                            }}
                                                            type="file"
                                                            name={`file-input-s1b${nr}`}
                                                            id={`file-input-s1b${nr}`}
                                                            accept='image/*' 
                                                            class="file-input__input"
                                                        />
                                                        <label class={errorFields.includes(`s1b${nr}`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                        for={`file-input-s1b${nr}`}>
                                                            <svg
                                                                height="20px"
                                                                width="20px"
                                                                aria-hidden="true"
                                                                focusable="false"
                                                                data-prefix="fas"
                                                                data-icon="upload"
                                                                class="svg-inline--fa fa-upload fa-w-16"
                                                                role="img"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 512 512"
                                                            >
                                                            <path
                                                                fill="currentColor"
                                                                d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                            ></path>
                                                            </svg>
                                                            <span>Upload file</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                        )}
                        {activeStep === 2 && (
                            <>
                                {materie === 'matematica' &&
                                    <>
                                        <div className="flex flex-col gap-3">
                                            <p className="text-xl bold"> 
                                                Subiectul II
                                            </p>

                                            <div className="flex flex-row justify-between">
                                                <div className="flex flex-col">
                                                    Problema 1
                                                    <input
                                                        onChange={(e) => {
                                                            s2setR1(e.target.files[0]);
                                                        }}
                                                        type="file"
                                                        name={`file-input-s2r1`}
                                                        id={`file-input-s2r1`}
                                                        accept='image/*' 
                                                        class="file-input__input"
                                                    />
                                                    <label class={errorFields.includes(`s2r1`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                    for={`file-input-s2r1`}>
                                                        <svg
                                                            height="20px"
                                                            width="20px"
                                                            aria-hidden="true"
                                                            focusable="false"
                                                            data-prefix="fas"
                                                            data-icon="upload"
                                                            class="svg-inline--fa fa-upload fa-w-16"
                                                            role="img"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 512 512"
                                                        >
                                                        <path
                                                            fill="currentColor"
                                                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                        ></path>
                                                        </svg>
                                                        <span>Upload file</span>
                                                    </label>
                                                </div>
                                                <div className="flex flex-col">
                                                    Problema 2
                                                    <input
                                                        onChange={(e) => {
                                                            s2setR2(e.target.files[0]);
                                                            console.log(e.target.files[0]);
                                                        }}
                                                        type="file"
                                                        name={`file-input-s2r2`}
                                                        id={`file-input-s2r2`}
                                                        accept='image/*' 
                                                        class="file-input__input"
                                                    />
                                                    <label class={errorFields.includes(`s2r2`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                    for={`file-input-s2r2`}>
                                                        <svg
                                                            height="20px"
                                                            width="20px"
                                                            aria-hidden="true"
                                                            focusable="false"
                                                            data-prefix="fas"
                                                            data-icon="upload"
                                                            class="svg-inline--fa fa-upload fa-w-16"
                                                            role="img"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 512 512"
                                                        >
                                                        <path
                                                            fill="currentColor"
                                                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                        ></path>
                                                        </svg>
                                                        <span>Upload file</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="flex flex-row justify-between">
                                                <div className="flex flex-col gap-1">
                                                {forS2_1.map(nr=> (
                                                    <div className="flex flex-col w-full justify-between">
                                                        <div className="flex flex-col">
                                                        Subpunctul {nr} 
                                                            <input
                                                                onChange={(e) => {
                                                                    handleSetareProblemaS2_1(nr, e.target.files[0])
                                                                }}
                                                                type="file"
                                                                name={`file-input-s2r${nr}`}
                                                                id={`file-input-s2r${nr}`}
                                                                accept='image/*' 
                                                                class="file-input__input"
                                                            />
                                                            <label class={errorFields.includes(`s2r${nr}`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                            for={`file-input-s2r${nr}`}>
                                                                <svg
                                                                    height="20px"
                                                                    width="20px"
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="upload"
                                                                    class="svg-inline--fa fa-upload fa-w-16"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"
                                                                >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                                ></path>
                                                                </svg>
                                                                <span>Upload file</span>
                                                            </label>
                                                        </div>
                                                        <div className="flex flex-col">
                                                        Barem {nr} 
                                                            <input
                                                                onChange={(e) => {
                                                                    handleSetareBaremS2_1(nr, e.target.files[0])
                                                                }}
                                                                type="file"
                                                                name={`file-input-s2b${nr}`}
                                                                id={`file-input-s2b${nr}`}
                                                                accept='image/*' 
                                                                class="file-input__input"
                                                            />
                                                            <label class={errorFields.includes(`s2b${nr}`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                            for={`file-input-s2b${nr}`}>
                                                                <svg
                                                                    height="20px"
                                                                    width="20px"
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="upload"
                                                                    class="svg-inline--fa fa-upload fa-w-16"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"
                                                                >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                                ></path>
                                                                </svg>
                                                                <span>Upload file</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))}
                                                </div>

                                                <div className="flex flex-col gap-1">
                                                {forS2_2.map(nr=> (
                                                    <div className="flex flex-col w-full justify-between">
                                                        <div className="flex flex-col">
                                                        Subpunctul {nr} 
                                                            <input
                                                                onChange={(e) => {
                                                                    handleSetareProblemaS2_2(nr, e.target.files[0])
                                                                }}
                                                                type="file"
                                                                name={`file-input-s2r${nr}`}
                                                                id={`file-input-s2r${nr}`}
                                                                accept='image/*' 
                                                                class="file-input__input"
                                                            />
                                                            <label class={errorFields.includes(`s2r${nr}`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                            for={`file-input-s2r${nr}`}>
                                                                <svg
                                                                    height="20px"
                                                                    width="20px"
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="upload"
                                                                    class="svg-inline--fa fa-upload fa-w-16"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"
                                                                >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                                ></path>
                                                                </svg>
                                                                <span>Upload file</span>
                                                            </label>
                                                        </div>
                                                        <div className="flex flex-col">
                                                        Barem {nr} 
                                                            <input
                                                                onChange={(e) => {
                                                                    handleSetareBaremS2_2(nr, e.target.files[0])
                                                                }}
                                                                type="file"
                                                                name={`file-input-s2b${nr}`}
                                                                id={`file-input-s2b${nr}`}
                                                                accept='image/*' 
                                                                class="file-input__input"
                                                            />
                                                            <label class={errorFields.includes(`s2b${nr}`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                            for={`file-input-s2b${nr}`}>
                                                                <svg
                                                                    height="20px"
                                                                    width="20px"
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="upload"
                                                                    class="svg-inline--fa fa-upload fa-w-16"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"
                                                                >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                                ></path>
                                                                </svg>
                                                                <span>Upload file</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                        )}
                        {activeStep === 3 && (
                            <>
                                {materie === 'matematica' &&
                                    <>
                                        <div className="flex flex-col gap-3">
                                            <p className="text-xl bold"> 
                                                Subiectul III
                                            </p>

                                            <div className="flex flex-row justify-between">
                                                <div className="flex flex-col">
                                                    Problema 1
                                                    <input
                                                        onChange={(e) => {
                                                            s3setR1(e.target.files[0]);
                                                            console.log(e.target.files[0]);
                                                        }}
                                                        type="file"
                                                        name={`file-input-s3r1`}
                                                        id={`file-input-s3r1`}
                                                        accept='image/*' 
                                                        class="file-input__input"
                                                    />
                                                    <label class={errorFields.includes(`s3r1`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                    for={`file-input-s3r1`}>
                                                        <svg
                                                            height="20px"
                                                            width="20px"
                                                            aria-hidden="true"
                                                            focusable="false"
                                                            data-prefix="fas"
                                                            data-icon="upload"
                                                            class="svg-inline--fa fa-upload fa-w-16"
                                                            role="img"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 512 512"
                                                        >
                                                        <path
                                                            fill="currentColor"
                                                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                        ></path>
                                                        </svg>
                                                        <span>Upload file</span>
                                                    </label>
                                                </div>
                                                <div className="flex flex-col">
                                                    Problema 2
                                                    <input
                                                        onChange={(e) => {
                                                            s3setR2(e.target.files[0]);
                                                            console.log(e.target.files[0]);
                                                        }}
                                                        type="file"
                                                        name={`file-input-s3r2`}
                                                        id={`file-input-s3r2`}
                                                        accept='image/*' 
                                                        class="file-input__input"
                                                    />
                                                    <label class={errorFields.includes(`s3r2`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                    for={`file-input-s3r2`}>
                                                        <svg
                                                            height="20px"
                                                            width="20px"
                                                            aria-hidden="true"
                                                            focusable="false"
                                                            data-prefix="fas"
                                                            data-icon="upload"
                                                            class="svg-inline--fa fa-upload fa-w-16"
                                                            role="img"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 512 512"
                                                        >
                                                        <path
                                                            fill="currentColor"
                                                            d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                        ></path>
                                                        </svg>
                                                        <span>Upload file</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="flex flex-row justify-between">
                                                <div className="flex flex-col gap-1">
                                                {forS3_1.map(nr=> (
                                                    <div className="flex flex-col w-full justify-between">
                                                        <div className="flex flex-col">
                                                        Subpunctul {nr} 
                                                            <input
                                                                onChange={(e) => {
                                                                    handleSetareProblemaS3_1(nr, e.target.files[0])
                                                                    console.log(e.target.files[0]);
                                                                }}
                                                                type="file"
                                                                name={`file-input-s3r${nr}`}
                                                                id={`file-input-s3r${nr}`}
                                                                accept='image/*' 
                                                                class="file-input__input"
                                                            />
                                                            <label class={errorFields.includes(`s3r${nr}`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                            for={`file-input-s3r${nr}`}>
                                                                <svg
                                                                    height="20px"
                                                                    width="20px"
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="upload"
                                                                    class="svg-inline--fa fa-upload fa-w-16"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"
                                                                >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                                ></path>
                                                                </svg>
                                                                <span>Upload file</span>
                                                            </label>
                                                        </div>
                                                        <div className="flex flex-col">
                                                        Barem {nr} 
                                                            <input
                                                                onChange={(e) => {
                                                                    handleSetareBaremS3_1(nr, e.target.files[0])
                                                                }}
                                                                type="file"
                                                                name={`file-input-s3b${nr}`}
                                                                id={`file-input-s3b${nr}`}
                                                                accept='image/*' 
                                                                class="file-input__input"
                                                            />
                                                            <label class={errorFields.includes(`s3b${nr}`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                            for={`file-input-s3b${nr}`}>
                                                                <svg
                                                                    height="20px"
                                                                    width="20px"
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="upload"
                                                                    class="svg-inline--fa fa-upload fa-w-16"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"
                                                                >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                                ></path>
                                                                </svg>
                                                                <span>Upload file</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))}
                                                </div>

                                                <div className="flex flex-col gap-1">
                                                {forS3_2.map(nr=> (
                                                    <div className="flex flex-col w-full justify-between">
                                                        <div className="flex flex-col">
                                                        Subpunctul {nr} 
                                                            <input
                                                                onChange={(e) => {
                                                                    handleSetareProblemaS3_2(nr, e.target.files[0])
                                                                }}
                                                                type="file"
                                                                name={`file-input-s3r${nr}`}
                                                                id={`file-input-s3r${nr}`}
                                                                accept='image/*' 
                                                                class="file-input__input"
                                                            />
                                                            <label class={errorFields.includes(`s3r${nr}`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                            for={`file-input-s3r${nr}`}>
                                                                <svg
                                                                    height="20px"
                                                                    width="20px"
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="upload"
                                                                    class="svg-inline--fa fa-upload fa-w-16"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"
                                                                >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                                ></path>
                                                                </svg>
                                                                <span>Upload file</span>
                                                            </label>
                                                        </div>
                                                        <div className="flex flex-col">
                                                        Barem {nr} 
                                                            <input
                                                                onChange={(e) => {
                                                                    handleSetareBaremS3_2(nr, e.target.files[0])
                                                                }}
                                                                type="file"
                                                                name={`file-input-s3b${nr}`}
                                                                id={`file-input-s3b${nr}`}
                                                                accept='image/*' 
                                                                class="file-input__input"
                                                            />
                                                            <label class={errorFields.includes(`s3b${nr}`) ? "file-input_error file-input__label mt-1 min-w-[120px]" : "file-input__label mt-1 min-w-[120px]"}  
                                                            for={`file-input-s3b${nr}`}>
                                                                <svg
                                                                    height="20px"
                                                                    width="20px"
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="upload"
                                                                    class="svg-inline--fa fa-upload fa-w-16"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"
                                                                >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                                                ></path>
                                                                </svg>
                                                                <span>Upload file</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                        )}
                    </div>

                    <div className="flex flex-row justify-between">
                        {activeStep > 0 &&
                            <Button size="md" className="w-[65px]" variant = "flat"
                            onClick={() => {
                                if(activeStep > 0)
                                    setActiveStep((prevActiveStep) => prevActiveStep - 1);
                            }}>
                                BACK
                            </Button>
                        }

                        <Button size="md" className="w-[65px] ml-auto" variant = "flat"
                        onClick={() => {
                            if(activeStep === 0){
                                if(materie === '' || profil === '' || !subiectIntreg || !baremIntreg){
                                    setError("Toate campurile sunt obligatorii");
                                    console.log("subiect:",subiectIntreg);
                                    console.log("barem:", baremIntreg);
                                    if(errorFields.includes('materie')) {
                                        const index = errorFields.indexOf('materie');
                                        errorFields.splice(index, 1); 
                                    }
                                    
                                    if(errorFields.includes('profil')) {
                                        const index = errorFields.indexOf('profil');
                                        errorFields.splice(index, 1); 
                                    }
                                    if(errorFields.includes('baremIntreg')) {
                                        const index = errorFields.indexOf('baremIntreg');
                                        errorFields.splice(index, 1); 
                                    }
                                    
                                    if(errorFields.includes('subiectIntreg')) {
                                        const index = errorFields.indexOf('subiectIntreg');
                                        errorFields.splice(index, 1); 
                                    }
                                    if(!materie)
                                        errorFields.push('materie');
                                    if(!profil)
                                        errorFields.push('profil');
                                    if(!subiectIntreg)
                                        errorFields.push('subiectIntreg');
                                    if(!baremIntreg)
                                        errorFields.push('baremIntreg');
                                    setTimeout(() =>{
                                        setError(null);
                                    }, 3000)
                                    return;
                                }
                            }else if(activeStep === 1){
                                if(materie === 'matematica'){
                                    if(!s1r1 || !s1b1 || !s1r2 || !s1b2 || !s1r3 || !s1b3 || !s1r4 || !s1b4 || !s1r5 || !s1b5 || !s1r6 || !s1b6){
                                        setError("Toate campurile sunt obligatorii");
                                        for (let i = 1; i <= 6; i++) {
                                            if (errorFields.includes(`s1r${i}`)) {
                                                const index = errorFields.indexOf(`s1r${i}`);
                                                errorFields.splice(index, 1);
                                            }
                                            if (errorFields.includes(`s1b${i}`)) {
                                                const index = errorFields.indexOf(`s1b${i}`);
                                                errorFields.splice(index, 1);
                                            }
                                        }
                                        
                                        for (let i = 1; i <= 6; i++) {
                                            if (!eval(`s1r${i}`)) {
                                                errorFields.push(`s1r${i}`);
                                            }
                                            if (!eval(`s1b${i}`)) {
                                                errorFields.push(`s1b${i}`);
                                            }
                                        }
                                        setTimeout(() =>{
                                            setError(null);
                                        }, 3000)
                                        return;
                                    }
                                }
                            }else if(activeStep === 2){
                                if (materie === 'matematica') {
                                    if (!s2r1 || !s2r2 ||
                                        !s2r1a || !s2b1a || !s2r1b || !s2b1b || !s2r1c || !s2b1c ||
                                        !s2r2a || !s2b2a || !s2r2b || !s2b2b || !s2r2c || !s2b2c) {
                                        
                                        setError("Toate campurile sunt obligatorii");
                                
                                        const errorFieldsToCheck = [
                                            's2r1', 's2r2', 
                                            's2r1a', 's2b1a', 's2r1b', 's2b1b', 's2r1c', 's2b1c', 
                                            's2r2a', 's2b2a', 's2r2b', 's2b2b', 's2r2c', 's2b2c'
                                        ];
                                
                                        for (const field of errorFieldsToCheck) {
                                            if (errorFields.includes(field)) {
                                                const index = errorFields.indexOf(field);
                                                errorFields.splice(index, 1);
                                            }
                                        }
                                
                                        for (const field of errorFieldsToCheck) {
                                            if (!eval(field)) {
                                                errorFields.push(field);
                                            }
                                        }
                                
                                        setTimeout(() => {
                                            setError(null);
                                        }, 3000);
                                        
                                        return;
                                    }
                                }
                            }
                            if(activeStep === 3){
                                if(materie === 'matematica'){
                                    if (!s3r1 || !s3r2 ||
                                    !s3r1a || !s3b1a || !s3r1b || !s3b1b || !s3r1c || !s3b1c ||
                                    !s3r2a || !s3b2a || !s3r2b || !s3b2b || !s3r2c || !s3b2c) {
                                        setError("Toate campurile sunt obligatorii");
                                        const errorFieldsToCheck = [
                                            's3r1', 's3r2', 
                                            's3r1a', 's3b1a', 's3r1b', 's3b1b', 's3r1c', 's3b1c', 
                                            's3r2a', 's3b2a', 's3r2b', 's3b2b', 's3r2c', 's3b2c'
                                        ];
                                
                                        for (const field of errorFieldsToCheck) {
                                            if (errorFields.includes(field)) {
                                                const index = errorFields.indexOf(field);
                                                errorFields.splice(index, 1);
                                            }
                                        }
                                
                                        for (const field of errorFieldsToCheck) {
                                            if (!eval(field)) {
                                                errorFields.push(field);
                                            }
                                        }

                                        setTimeout(() =>{
                                            setError(null);
                                        }, 3000)
                                        return;
                                    }
                                }
                                setErrorFields([]);
                                posteazaSubiect();
                            } 
                            if(activeStep < 3){
                                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                                setErrorFields([]);
                            }
                        }}>
                            {activeStep < 3 ? 'NEXT' : 'SUBMIT'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default PosteazaSubiect;