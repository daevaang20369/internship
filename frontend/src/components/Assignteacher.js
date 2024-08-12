import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from './Apiroute';
import axios from 'axios';

const Assignteacher = () => {
    const {id} = useParams();
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${api}/api/getteacher`)
            .then(response => setTeachers(response.data))
            .catch(error => console.error('Error fetching teachers:', error));
    }, []);

    const handleAssignTeachers = () => {
        console.log(selectedTeacher)
        axios.post(`${api}/api/assignteacher/${id}`, { teacher: selectedTeacher })
            .then(response => alert('Teachers assigned successfully!'))
            .catch(error => console.error('Error assigning teachers:', error));
        navigate("/classrooms")
    };

   

    return (
        <div className="container mt-4">
        <h2 className="mb-4">Assign Teacher</h2>
        <ul className="list-group">
          {teachers.map(teacher => (
            <li 
              key={teacher._id} 
              className="list-group-item d-flex align-items-center"
            >
              <input 
                type="radio"
                name="teacher" 
                value={teacher._id}
                checked={selectedTeacher === teacher._id}
                onChange={() =>{ setSelectedTeacher(teacher._id)}} 
                className="form-check-input me-2"
              />
              {teacher.name}
            </li>
          ))}
        </ul>
        <button 
          onClick={() => handleAssignTeachers()} 
          className="btn btn-primary mt-3"
          disabled={!selectedTeacher}
        >
          Assign Selected Teacher
        </button>
      </div>
    );
};


export default Assignteacher