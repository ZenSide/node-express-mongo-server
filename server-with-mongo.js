// importation du module
const express = require('express');
// création d'une app express
const app = express();
// lancement du serveur sur le port 3000
app.listen(3000);

const mongoose = require('mongoose');
// connection à la base de donnée (le serveur mongo doit être lancé et la base doit avoir ét créée)
mongoose.connect("mongodb://localhost/newbase");

const models = require('./models');
User = models.User;
Todo = models.Todo;

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

// route GET sur le chemin /users
// renvoie une liste d'users
// req : object décrivant la requête
// res : object pour renvoyer la réponse
app.route('/users').get((req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    })
})

// route POST sur le chemin /users
app.route('/users').post((req, res) => {
    // récupération du body de la requete
    let entity = req.body;
    // sauvegarde de l'entité...
    User.create(entity,(err, user)=>{
        // envoi de la réponse
        res.json(user)
    })
})

// route GET pour un utilisateur sur le chemin /users/:userId
app.route('/users/:userId').get((req, res) => {
    // lecture du paramètre
    let userId = req.params.userId;
    // récupération de l'entité
    User.findOne({'_id':userId}, (err, user)=>{
        // envoi de la réponse
        res.json(user);
    })
})

// route PUT pour un utilisateur sur le chemin /users/:userId
app.route('/users/:userId').put((req, res) => {
    // lecture du paramètre
    let userId = req.params.userId;
    // récupération du body
    let entity = req.body;
    // mise à jour de l'entité...
    User.findOneAndUpdate({_id:userId}, {$set:entity}, {new: true}, (err,user)=>{
        // envoi de la réponse
        res.json(user);
    })
})

// les routes sur un chemin parent /entity peut être en get ou post
// les routes sur un chemin fils /entity/:id peuvent être en get, put ou delete