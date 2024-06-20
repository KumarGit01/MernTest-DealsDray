// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')
const multer = require('multer')
const path = require('path')
dotenv.config()

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@carrierlink.kzaoemv.mongodb.net/`)
  .then(() => console.log('Connected to MongoDB', mongoose.connection.name))
  .catch((error) => console.log('Error connecting to MongoDB', error));

  app.get('/',(req,res)=>{
res.send('Home')
})


const storage = multer.diskStorage({
  destination:"./upload/images",
  filename:(req,file,cb)=>{
return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})


const upload = multer({
  storage:storage
})



// Creating upload end point
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('image'), (req,res)=>{
res.json({
  success:1,
  image_url:`http://localhost:5000/images/${req.file.filename}`

})
})


// backend/server.js
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


