const express = require('express')

// creating instance of router
const router = express.Router()

// importing controller
const {createTodo , getTodos ,getTodosById , updateTodo } = require('../controller/createTodo')
const {deleteTodo}  =require('../controller/deleteTodo')
// defining api routes
router.post('/createTodo' , createTodo)
router.get('/getTodo' , getTodos)
router.get('/getTodo/:id' , getTodosById)
router.put('/updateTodo/:id' , updateTodo)
router.delete('/deleteTodo/:id' , deleteTodo)

module.exports = router