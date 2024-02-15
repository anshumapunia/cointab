const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const PORT = process.env.PORT ||8080

const userRoutes = require('./routes/userroute');
const postRoutes = require('./routes/postroute');
const  MONGO_URI  = process.env.MONGO_URI 


const app = express();
app.use(express.json())
app.use(cors());


// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Use routes
app.use('/api/users', userroute);
app.use('/api/posts', postroute);

// Start the server

app.listen(PORT, () =>{
   console.log(`Server running on port ${PORT}`)}) ;
