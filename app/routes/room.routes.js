
const express = require('express');
const room = require('../controller/room.controller');
module.exports = app => { 
    const router = express.Router();
    router.post("/", room.create); // verified
    router.get("/:data", room.find);
    router.get("/", room.find);

    app.use('/api/room', router);
  };
