import {useState, useEffect} from 'react';

export const useGetSubiect = (subId) =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [viewSubiect, setViewSubiect] = useState(null);

    const getSubiect = async () =>{
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${process.env.REACT_APP_API}/api/subiecteBac/getSubiectBac/${subId}`,{
            method: 'GET'
        });
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
            setIsLoading(false);
        }
        if(response.ok){
            setViewSubiect(json);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (subId) {
            getSubiect();
        }
    }, [subId]);

    const refetchSubiect = () => {
        getSubiect();
    };

    return {viewSubiect, isLoading, error, refetchSubiect}
}