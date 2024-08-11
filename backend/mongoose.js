const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://daevaang14:uWjwBQeSUz3jGdUD@varcelapp.wva7a.mongodb.net/SCHOOL', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
    // Start your Express server or perform operations here
})
.catch(err => console.error('MongoDB connection error:', err));
const adminEmail = 'principal@classroom.com';
const adminPassword = 'Admin';

const userschema = new mongoose.Schema({
    name:String,
    age:Number,
    dob:String,
    email: String,
    password: String,
    role: String, // Principal, Teacher, Student

})

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  teachers: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  schedule: {type:Object},
}, { timestamps: true });

const Classroom = mongoose.model('Classroom', classroomSchema);

const User = mongoose.model('User', userschema);
  
const createPrincipal = async () => {
  try {
    const existingUser = await User.findOne({ email: adminEmail });
    if (!existingUser) {
      const newUser = new User({
        name:"admin",
        age:24,
        dob:"14041982",
        email: adminEmail,
        password: adminPassword,
        role: 'principal',
      });
      await newUser.save();
      console.log('Principal user created successfully.');
    } else {
      console.log('Principal user already exists.');
    }
  } catch (error) {
    console.error('Error creating principal user:', error);
  } 
};

createPrincipal();

module.exports =  {
    mongoose,
    User,
    Classroom
}