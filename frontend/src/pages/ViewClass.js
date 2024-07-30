import { useLocation, useNavigate, useParams} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import checkmark from '../assets/blue-checkmark.png'
import { useGetProfile } from '../hooks/useGetProfile';
import PageNotFound from './404';
import {Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { useAuthContext } from '../hooks/useAuthContext';
import {Error, NotificationBox} from '../components/alertBox';
import Loading from "../pages/Loading";
import {useViewClass} from "../hooks/useViewClass"

const ViewClass = () => {
    const {classId} = useParams();
    const {classData, error, isLoading, refetchClass} = useViewClass(classId);
    const location = useLocation();
    const navigate = useNavigate();
    const [successfullyCreatedClass, setSuccessfullyCreatedClass] = useState(false);

    useEffect(() => {
        if (location.state?.fromCreateClass) {
            setSuccessfullyCreatedClass(true);
            navigate('.', { state: { fromCreateClass: false }, replace: true });
            setTimeout(() =>{
                setSuccessfullyCreatedClass(false);
            }, 5000)
        }
    }, [location]);

    return (
        <div>
            {successfullyCreatedClass &&
            <div class="after-loggin-animation">
                <div class="center">
                    <img src={checkmark} class="thumb"/>
                    <div class="circle-wrap">
                    <div class="circle-lg"></div>
                    </div>
                    <div class="dots-wrap">
                    <div class="dot dot--t"></div>
                    <div class="dot dot--tr"></div>
                    <div class="dot dot--br"></div>
                    <div class="dot dot--b"></div>
                    <div class="dot dot--bl"></div>
                    <div class="dot dot--tl"></div>
                    </div>
                </div>
                <p className='text-center scslogin'> Clasa creata cu succes!! </p>
            </div>
            }
            {classData && <p>{classData.creator}</p>}
        </div>
        
    );
};

 
export default ViewClass;