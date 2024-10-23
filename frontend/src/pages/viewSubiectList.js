import {useParams, useNavigate} from 'react-router-dom';
import { formatDistanceToNow } from "date-fns";
import { ro } from "date-fns/locale";
import {useState, useEffect} from 'react';
import {Card, CardBody} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
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
    
    const timp = (createdAt) => {
        return formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ro });
      };

    return (
        <div>
            <div className="grid grid-cols-3 gap-4 p-4">
            {subiecteV?.subiecte.map((subiect) => (
                <Card
                    key={subiect.subId}
                    onClick={() => navigate(`/subiecte/${materie}/${subiect.subId}`)}
                    className="cursor-pointer hover:bg-[#26262b]"
                >
                    <CardBody className='pl-5 flex flex-col gap-1'>
                        <p className="text-xl font-bold"> {subiect.profil}</p>
                        <div className='flex flex-row gap-1 items-center'>
                            <FontAwesomeIcon icon={faClock} size='md'/>
                            <p> Postat acum {timp(subiect.createdAt)}</p>
                        </div>
                        <div className='flex flex-row gap-1 items-center'>
                            <FontAwesomeIcon icon={faLock} size='md'/>
                            <p> Dificultate: {subiect.dificultate}</p>
                        </div>
                        {/* {subiect.subId} */}
                    </CardBody>
                </Card>
            ))}
            </div>
        </div>
    );
}
 
export default ViewSubiectList;