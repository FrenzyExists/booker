
const express = require('express');
const user = require('../controller/user.controller');
module.exports = app => {

    const router = express.Router();
    // Create a new Tutorial
    router.post("/", user.create); // verified
    router.get("/:data", user.find); // verified
    router.put('/:id', user.update); // verified
    router.delete('/:id', user.remove);
  
    app.use('/api/users', router);
  };
