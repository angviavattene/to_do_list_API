var express = require ('express');
var app = express();
var todo = require('todolist_3');
var validTokens = ['Pippo', 'Caio', 'Sempronio'];

var authUser = function (req, res, next) {
    if (validTokens.includes(req.query.token)) {
        return next();
    }
    res.status(401).json('Invalid token');
}

var validId = function (req, res, next) {
    for (var i = 0; i < todo.allTodo().length; i++) {
        if (todo.allTodo()[i].id === parseInt(req.params.id)) {
            return next();
        }
    }
    return res.status(404).json({ message: 'Invalid ID' })
}

app.get('/todo', authUser, function (req, res) {
    res.status(200).json(todo.allTodo());
});

app.get('/completed/:id', authUser, validId, function (req, res) {
        res.json(todo.completed(parseInt(req.params.id)));
});

app.listen(3000);
