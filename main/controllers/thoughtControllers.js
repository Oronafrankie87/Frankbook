const { Thought, User } = require("../models");

const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate("reactions").select("-__v");

    res.json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getOneThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
      .populate("reactions")
      .select("-__v");

    if (!thought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const createThought = async (req, res) => {
  try {
    const { thoughtText, username } = req.body;

    const thought = await Thought.create({ thoughtText, username });

    const user = await User.findByIdAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user with that ID" });
    }

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      req.body,
      { new: true }
    ).select("-__v");

    if (!updatedThought) {
      return res.status(404).json({ message: "No such thought exists" });
    }

    res.json(updatedThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndRemove({
      _id: req.params.thoughtId,
    });

    if (!thought) {
      return res.status(404).json({ message: "No such thought exists" });
    }

    const user = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );

    res.json({ message: "Thought successfully deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      res.status(404).json({ message: "No such thought exists" });
    }

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      res.status(404).json({ message: "No such thought exists" });
    }

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
