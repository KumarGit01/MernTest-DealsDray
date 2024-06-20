import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEmployee.css'; // Import the CSS file

const CreateEmployee = () => {
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
      // Upload the image first
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

      // Use the uploaded image URL to create the employee
      const employeeData = { ...employeeDetails, image: uploadData.image_url };
      const createResponse = await fetch('http://localhost:5000/api/employees/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      const createData = await createResponse.json();

      // Redirect to employee list page after creation
      if (createData.success) {
        alert(createData.message);
        navigate('/employees');
      } else {
        throw new Error('Failed to create employee');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
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
        <div>
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
        <div>
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
      <button type="submit">Create Employee</button>
    </form>
  );
};

export default CreateEmployee;
