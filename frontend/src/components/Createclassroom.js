import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from './Apiroute';

const CreateClassroom = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [className, setClassName] = useState('');
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState({
        Monday: { start: '', end: '' },
        Tuesday: { start: '', end: '' },
        Wednesday: { start: '', end: '' },
        Thursday: { start: '', end: '' },
        Friday: { start: '', end: '' },
        Saturday: { start: '', end: '' },
        Sunday: { start: '', end: '' },
    });

    useEffect(() => {
        axios.get(`${api}/api/getstudent`)
            .then(response => setStudents(response.data))
            .catch(error => console.error('Error fetching students:', error));
    }, []);

    const handleCheckboxChange = (event) => {
        const studentId = event.target.value;
        setSelectedStudents(prevState =>
            prevState.includes(studentId)
                ? prevState.filter(id => id !== studentId)
                : [...prevState, studentId]
        );
    };

    const handleInputChange = (day, field, value) => {
        console.log('Day:', day, 'Field:', field, 'Value:', value); // Debugging line

        setSchedule(prevSchedule => ({
            ...prevSchedule,
            [day]: {
                ...prevSchedule[day],
                [field]: value
            }
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const classroomData = {
            name: className,
            students: selectedStudents,
            schedule, // Include the schedule in the submission
        };

        try {
            await axios.post(`${api}/api/createclassroom`, classroomData);
            alert('Classroom created successfully');
            navigate('/dashboard'); // Redirect to the dashboard or another page
        } catch (error) {
            console.error('Error creating classroom:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Classroom</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Classroom Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={className} 
                        onChange={(e) => setClassName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group mt-4">
                    <label>Select Students:</label>
                    <div className="row student-name">
                        {students.map((student, index) => (
                            <div className="col-md-4 " key={student._id}>
                                <div className="btn-group " role="group" aria-label="Basic checkbox toggle button group">
                                    <input
                                        type="checkbox"
                                        className="btn-check"
                                        id={`btncheck${index}`}
                                        value={student._id}
                                        onChange={handleCheckboxChange}
                                        autoComplete="off"
                                    />
                                    <label className="btn btn-outline-primary namecheck" htmlFor={`btncheck${index}`}>
                                        {student.name} ({student.email})
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {Object.keys(schedule).map(day => (
                    <div key={day} className="form-group">
                        <h5>{day}</h5>
                        <div className="row">
                            <div className="col">
                                <label htmlFor={`${day}-start`}>Start Time</label>
                                <input 
                                    type="time" 
                                    className="form-control" 
                                    id={`${day}-start`} 
                                    value={schedule[day].start} 
                                    onChange={(e) => handleInputChange(day, 'start', e.target.value)} 
                                />
                            </div>
                            <div className="col">
                                <label htmlFor={`${day}-end`}>End Time</label>
                                <input 
                                    type="time" 
                                    className="form-control" 
                                    id={`${day}-end`} 
                                    value={schedule[day].end} 
                                    onChange={(e) => handleInputChange(day, 'end', e.target.value)} 
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary mt-4">Create Classroom</button>
            </form>
        </div>
    );
};

export default CreateClassroom;
