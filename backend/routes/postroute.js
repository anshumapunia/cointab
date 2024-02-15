const express = require('express');
const router = express.Router();
const postController = require('../controllers/postcontroller');


router.get('/:userId', postController.getUserPosts);


router.post('/:userId/bulkAdd', postController.bulkAddPosts);


router.get('/:userId/downloadExcel', postController.downloadExcel);

module.exports = router;