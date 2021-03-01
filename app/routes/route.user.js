const router = require("express").Router();
let User = require("../models/user");
const jwt = require('jsonwebtoken');

router.route("/").get((req, res) => {
  User.find()
  .then((User) => res.json(User))
  .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/add").post( (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const password = req.body.password;

    const userPush = new User({
      name,
      phone,
      password

    });

    userPush
      .save()
      .then(() => res.json("Add User successfully "))
      .catch((err) => res.status(400).json("Error :" + err));
});


router.route("/login").post((req, res) => { 

  User.findOne({ phone: req.body.phone,password: req.body.password  }).then((user) => {
  jwt.sign({user}, 'secretkey', { expiresIn: '1h' }, (err, token) => {
    res.json({
      token
    });
  });
  
});
});

module.exports = router;