const router = require('express').Router();

const {
  getThoughts,
  getOneThought,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  removeReactions,
} = require('../../controllers/thoughtControllers');

//Get all thoughts or create a new thought
router.route('/').get(getThoughts).post(createThoughts);

//get a single thought by its ID, delete a thought
router.route("/:thoughtId").get(getOneThought).delete(deleteThoughts).put(updateThoughts);

//Delete a reation from a specific thought by providing the thought ID and reaction Id
router.route("/:thoughtId/reactions/:reactionId").delete(removeReactions);


//Add a new reaction to a specific thought by providing the thought ID
router.route("/:thoughtId/reactions").post(addReaction);


modules.exports = router;