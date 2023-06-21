const router = require('express').Router();

const {
  getUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userControllers');
//get all users or create a new user
router.route('/').get(getUsers).post(createUser);

//get a single user by theri ID, delete a user, or update a user
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);


//Add a friend to a specific user by providing the userID and friendID
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

