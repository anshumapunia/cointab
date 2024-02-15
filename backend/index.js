const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const PORT = process.env.PORT ||8080

const userRoutes = require('./routes/userroute');
const postRoutes = require('./routes/postroute');
const  MONGO_URL  = process.env.MONGO_URL 


const app = express();
app.use(express.json())
app.use(cors());


// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Start the server

app.listen(PORT, () =>{
   console.log(`Server running on port ${PORT}`)}) ;
