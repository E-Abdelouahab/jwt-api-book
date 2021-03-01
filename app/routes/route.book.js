const router = require("express").Router();
let Book = require("../models/book");
let User = require("../models/user");
const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

router.route("/").get((req, res) => {
  
  res.json({
    Message:"Bonjour Je suis Youcodeur",
  });
});

router.route("/getbook").get(verifyToken ,(req, res) => {

  jwt.verify(req.token, 'secretkey', (err) => {
    if(err) {
      res.sendStatus(403);
    } else {
      Book.find().then((User) => res.json(User))
    }
  });
});

router.route("/add").post( (req, res) => {
  const name = req.body.name;
  const author = req.body.author;
  const price = req.body.price;
  console.log(name,author,price);

  const bookPush = new Book({
    name,
    author,
    price

  });

  bookPush
    .save()
    .then(() => res.json("Add Book successfully "))
    .catch((err) => res.status(400).json("Error :" + err));
}
);
module.exports = router;