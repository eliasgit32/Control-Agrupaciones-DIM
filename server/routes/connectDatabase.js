import connect from '../connection';
const { Router } = require('express');
const router = new Router();

router.post('/connection', (req, res) => {
  //Recibir datos de usuario
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  
  //Conectar a BD
  const conn = connect(user.username, user.password);
  conn.connect((error) => {
    if (error){
      res.send(error);
      throw error;
    } else {
      console.log("Connected to Database!");
      res.send(200);
    } 
  });
  
});

module.exports = router;