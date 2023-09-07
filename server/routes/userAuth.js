const { Router } = require('express');
const router = new Router();
const conn = require('../connection');

router.post('/', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  }

  const sql = 'SELECT COUNT(*) AS user FROM usuarios ' +
  `WHERE nombre ='`  + user.username + `' AND password = '` + user.password + `'`

  conn.query(sql, (error, result) => {
    if(error) {
      res.statusCode = 500;
      console.log(error)
      res.send(error.sqlMessage);
      return;
    } else {
      res.send(result[0])
      return;
    }
  })
})

module.exports = router;