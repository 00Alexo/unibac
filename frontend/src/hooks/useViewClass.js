import {useState, useEffect} from 'react';

export const useViewClass = (classId) =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [classData, setClassData] = useState(null);

    const getClass = async(req, res) =>{
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${process.env.REACT_APP_API}/api/class/viewClass/${classId}`,{
            method: 'GET'
        });
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
            setIsLoading(false);
        }
        if(response.ok){
            console.log(json);
            setClassData(json);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (classId) 
            getClass();
    }, [classId]);

    const refetchClass = () => {
        getClass();
    };

    return {classData, isLoading, error, refetchClass}
}