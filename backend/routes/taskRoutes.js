const express = require("express");
const router = express.Router();

const {
  getTasks,
  postTask,
  updateTasks,
  deleteTasks,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTasks).post(protect, postTask);

router.route("/:id").put(protect, updateTasks).delete(protect, deleteTasks);

module.exports = router;
