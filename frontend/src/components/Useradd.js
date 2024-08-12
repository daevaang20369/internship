import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext'; // Ensure hook name matches
import { Navigate, useNavigate } from 'react-router-dom';
import api from './Apiroute';

const Useradd = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setrePassword] = useState('');
  const [role, setrole] = useState('student');
  const [name , setname] = useState('');
  const [age,setage]= useState('');
  const [dob, setdob] =useState('');
  const [success, setsucess] = useState('')
  const [error, setError]  = useState('');
  const { authuser, setauthuser, setisloggedin , isloggedin } = useAuth(); // Ensure hook name matches
  const navigate = useNavigate()
  const handlechange =(event) =>{
    setrole()
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if( password == repassword){
        try {
            const response = await axios.post(`${api}/api/adduser`, {name, age,dob,email, password,role});
            const res = response.data.message;
            setsucess(res)
          } catch (error) {
            console.error('Login error:', error);
            setError('Invalid credentials. Please try again.');
          }
    }else{
        setError('Password doesnt match. Please try again.');
    }

  };

  return (
    <div className='logindivcard'>
      <form className='loginformdiv' onSubmit={handleSubmit}>
        <h1 className='loginheading'>Login</h1>
        <div className="mb-1">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => { setname(e.target.value); setError(''); setsucess(''); }}
          /></div>
     <div className="mb-1">
          <label htmlFor="exampleInputEmail1" className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={age}
            onChange={(e) => { setage(e.target.value); setError('');setsucess(''); }}
          />
          
        </div><div className="mb-1">
          <label htmlFor="exampleInputEmail1" className="form-label">DOB</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={dob}
            onChange={(e) => { setdob(e.target.value); setError('');setsucess(''); }}
          />
      
        </div>
        <div className="mb-1">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('');setsucess('');}}
          />
                  </div>
        <div className="mb-1">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError('');setsucess(''); }}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="exampleInputPassword1" className="form-label">Re-Enter Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={repassword}
            onChange={(e) => { setrePassword(e.target.value); setError('');setsucess(''); }}
          />
        </div>
        <div className="mb-5">
        <label htmlFor="selectOption" className="form-label">Select an Option</label>
        <select id="selectOption" className="form-select" onChange={(e) => { setrole(e.target.value)}}>
          <option value="student">Student</option>
          <option value="teacher" disabled={false}>Teacher</option>
        </select></div>
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-primary">{success}</p>}

        <button type="submit" className="btn btn-primary mt-4">Submit</button>
        
      </form>
             
    </div>
  );
};

export default Useradd;
