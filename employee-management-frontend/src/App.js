import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import EmployeeList from './Components/EmployeeList/EmployeeList';
import CreateEmployee from './Components/CreateEmployee/CreateEmployee';
import Dashbord from './Components/Dashbord/Dashbord';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import EditEmployee from './Components/EditEmployee/EditEmployee';

function App() {

  
  return (
    <Router>
  <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      
            <Route path="/Dashbord" element={<Dashbord />} />
         
            <Route path="/login" element={<Login />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/create-employee" element={<CreateEmployee />} />

            <Route path="/edit-employee/:id" element={<EditEmployee />} />

        
      </Routes>
    </Router>
  );
}

export default App;
