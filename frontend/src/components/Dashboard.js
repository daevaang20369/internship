import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { authuser } = useAuth();
    const [data, setData] = useState([]);
    const [datat, setdatat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isStudent, setIsStudent] = useState(false);
    const route = "https://internship-1rc6.vercel.app/";
    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            const [teachersResponse, studentsResponse] = await Promise.all([
                axios.get(`${route}/api/getteacher`),
                axios.get(`${route}/api/getstudent`)
            ]);
            setData(teachersResponse.data);
            setdatat(studentsResponse.data);
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
            setError(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        // Determine if the user is a student
        if (authuser?.user?.role === "student") {
            setIsStudent(true);
        }

        

        fetchData();
    }, [authuser, route]);

    const deleteEntry = async (id) => {
        try {
            await axios.get(`${route}/api/datadelete/${id}`);
            await fetchData(); // Refresh data after deletion
        } catch (error) {
            console.error('There was an error deleting the entry!', error);
        }
    };

    const editEntry = (id) => {
        navigate(`/edituser/${id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>There was an error loading the data!</p>;

    return (
        <>
            <nav className="navbar container navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/adduser">Add Student or Teacher</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/createclassroom">Create a classroom</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/classrooms">Classrooms</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div>Dashboard</div>
            {authuser?.user?.role === "principal" && (
                <div className="container mt-5">
                    <h2>Teacher</h2>
                    <table className="table table-dark table-bordered">
                        <thead className='thead-light m-1'>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Date of Birth</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item._id}</td>
                                    <td>{item.name || 'N/A'}</td>
                                    <td>{item.age || 'N/A'}</td>
                                    <td>{item.dob || 'N/A'}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td><button className='btn btn-danger' onClick={() => deleteEntry(item._id)}>Delete</button></td>
                                    <td><button className='btn btn-success' onClick={() => editEntry(item._id)}>Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="container mt-5">
                <h2>Students</h2>
                <table className="table table-dark table-bordered">
                    <thead className='thead-light m-1'>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Role</th>
                            {!isStudent && (
                                <>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {datat.map((item, index) => (
                            <tr key={index}>
                                <td>{item._id}</td>
                                <td>{item.name || 'N/A'}</td>
                                <td>{item.age || 'N/A'}</td>
                                <td>{item.dob || 'N/A'}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                {!isStudent && (
                                    <>
                                        <td><button className='btn btn-danger' onClick={() => deleteEntry(item._id)}>Delete</button></td>
                                        <td><button className='btn btn-success' onClick={() => editEntry(item._id)}>Edit</button></td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Dashboard;
