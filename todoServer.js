const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors());
app.listen(666);

const mongoose = require('mongoose');
const Todo = mongoose.model('Todo',{
    title: String,
    completed: Boolean,
    userId: Number
})

mongoose.connect("mongodb://localhost/newbase");

// traitement de toutes les réponses pour supprimer _v et renommer _id en id
const mung = require('express-mung')
app.use(mung.json(entity=>{
    if (entity.length) {
        return entity.map(e=>transform(e))
    }
    else
        return transform(entity);
}));
function transform(entity){
    if (!entity.toObject)
        return;
    entity = entity.toObject();
    delete entity.__v;
    entity.id = entity._id;
    delete entity._id;
    return entity;
}

// le module body-parser nous permet de récupérer le body des requêtes en json
const bodyParser = require('body-parser');
// app.use permet d'ajouter un middleware, cad une fonction qui sera executé sur la requete avant l'appel de la route
// ici le middleware bodyParser transforme la requete en ajoutant le body en json dans reqla propriété body
app.use(bodyParser.json())


app.route('/todos').get((req, res)=>{
    Todo.find({},(err, todos)=>{
        res.json(todos);
    })
})

app.route('/todos').post((req, res)=>{
    let entity = req.body;
    Todo.create(entity, (err, todo)=>{
        res.json(todo);
    })
})