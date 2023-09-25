const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.set('port', process.env.port || 5000)

//Middleware
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use('/connection', require('./routes/userAuth'));
app.use('/groups', require('./routes/Groups'));
app.use('/terms', require('./routes/Terms'));
app.use('/coordinators', require('./routes/Coordinators'));
app.use('/communities', require('./routes/Communities'));


app.listen(5000, () =>{
  console.log(`Server on port ${app.get('port')}`)
});