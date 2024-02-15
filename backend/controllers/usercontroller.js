const User = require('../models/userModel');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  addUser: async (req, res) => {
    const userData = req.body; 
    console.log(userData)
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
      
      const newUser = new User(userData);
      console.log(userData)
   
      await newUser.save();
      

      res.json({ message: 'User added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },


};