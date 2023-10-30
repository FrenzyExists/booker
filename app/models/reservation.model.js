const sql = require("./db");
const boom = require("@hapi/boom");
const helper = require("./helper");

/**
 * # Reservations
 * 
* ### Params
 * @param {Object} reservation 
 * @param {string} reservation.reservationName
 * @param {Date} reservation.startReservationTime
 * @param {Date} reservation.endReservationTime
 * @param {Array<number>} reservation.invitedId
 * @param {number} reservation.inviteeId
 * @param {number} reservation.roomId
 */
const Reservation = function(reservation) {
  this.reservationName = reservation.reservationName;
  this.startReservationTime = reservation.startReservationTime;
  this.endReservationTime = reservation.endReservationTime;
  this.inviteeId = reservation.inviteeId;
  this.invitedId = reservation.invitedId;
  this.roomId = reservation.roomId;
};

// Requires Testing
/**
 * 
 * ### Params
 * @param {Object} newReservation 
 * @param {string} newReservation.name
 * @param {Date} newReservation.startReservationTime
 * @param {Date} newReservation.endReservationTime
 * @param {number} newReservation.roomId
 * @param {Array<number>} invitedId
 * @param {number} inviteeId
 * @param {function} result 
 */
Reservation.create = async (newReservation, inviteeId, invitedId, result) => {
  let connection;
  let res;
  let res1;
  let res2 = [];
  try { 
    connection = await sql.getConnection();
    await connection.beginTransaction();
    const query = sql.format("SELECT EXISTS (SELECT * FROM reservation WHERE startReservationTime < ? AND endReservationTime > ? AND roomId = ?) as '0'", [newReservation.endReservationTime, newReservation.startReservationTime, newReservation.roomId]);
    res = await connection.query(query);
    if (res[0][0][0] == 0) {
      const query2 = sql.format("INSERT INTO reservation SET ?", newReservation);
      res1 = await connection.query(query2);
      invitedId.forEach(async invited => {
        const query3 = sql.format("INSERT INTO invitation(userInvitee, userInvited, reservationId) VALUES(?, ?, ?) ", [inviteeId, invited, res1[0].insertId]);
        const temp = await connection.query(query3);
        res2.push(temp[0]);
      })
    } else {}
  await connection.commit();
  } catch (err) {
    await connection.rollback();
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  } finally {
    if (connection) {
      console.log(res[0][0][0], "RES 0\n--------------------\n\n");
      connection.release();
      if (res1) {
        console.log(res1[0], "RES 1\n--------------------\n\n");
        console.log(res2, "RES 2\n--------------------\n\n");
        let inv = []
        for (let i of res2) {
          console.log("I   ", i);
          console.log("I   ", i.insertId);
          inv.push(i.insertId)
        }
        console.log("INV ->    ", inv);
        // Possible improvements: couple the invited id array with the generated id for the invitation, same for the invitee 
        result(null, {'conflict': false, 'reservationId': res1[0].insertId, 'invitationID': inv});
      } else {
        console.log("Reservation has a conflict!");
        result({ kind: "conflict_in_reservation" }, null);
      }
    }
  }
}


// Get busiest hours (top 5)
// Require testing
/**
 * 
 * @description Get busiest hours
 * 
 * ### Params
 * @param {*} result 
 */
Reservation.getRushHour = async (limit, offset, result) => {
  try {
    const query = sql.format("SELECT date_format(startReservationTime, '%H') as `hour` FROM reservation group by date_format(startReservationTime), '%H' ORDER BY COUNT(*) desc limit 1;")
  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Requires Testing
/**
 * 
 * @param {*} userId 
 * @param {*} result 
 */
Reservation.getUserReservation = async (userId, result) => {
  try {
    const query = sql.format("SELECT id, reservationName, reservationCreationDate from reservation natural inner join user on id = userId");
    const res = await sql.execute(query);
  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

/**
 * 
 * @param {*} reservationId 
 * @param {*} result 
 */
Reservation.getUsersInvitedToReservation = async (reservationId, result) => {
  try {

  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

/**
 * 
 * @param {*} reservationId 
 * @param {*} result 
 */
Reservation.updateSingle = async (reservationId, result) => {
  try {

  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

/**
 * 
 * @param {*} reservationId 
 * @param {*} result 
 */
Reservation.removeSingle = async (reservationId, result) => {
  try {

  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

/**
 * 
 * @param {*} startTime 
 * @param {*} endTime 
 * @param {*} userId 
 * @param {*} result 
 */
Reservation.removeMany = async (startTime, endTime, userId, result) => {
  try {

  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

/**
 * 
 * @param {*} startTime 
 * @param {*} endTime 
 * @param {*} userId 
 * @param {*} result 
 */
Reservation.updateMany = async (startTime, endTime, userId, result) => {
}

module.exports = Reservation;