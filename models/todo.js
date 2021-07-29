const mongoose = require('mongoose');

const todoModel = new mongoose.Schema({
    title: String,
    comments: String,
    date: {
        type: Date, default: Date.now
    }
})

module.exports = mongoose.model('Todo', todoModel);