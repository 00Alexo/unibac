import {useState} from 'react'
import {useAuthContext} from './useAuthContext'
import { useNavigate } from 'react-router-dom';

export const useSignin = () =>{
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [errorFields, setErrorFields] = useState(null);
    const {dispatch} = useAuthContext();

    const signin = async (username, password) =>{
        setErrorFields(null);
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${process.env.REACT_APP_API}/api/user/signin`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
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
        }
    }

    return {signin, isLoading, error, errorFields}
}