const mongoose = require('mongoose');
// connection à la base de donnée (le serveur mongo doit être lancé et la base doit avoir ét créée)
mongoose.connect("mongodb://localhost/mydb");

const models = require('./models');
User = models.User;
Todo = models.Todo;

// crée un User avec un name et un email
User.create(
    {name: "Nicolas", email: "xxx@xxx.com"},
    (err, user) => {
        // user créé !
    })

// recherche un user avec le name Nicolas et modifie son email
User.findOneAndUpdate(
    {name: "Nicolas"},
    {email: "yyy@yyy.xxx"},
    (err, user) => {
        // user mis à jour !
    })

// récupère tous les utilisateurs
User.find(
    {},
    (err, users) => {
        console.log(users);
    })

// récupère un utilisateur selon le filtre
User.findOne(
    {name: "Nicolas"},
    (err, users) => {
        console.log(users);
    })

// supprime un utilisateur selon le filtre
User.deleteOne(
    {name: "Nicolas"},
    (err) => {
        // users supprimés !
    }
)