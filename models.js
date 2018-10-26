const mongoose = require('mongoose');

module.exports.User = mongoose.model('User',{
    id: Number,
    name: String,
    email: String
})

module.exports.Todo = mongoose.model('Todo',{
    id: Number,
    title: String,
    completed: Boolean,
    userId: Number
});
