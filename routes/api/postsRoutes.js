const router = require('express').Router();
const { getSingleUser } = require('../../controllers/userController.js');
const {
    getPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
    deleteReaction,
    addReaction
} = require('../../controllers/postController.js');

//Get all posts
router.route('/').get(getPosts);

//Get a single post by ID
router.route('/:postId').get(getSinglePost);

//Create a post and push associated post to user's posts array field
router.route('/:userId/posts').get(getSingleUser).post(createPost);

//Update a single post by ID
router.route('/:postId/update').get(getSinglePost).put(updatePost);

//Delete a single post by ID
router.route('/:postId').delete(deletePost);

// Add reaction to post
router.route('/:postId/reactions').post(addReaction);

// Delete reaction to post
router.route('/:postId/reactions/').delete(deleteReaction);


module.exports = router;