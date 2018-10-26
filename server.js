// importation du module
const express = require('express');
// création d'une app express
const app = express();
// lancement du serveur sur le port 3000
app.listen(3000);

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
    let users = [
        {id: 1, name: "Nicolas", email: "xxx@xxx.com"},
        {id: 2, name: "Sophie", email: "xxx@xxx.com"},
        {id: 3, name: "Roger", email: "xxx@xxx.com"}
    ]
    // res.json permet de renvoyer un object ou un tableau json en réponse
    res.json(users);
})

// route POST sur le chemin /users
app.route('/users').post((req, res) => {
    // récupération du body de la requete
    let entity = req.body;
    // sauvegarde de l'entité...
    // envoi de la réponse
    res.json({ok: 1})
})

// route GET pour un utilisateur sur le chemin /users/:userId
app.route('/users/:userId').get((req, res) => {
    // lecture du paramètre
    let userId = req.params.userId;
    // récupération de l'entité
    let user = {id: userId, name: "Roger", email: "xxx@xxx.xxx"}
    res.json(user);
})

// route PUT pour un utilisateur sur le chemin /users/:userId
app.route('/users/:userId').put((req, res) => {
    // lecture du paramètre
    let userId = req.params.userId;
    // récupération du body
    let entity = req.body;
    // mise à jour de l'entité...
    // envoi de la réponse
    res.json({ok: 1});
})

// les routes sur un chemin parent /entity peut être en get ou post
// les routes sur un chemin fils /entity/:id peuvent être en get, put ou delete