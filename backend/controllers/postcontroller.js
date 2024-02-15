const axios = require('axios');
const excel = require('exceljs');
const fs = require('fs');
// const Post = require('../models/postModel');
const User = require('../models/usermodel');



module.exports = {
  getUserPosts: async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

 
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const posts = response.data;

      res.render('postPage', { user, posts });
    } catch (error) {
      console.error('Error fetching user posts:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  bulkAddPosts: async (req, res) => {
    try {
      const userId = req.params.userId;


      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const posts = response.data;

    
      const existingPosts = await Post.find({ userId });
      if (existingPosts.length > 0) {
        return res.status(400).json({ error: 'Posts already exist for this user' });
      }

     
      await Post.insertMany(posts.map(post => ({ ...post, userId })));

   
      res.json({ message: 'Posts added successfully' });
    } catch (error) {
      console.error('Error adding posts:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  downloadExcel: async (req, res) => {
    try {
      const userId = req.params.userId;

     
      const posts = await Post.find({ userId });

    
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Posts');

     
      worksheet.columns = [
        { header: 'Title', key: 'title', width: 40 },
        { header: 'Body', key: 'body', width: 60 }
     
      ];

    
      posts.forEach(post => {
        worksheet.addRow({ title: post.title, body: post.body });
        
      });

      
      const filePath = `./temp/posts_${userId}.xlsx`;
      await workbook.xlsx.writeFile(filePath);

      res.download(filePath, `posts_${userId}.xlsx`, () => {
      
        fs.unlinkSync(filePath);
      });
    } catch (error) {
      console.error('Error downloading posts in Excel:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};



