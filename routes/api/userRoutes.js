const router = require('express').Router();
const {
    createUser,
    getUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    addFriend, 
    removeFriend
} = require('../../controllers/userController.js');

const {
    createPost
} = require('../../controllers/postController.js');

//Create a new user
router.route('/').get(getUsers).post(createUser);

//Get a single user by ID
router.route('/:userId').get(getSingleUser);

//Update a single user by ID
router.route('/:userId/update').put(updateUser);

// Delete a single user by ID
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// Create a post and associate with user
router.route('/:userId/posts').post(createPost);

//Delete friend from a user's friend list
router.route('/:userId/friends/:friendId').delete(removeFriend);

//Add new friend to a user's friend list
router.route('/:userId/friends/:friendId').post(addFriend);



module.exports = router;