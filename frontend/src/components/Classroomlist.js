import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from './Apiroute';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


const ClassroomsList = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [error, setError] = useState(null);
    const {authuser} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const response = await axios.get(`${api}/api/classrooms`);
                setClassrooms(response.data);
            } catch (error) {
                console.error('Error fetching classrooms:', error);
                setError('Failed to fetch classrooms.');
            }
        };
        fetchClassrooms();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Classrooms List</h2>
            <p>Total number of classes: {classrooms.length}</p>
            <ul className="list-group">
                {classrooms.map((classroom) => (
                    <li className="list-group-item" key={classroom._id}>
                        <h4>{classroom.name}</h4>
                        <p><strong>Students:</strong> {classroom.students.filter(user => user.role === 'student').map(student => student.name).join(', ')}</p>
                        <p>
                        <strong>Teachers:</strong> 
                        {classroom.teachers
                            ? classroom.teachers.name
                            : 'No teachers assigned'}
                            
                        </p>{authuser?.user?.role === "principal" && <button onClick={(e)=>{navigate(`/assignteacher/${classroom._id}`)}} className='btn btn-primary'> Assign teacher</button>}
                        <div>
                            <strong>Schedule:</strong>
                            <ul>
                                {Object.entries(classroom.schedule).map(([day, times]) => (
                                    <li key={day}>
                                        <strong>{day}:</strong> {times.start} - {times.end}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClassroomsList;