const Reservation = require('../models/reservation.model');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const reservation = new Reservation({
    reservationName: req.body.name,
    startReservationTime: req.body.startTime,
    endReservationTime: req.body.endTime,
    inviteeId: req.body.invitee,
    invitedId: req.body.invited,
    roomId: req.body.roomId
  });

  if (!Array.isArray(reservation.invitedId)) {
    reservation.invitedId = [reservation.invitedId];
  }
  const invitedIds = reservation.invitedId;
  delete reservation.invitedId;
  const inviteeId = reservation.inviteeId;
  delete reservation.inviteeId;

  await Reservation.create(reservation, inviteeId, invitedIds, (err, _data) => {
    if (err) {
      if (err.kind == "missing_data") {
        res.status(400).send({
          message: `Missing JSON object, cannot update user id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Room."
        });
      }
    } else {
      console.log(_data, "HELLO");
      res.send(_data);
    }
  });
};