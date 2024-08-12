import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext'; // Ensure hook name matches
import { Navigate, useNavigate } from 'react-router-dom';
import api from './Apiroute';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]  = useState('');
  const { setauthuser, setisloggedin , isloggedin } = useAuth(); // Ensure hook name matches 
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${api}/api/login`, { email, password });
      const res = response.data;
      console.log("hiii")
      setisloggedin(true);
      console.log(isloggedin)
      setauthuser(res);
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res));
      console.log(localStorage.getItem('user'));
      navigate("/dashboard")

    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className='logindivcard'>
      <form className='loginformdiv d-flex flex-column justify-content-center' onSubmit={handleSubmit}>
        <h1 className='loginheading'>Login</h1>
        <div className="mb-2">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
          />
          <div id="emailHelp" className="form-text mb-3">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-4">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary mt-4">Submit</button>
      </form>
    </div>
  );
};

export default Login;
