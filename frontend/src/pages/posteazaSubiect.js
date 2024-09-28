import {Input, Button, Select, SelectItem, Autocomplete, AutocompleteItem, Tooltip, Textarea, CircularProgress, Checkbox} from "@nextui-org/react";
import {useEffect, useState} from 'react';
import {Error, NotificationBox} from '../components/alertBox';
import Loading from "../pages/Loading";

const PosteazaSubiect = () => {
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

    const handleSetareProblemaS1 = (index, file) => {
        switch (index) {
          case 1: s1setR1(file); break;
          case 2: s1setR2(file); break;
          case 3: s1setR3(file); break;
          case 4: s1setR4(file); break;
          case 5: s1setR5(file); break;
          case 6: s1setR6(file); break;
          default: console.error("Index invalid pentru problemă");
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

    
    return (
        <div>
            {notification && <NotificationBox notification={notification}/>}
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