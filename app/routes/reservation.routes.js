
const express = require('express');
const reservation = require('../controller/reservation.controller');
module.exports = app => { 
    const router = express.Router();
    router.post("/", reservation.create); // verified

    app.use('/api/reservation', router);
  };
