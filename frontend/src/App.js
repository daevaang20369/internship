import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import "./App.css"

import Testa from './components/Testa';
import Dashboard from './components/Dashboard';
import Useradd from './components/Useradd';
import Edituser from './components/Edituser';
import CreateClassroom from './components/Createclassroom';
import ClassroomsList from './components/Classroomlist';
import Assignteacher from './components/Assignteacher';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="test" element={<Testa />} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="adduser" element={<Useradd/>} />
        <Route path="edituser/:id" element={<Edituser/>} />
        <Route path="createclassroom" element={<CreateClassroom/>} />
        <Route path="classrooms" element={<ClassroomsList />} />
        <Route path="assignteacher/:id" element={<Assignteacher />} />

      </Route>
    </Routes>
  );
}

export default App;