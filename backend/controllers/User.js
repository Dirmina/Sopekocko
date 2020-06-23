//Plugin :
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

//Inscription :
exports.signup = (req, res, next) => {
    //Hashage bcrypt du password :
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //Enregistrement nouvel utilisateur :
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };


//Connexion :
exports.login = (req, res, next) => {
    //On trouve l'utilisateur via l'adresse mail :
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //Comparaison du password envoyé avec celui de la bdd :
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              //Mise en place du token :
              token: jwt.sign(
                  {userId: user._id },
                  'UOFJUOdJOUtq8M0askG8JdnmRf4fSIFBuVMeVqdqxTnEV7A5nPC0gfYbLatKN7V',
                  { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };