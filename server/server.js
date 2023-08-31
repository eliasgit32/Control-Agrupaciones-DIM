const express = require('express');
const app = express();
const morgan = require('morgan');


app.set('port', process.env.port || 5000)

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use('/connection', require('./routes/connectDatabase'));

//Iniciar server
app.listen(5000, () =>{
  console.log(`Server on port ${app.get('port')}`)
});