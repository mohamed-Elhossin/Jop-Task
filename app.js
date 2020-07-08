require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
// inialize with app express 
const app = express();
const userRout = require('./routes/user');
const device = require('./routes/device')
//data base connect
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conected done'))
    .catch(() => console.log('conected fail'))
mongoose.connection.on('error', (err) => {
    console.log(`connection fail becuase' + ${err}`);
})

// Middeelwhare
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.static(path.join(__dirname , 'public')));

require('./config/passport')(passport);


app.get('/', (req, res) => {
    res.send('iam a live');
});

app.use('/users', userRout);
app.use('/device', device);

// listen about port number 
const _PORT = process.env.PORT;
app.listen(_PORT, () => {
    console.log('server stared with port number ' + _PORT);
})