const asyncHandler = require("express-async-handler");

const Task = require("../models/taskModel");
const User = require("../models/userModel");

// get tasks
// route ==> GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });

  res.status(200).json(tasks);
});

// post task
// route ==> GET /api/tasks
const postTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text...");
  }

  const task = await Task.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(task);
});

// update tasks
// route ==> PUT /api/tasks/:id
const updateTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  const user = await User.findById(req.user.id);

  //check fot user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged user match the task user
  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updateTask);
});

// update tasks
// route ==> DELETE /api/tasks/:id
const deleteTasks = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }
  const user = await User.findById(req.user.id);

  //check fot user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged user match the task user
  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await task.remove();

  res.json({ id: req.params.id, msg: "delete" });
});
module.exports = {
  getTasks,
  postTask,
  updateTasks,
  deleteTasks,
};
