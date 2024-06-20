import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditEmployee.css'; // Import the CSS file

const EditEmployee = () => {
  const { id } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: 'Male',
    course: 'MCA',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/employees/get/${id}`);
        const fetchedEmployee = res.data.resp; // Assuming your API returns employee details in resp property
        setEmployeeDetails(fetchedEmployee);
        setImagePreview(fetchedEmployee.image); // Assuming the image URL is correctly set in the fetched data
      } catch (error) {
        alert('Error fetching employee data');
      }
    };

    fetchEmployee();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails({ ...employeeDetails, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEmployeeDetails({ ...employeeDetails, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If a new image is uploaded, upload it first
      let imageUrl = employeeDetails.image;
      if (employeeDetails.image instanceof File) {
        const formData = new FormData();
        formData.append('image', employeeDetails.image);

        const uploadResponse = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadData.success) {
          throw new Error('Image upload failed');
        }

        imageUrl = uploadData.image_url;
      }

      // Update the employee
      const updatedEmployee = { ...employeeDetails, image: imageUrl };
      await axios.put(`http://localhost:5000/api/employees/edit/${id}`, updatedEmployee);

      alert('Employee updated successfully');
      navigate('/employees');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={employeeDetails.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={employeeDetails.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Mobile</label>
        <input
          name="mobile"
          type="text"
          value={employeeDetails.mobile}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Designation</label>
        <select
          name="designation"
          value={employeeDetails.designation}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>
      <div>
        <label>Gender</label>
        <div className="radio-group">
          <label>
            <input
              name="gender"
              type="radio"
              value="Male"
              checked={employeeDetails.gender === 'Male'}
              onChange={handleInputChange}
              required
            />
            Male
          </label>
          <label>
            <input
              name="gender"
              type="radio"
              value="Female"
              checked={employeeDetails.gender === 'Female'}
              onChange={handleInputChange}
              required
            />
            Female
          </label>
        </div>
      </div>
      <div>
        <label>Course</label>
        <div className="radio-group">
          <label>
            <input
              name="course"
              type="radio"
              value="MCA"
              checked={employeeDetails.course === 'MCA'}
              onChange={handleInputChange}
            />
            MCA
          </label>
          <label>
            <input
              name="course"
              type="radio"
              value="BCA"
              checked={employeeDetails.course === 'BCA'}
              onChange={handleInputChange}
            />
            BCA
          </label>
          <label>
            <input
              name="course"
              type="radio"
              value="BSC"
              checked={employeeDetails.course === 'BSC'}
              onChange={handleInputChange}
            />
            BSC
          </label>
        </div>
      </div>
      <div>
        <label>Image</label>
        <input
          name="image"
          type="file"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div>
            <img src={imagePreview} alt="Preview" width="100" height="100" />
          </div>
        )}
      </div>
      <button type="submit">Update Employee</button>
    </form>
  );
};

export default EditEmployee;
