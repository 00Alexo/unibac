import {Input, Button, Select, SelectItem, Autocomplete, AutocompleteItem, Tooltip, Textarea, CircularProgress, Checkbox} from "@nextui-org/react";
import {useEffect, useState} from 'react';

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

    const [materie, setMaterie] = useState('');
    const [profil, setProfil] = useState('');
    const [allowHelp, setAllowHelp] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    
    return (
        <div className="w-[100vw] flex justify-center items-center mx-auto p-7 min-h-[80vh]">
            <div className="absolute left-1 z-50 top-0 mt-[70px]">
                <CircularProgress
                    size="lg"
                    value={activeStep *33}
                    color="primary"
                    showValueLabel={true}
                />
            </div>
            <div className="flex flex-col min-w-[375px] min-h-[70vh] justify-between">
                <div className="flex flex-col gap-3">
                    <p className="create-class-text text-center">POSTEAZA UN SUBIECT</p>
                    {activeStep === 0 && (
                    <>
                        <Autocomplete 
                            label="Selecteaza materia" 
                            isRequired
                            className="mt-10 max-w-full" 
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
                            className="max-w-full" 
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
                                    <p className="text-xl bold mt-5"> Subiectul I</p>
                                </>
                            }
                            {materie === 'informatica' &&
                                <>
                                    test2
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
                        if(activeStep < 3)
                            setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }}>
                        {activeStep < 3 ? 'NEXT' : 'SUBMIT'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
 
export default PosteazaSubiect;