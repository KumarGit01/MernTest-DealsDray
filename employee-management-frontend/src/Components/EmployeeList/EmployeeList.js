import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './EmployeeLister.css'; // Import the CSS file

const EmployeeList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/employees/list');
        if (res.data) {
          setData(res.data);
          console.log(res.data);
        } else {
          alert('No User found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data');
      }
    };

    fetcher();
  }, []);

  const DeleteHandle = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/employees/delete/${id}`);
      if (!res) {
        throw new Error('Not Deleted');
      }
      alert('Employee deleted successfully');
      // Update the state to remove the deleted employee
      setData(data.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Error deleting employee');
    }
  };

  return (
    <div className="container">
      <div className="button-container">
        <button onClick={() => navigate('/create-employee')}>Create User</button>
      </div>
      {data.length > 0 ? (
        <div className="employee-list">
          {data.map((employee) => (
            <div key={employee._id} className="employee-card">
              <img src={employee.image} alt="Pic" />
              <p>{employee.name}</p>
              <p>{employee.email}</p>
              <p>{employee.mobileNo}</p>
              <p>{employee.designation}</p>
              <p>{employee.gender}</p>
              <p>{employee.course}</p>
              <p>{employee.createdDate}</p>
              <div className="actions">
                <NavLink to={`/edit-employee/${employee._id}`}>Edit</NavLink>
                <button onClick={() => DeleteHandle(employee._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">Please Create An Employee (Click on  Create user)</div>
      )}
    </div>
  );
};

export default EmployeeList;
