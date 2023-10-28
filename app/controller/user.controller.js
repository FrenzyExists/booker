const User = require('../models/user.model')

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber || ''
  });

  // Save Tutorial in the database
  await User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else {
      console.log("SENDING...");
      res.send(data);
    }
  });
};

// Testing Complete
exports.find = async (req, res) => {  
  const id = parseInt(req.params.data, 10)
  if (isNaN(id)) {
    await User.getByName(req.params.data, (err, _data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Could not find any User with the name ${req.params.data}.`
          });
        } else {
          res.status(500).send({
            message: `Error retrieving User with the name ${req.params.data}. Server is unavailable.`
          });
        }
      } else res.send(_data);
    });
  } else {
    await User.getById(id, (err, _data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Could not find any User with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: `Error retrieving User with ${id}. Server is unavailable.`
          });
        }
      } else res.send(_data);
    });
  }
};

// Testing Complete
exports.update = async (req, res) => {
  await User.updateById(req.params.id, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Could not find any User with id ${req.params.id}.`
        });
      } else if(err.kind === "missing_data") {
        res.status(400).send({
          message: `Missing JSON object, cannot update user id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving User with ${req.params.id}. Server is unavailable.`
        });
      }
    } else {
      res.send(data);
    }
  });
}

exports.remove = async (req, res) => {
  await User.removeUser(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      }
    } else {
      res.send(data)
    }
  })
}