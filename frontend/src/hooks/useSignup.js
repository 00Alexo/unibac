import {useState} from 'react'
import {useAuthContext} from './useAuthContext'
import { useNavigate } from 'react-router-dom';

export const useSignup = () =>{
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [errorFields, setErrorFields] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (username, email, password, confirmPassword, statut, judet) =>{
        setErrorFields(null);
        setIsLoading(true);
        setError(null);
        console.log(statut);
        if(statut === '$.0')
            statut = 'elev';
        else if (statut === '$.1')
            statut = 'profesor';
        console.log(statut);
        const response = await fetch(`${process.env.REACT_APP_API}/api/user/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password, confirmPassword, statut, judet})
        })
        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
            setErrorFields(json.errorFields);
            setTimeout(()=>{
                setError(null);
            }, 7000)
        }

        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
            navigate('/home', { state: { fromSignup: true } });
            setErrorFields(null);
        }
    }

    return {signup, isLoading, error, errorFields}
}