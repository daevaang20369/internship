import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Edituser = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const route = "https://internship-ruzj-git-main-daevaang20369s-projects.vercel.app";

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [dob, setDob] = useState("");
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const getData = async () => {
        try {
            const response = await axios.get(`${route}/api/getbyid/${id}`);
            const { name, age, dob, email, role } = response.data.user;
            console.log(response.data)
            setName(name);
            setAge(age);
            setDob(dob);
            setEmail(email);
            setRole(role);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to load data. Please try again.');
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${route}/api/updateuser`, {
                id,
                name,
                age,
                dob,
                email,
                role
            });
            setSuccess(response.data.message);
            navigate("/dashboard")
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Failed to update user. Please try again.');
        }
    };

    return (
        <div className='logindivcard'>
            <form className='loginformdiv' onSubmit={handleSubmit}>
                <h1 className='loginheading'>Edit User</h1>
                <div className="mb-1">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setError(''); setSuccess(''); }}
                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        value={age}
                        onChange={(e) => { setAge(e.target.value); setError(''); setSuccess(''); }}
                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dob"
                        value={dob}
                        onChange={(e) => { setDob(e.target.value); setError(''); setSuccess(''); }}
                    />
                </div>
                <div className="mb-1">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); setSuccess(''); }}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        id="role"
                        className="form-select"
                        value={role}
                        onChange={(e) => { setRole(e.target.value); }}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </div>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-primary">{success}</p>}
                <button type="submit" className="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
    );
};

export default Edituser;
