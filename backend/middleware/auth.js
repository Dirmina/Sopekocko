const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //Récupération du token via le header authorization :
    const token = req.headers.authorization.split(' ')[1];
    //le token est vérifié :
    const decodedToken = jwt.verify(token, 'UOFJUOdJOUtq8M0askG8JdnmRf4fSIFBuVMeVqdqxTnEV7A5nPC0gfYbLatKN7V');
    const userId = decodedToken.userId;
    //Si la requete ne vient pas du bon utilisateurs :
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};