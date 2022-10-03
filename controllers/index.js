const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const data = require("../data.json");

const getTodos = async (req, res) => {
  await fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(JSON.parse(data));
  });
};

const createTodo = async (req, res) => {
  const body = req.body;
  const id = uuidv4();

  const newTodo = { ...body, id };
  const newTodos = JSON.stringify([...data, newTodo]);

  await fs.writeFile("./data.json", newTodos, "utf8", (err) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ message: "New todo created successfully!" });
  });
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { toDo, status } = req.body;

  const updatedToDo = data?.find((todo) => todo?.id === id);
  if (toDo) updatedToDo["toDo"] = toDo;
  if (status) updatedToDo["status"] = status;

  const newTodos = JSON.stringify([...data]);

  await fs.writeFile("./data.json", newTodos, "utf8", (err) => {
    if (err) {
      console.log(err);
    }
    res
      .status(200)
      .json({ message: `Todo with id ${id} updated successfully` });
  });
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  const newTodos = data?.filter((todo) => todo.id !== id);
  await fs.writeFile("./data.json", JSON.stringify(newTodos), (err) => {
    if (err) {
      console.log(err);
    }
    res
      .status(200)
      .json({ message: `Todo with id ${id} deleted successfully` });
  });
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
