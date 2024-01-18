const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
// const conn = require('/Users/Elias Peñalver/Documents/Trabajos/Pasantía/Control-Agrupaciones-DIM/server/connection');

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
app.use('/communities', require('./routes/Communities'));
app.use('/activities', require('./routes/Activities'));
app.use('/participants', require('./routes/Participants'));
app.use('/participations', require('./routes/Participations'));
app.use('/reports', require('./routes/Reports'));


const server = app.listen(5000, () =>{
  console.log(`Server on port ${app.get('port')}`)
});

app.post('/shutdown', (req, res) => {
  console.log('shutdown received')
  res.statusCode = 200;
  res.send('Server Closed')
  server.close();
  process.exit(0);
})