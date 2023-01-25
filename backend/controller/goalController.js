const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");
const User = require("../model/userModel");

//@desc Get Goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json({ goals });
});

//@desc Set Goal
//@route POST /api/goals
//@access Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goals = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json({ goals });
});

//@desc Update Goals
//@route PUT /api/goals/:id
//@access Private
const UpdateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not Found");
  }

  const user = await User.findById(req.user.id);
  //Check for USer
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ updateGoal });
});

//@desc Delete Goals
//@route DELETE /api/goals/:id
//@access Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not Found");
  }
  const user = await User.findById(req.user.id);
  //Check for USer
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getGoals,
  setGoals,
  UpdateGoals,
  deleteGoals,
};
