const express = require("express");
const fs = require("fs");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers");

const router = express.Router();

router.get("/", getTodos);
router.post("/create-to-do", createTodo);
router.patch("/update-to-do/:id", updateTodo);
router.delete("/delete-to-do/:id", deleteTodo);

module.exports = router;
