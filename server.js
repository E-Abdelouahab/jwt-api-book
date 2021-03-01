const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookrouter = require("./app/routes/route.book");
app.use('/Book', bookrouter)

const userrouter = require('./app/routes/route.user')
app.use('/User', userrouter)


const port =  8080;

app.use(express.json());
app.use(cors());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const dbConf = require('./app/config/database');


mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConf.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database, Exiting now...', err);
  process.exit();
});



app.listen(port, () => {
    console.log("info",`app listening at http://localhost:${port}`)
  })



