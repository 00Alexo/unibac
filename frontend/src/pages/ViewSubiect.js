import { useAuthContext } from '../hooks/useAuthContext';
import { useGetSubiect } from '../hooks/useGetSubiectBac';
import PageNotFound from './404';
import {useParams, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

const ViewSubiect = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {

        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 950);
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };

    }, []);



    const {user} = useAuthContext();
    const {subId, materie} = useParams();
    const { viewSubiect, error, isLoading, refetchSubiect} = useGetSubiect(subId);
    const [loading, setLoading] = useState(false);

    if (!viewSubiect){
        return <PageNotFound/>
    }

    if(materie.toLowerCase() !== 'matematica')
        return <PageNotFound/>

    return (
        <div>
            {subId}
            {viewSubiect.questions.map((materie) => (
                <img src={materie}/>
            ))}
        </div>
    );
}
 
export default ViewSubiect;