const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// public feed
router.get('/', postsController.getFeed);

// protected routes start here
router.use(auth);

// must come BEFORE /:id
router.get('/me', postsController.getMyPosts);

// now the param route
router.get('/:id', postsController.getById);

// create post
router.post('/', upload.array('images', 6), postsController.createPost);

// like
router.post('/:id/like', postsController.likePost);

// comment
router.post('/:id/comments', postsController.addComment);

module.exports = router;
