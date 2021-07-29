const express = require('express');
const todo = require('../models/todo');
const router = express.Router();
const Todo = require('../models/todo')

//get all todos
router.get('/',async (req,res) => {
    try{
        let todos = await Todo.find({})
        res.json(todos);
    }
    catch(err){
        console.log('error finding todos: ' + err);
        res.status(404).send('error')
    }
})

//get a single todo 
router.get('/:id', async (req,res) => {
    const id = req.params.id;
    try{
        let todo = await Todo.findById(id)
        res.json(todo);
    }
    catch(err){
        console.log('error finding todo: ' + err);
        res.status(404).send('error')
    }
})

//create a new todo 
router.post('/', async (req,res) => {
    const data = req.body;
    const title = data.title;
    const comments = data.comments;
    try{
        let newTodo = new Todo({
            title,
            comments
        })
        await newTodo.save();
        res.json(newTodo);
    }
    catch(err){
        console.log('error creating todo: ' + err);
        res.status(404).send('error')
    }
})

//update an existing todo 
router.post('/update/:id', async (req,res) => {
    const id = req.params.id
    const title = req.body.title;
    console.log(title);
    try{
        await Todo.updateOne({"_id": id}, {title: title});
        res.send('updated: ' +id);
    }
    catch(err){
        console.log('error updating todo: ' + err);
        res.status(404).send('error')
    }
})

//delete a todo
router.delete('/delete/:id', async (req,res) => {
    try{
        await Todo.deleteOne({"_id":req.params.id});
        res.json('deleted: ' + req.params.id);
    }
    catch(err){
        console.log('error deleting todo: ' + err);
        res.status(404).send('error')
    }
})

module.exports = router;