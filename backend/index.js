
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const {User, Classroom} = require('./mongoose')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.det('/', async (req, res) => {
    res.json({"HIi"})
});
app.post('/api/login', async (req, res) => {
    console.log(req.body)
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await (password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/getteacher', async(req,res)=>{
  try {
    const user = await User.find({ role:"teacher" });
    res.json([...user]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})
app.get('/api/classrooms', async (req, res) => {
  try {
    const classrooms = await Classroom.find()
    .populate('students')  // Populate the students field
    .populate('teachers');
    res.json(classrooms);
} catch (error) {
    console.error('Error fetching classrooms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});
app.get('/api/getbyid/:id',async(req,res)=>{
  try {
    const user = await User.findById(req.params.id);
    res.json({user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})
app.get('/api/getstudent', async(req,res)=>{
  try {
    const user = await User.find({ role:"student" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})
app.post('/api/createclassroom', async (req, res) => {
  try {
      const { name, students, teachers, schedule } = req.body;
      console.log(schedule)
      const newClassroom = new Classroom({
          name,
          students,
          teachers,
          schedule
      });

      await newClassroom.save();

      res.status(201).json({ message: 'Classroom created successfully', classroom: newClassroom });
  } catch (error) {
      console.error('Error creating classroom:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
app.post("/api/updateuser", async(req,res)=>{
  const { id, name, age, dob, email, role } = req.body;
  try {
      const updatedUser = await User.findByIdAndUpdate(
          id,
          { name, age, dob, email, role },
          { new: true } // Return the updated document
      );
      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error' });
  }
})
app.get('/api/datadelete/:id',async(req,res)=>{
  try{
    const deleteitem = await User.findByIdAndDelete(req.params.id);
    if(!deleteitem){
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully', deleteitem });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error });
  }
})

app.post('/api/adduser', async(req,res)=>{
  const {name, age,dob,email, password,role} = req.body;
  try{
    const teacher = new User({name, age,dob,email, password,role});
    await teacher.save()
    // res.json({teacher})
    res.status(200).json({message: "created successfully"})
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})

app.post('/api/createClassroom', async (req, res) => {
  const { name, startTime, endTime, days } = req.body;
  try {
    const classroom = new Classroom({ name, startTime, endTime, days });
    await classroom.save();
    res.json({ classroom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/classrooms', async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.json({ classrooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
