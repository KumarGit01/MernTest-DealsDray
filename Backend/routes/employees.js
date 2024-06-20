// backend/routes/employees.js
const express = require('express');
const Employee = require('../modal/Employee');
const multer = require('multer'); 
const router = express.Router();

router.post('/create', async (req, res) => {
  const { name, email, mobile, designation, gender, course, image } = req.body;

  try {
    const newEmployee = new Employee({ name, email, mobile, designation, gender, course, image });
    await newEmployee.save();
    res.json({ success: true, message: 'Employee created successfully', employeeId: newEmployee._id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating employee', error });
  }
});

router.get('/list', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

router.put('/edit/:id', async (req, res) => {
  const { name, email, mobile, designation, gender, course, image } = req.body;

  await Employee.findByIdAndUpdate(req.params.id, { name, email, mobile, designation, gender, course, image });

  res.json({ message: 'Employee updated successfully' });
});


router.get('/get/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee details fetched successfully', resp: employee });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted successfully' });
});

module.exports = router;
