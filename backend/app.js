//Plugin :
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const path = require('path');

//Modèles mongoose :
const Sauce = require('./models/Sauce');
const User = require('./models/User');

//Routes :
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//Application express :  
const app = express();


//Connexion BDD : 
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true,
    useUnifiedTopology: true }) 
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//traitement des données par bodyParser :
app.use(bodyParser.json());

//Mise en place des headers de requêtes :
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  //Mise en place d'un chemin virtuel pour les fichiers statiques (ici des images)
  app.use('/images', express.static(path.join(__dirname, 'images')));

  //Configuration des Urls routes :
  app.use('/api/sauces', sauceRoutes);
  app.use('/api/auth', userRoutes);

module.exports = app;