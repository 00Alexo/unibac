import {useState} from 'react'
import {useAuthContext} from './useAuthContext'
import { useNavigate } from 'react-router-dom';

export const useSignin = () =>{
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signin = async (username, password) =>{
        setIsLoading(true);
        setError(null);

        const response = await fetch(`https://unibac.onrender.com/api/user/signin`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        })
        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }

        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
            navigate('/home', { state: { fromSignup: true } });
        }
    }

    return {signin, isLoading, error}
}