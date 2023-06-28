const Todo = require("../models/Todo");

// creating a entry for our new todo
exports.createTodo = async (req, res) => {
  try {
    // extract message
    const { title, description } = req.body;
    // create a new todo object and insert in db
    const response = await Todo.create({
      title,
      description,
    });
    // send a json response with success flag
    res.status(200).json({
      success: true,
      data: response,
      message: "Entry has been created succesfully in our database",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get all todos
exports.getTodos = async (req, res) => {
  try {
    // fetch all todo items from database
    const items = await Todo.find({});

    res.status(200).json({
      success: true,
      data: items,
      message: "Entire data fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get todos by id
exports.getTodosById = async (req, res) => {
  try {
    // extract todo item based on id param
    const id = req.params.id;

    const TODO = await Todo.findById({ _id: id });

    // we did not find that id
    if (!TODO) {
      res.status(400).json({
        success: false,
        message: "Data not found,id does not exists",
      });
    } else {
      res.status(400).json({
        success: true,
        data: TODO,
        message: "Data found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update todo which we have fetched with dynamic param id

exports.updateTodo = async (req, res) => {
  try {
    // const id = req.params.id;
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description, updatedAt: Date.now() }
    );
    res.status(200).json({
      success: true,
      data: updatedTodo,
      message: "We have successfully updated that todo",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
