const express = require("express");
const router = express.Router();
const {
  getTasks,
  postTask,
  updateTasks,
  deleteTasks,
} = require("../controllers/taskController");

router.route("/").get(getTasks).post(postTask);

router.route("/:id").put(updateTasks).delete(deleteTasks);

module.exports = router;
