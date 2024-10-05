import { useContext, useState } from "react";
import authContext from "../../context/AuthContext";

// Toast messages
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function ClassCard({ image, title, description, time, instructor, cost, id }) {
    const { isAuthenticated } = useContext(authContext);
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    async function handleClassJoin(id) {

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/class/join/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const resData = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                throw new Error(resData.message || 'Failed to Join the Class');
            }

            setIsLoading(false);
            toast.success('Class Joined Successfully');
            navigate('/dashboard/classes');
            return;
        } catch (err) {
            setIsLoading(false);
            console.log('Failed to Join the Class|Frontend: ', err.message);
            toast.error(err.message || 'Failed to Join the Class');
            return;
        }
    }


    return (
        <div className="card glass my-4 md:my-0 w-full md:w-96 h-[34rem] rounded-lg shadow-lg overflow-hidden md:transform md:transition-transform md:hover:scale-105">
            {isLoading &&
                <div className="loading-overlay">
                    <p className="relative">
                        <span className="loading loading-dots loading-lg text-primary"></span>
                    </p>
                </div>
            }
            <figure className="w-full h-64 overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body p-4">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-2">{title}</h2>
                <p className="text-center mb-4">{description}</p>
                <p className="text-center font-semibold mb-2">Time: {time}</p>
                <p className="text-center mb-4">Instructor: {instructor}</p>
                <div className="card-actions justify-between">
                    <div>
                        <h2 className="mt-2 text-2xl font-bold text-left text-green-400">₹ {cost}</h2>
                    </div>
                    {isAuthenticated && <button className="btn btn-primary" onClick={() => handleClassJoin(id)}>Join Now</button>}

                </div>
            </div>
        </div>
    );
}
