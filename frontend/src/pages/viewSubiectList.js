import {useParams, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import PageNotFound from './404';

const ViewSubiectList = () => {
    const subiecte = [
        'informatica',
        'matematica',
        'fizica',
        'chimie',
        'romana',
        'biologie',
        'istorie',
        'geografie',
        'psihologie'
      ];
      const [error, setError] = useState(null);
      const {materie} = useParams();
      const [subiecteV, setSubiecteV] = useState(null);
      const navigate = useNavigate();

    const getSubiect = async () =>{
        const response = await fetch(`${process.env.REACT_APP_API}/api/subiecteBac/getSubiecteMaterie/${materie}`,{
            method: 'GET'
        });
        const json = await response.json();
        console.log(json);
        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            setSubiecteV(json);
        }
    }

    useEffect(() => {
        if (materie) {
            getSubiect();
        }
    }, [materie]);

    if(!subiecte.includes(materie.toLowerCase()))
        return <PageNotFound/>
    
    return (
        <div>
            {subiecteV?.subiecte.map((subiect) => (
                <div onClick={() => navigate(`/subiecte/${materie}/${subiect.subId}`)} className='cursor-pointer'>
                    {subiect.subId}
                </div>
            ))}
        </div>
    );
}
 
export default ViewSubiectList;