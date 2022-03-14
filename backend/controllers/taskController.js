// get tasks
// route ==> GET /api/tasks
const getTasks = (req, res) => {
  res.status(200).json({ msg: "hey you!" });
};

// post task
// route ==> GET /api/tasks
const postTask = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text...");
  }
  res.status(200).json({ msg: "set task" });
};

// update tasks
// route ==> PUT /api/tasks/:id
const updateTasks = (req, res) => {
  res.json({ msg: `update task ${req.params.id}` });
};

// update tasks
// route ==> DELETE /api/tasks/:id

const deleteTasks = (req, res) => {
  res.json({ msg: `delete task ${req.params.id}` });
};

module.exports = {
  getTasks,
  postTask,
  updateTasks,
  deleteTasks,
};
