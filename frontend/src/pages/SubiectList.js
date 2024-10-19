import {Card, CardBody} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

const SubiectList = () => {
    const navigate = useNavigate();

    const subiecte = [
        'Informatica',
        'Matematica',
        'Fizica',
        'Chimie',
        'Romana',
        'Biologie',
        'Istorie',
        'Geografie',
        'Psihologie'
      ];

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-10 text-center">Subiecte</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-2 pr-2">
            {subiecte.map((subject, index) => (
                <div key={subject} className="cursor-pointer" onClick={() => navigate(`/subiecte/${subject}`)}>
                    <Card>
                        <CardBody>
                            <p>{subject}</p>
                        </CardBody>
                    </Card>
                </div>
            ))}
            </div>
        </div>
    );
}
 
export default SubiectList;