const sql = require("./db");

// constructor
const Reservation = (reservation) => {
  this.reservationName = reservation.reservationName;
  this.startReservationTime = reservation.startReservationTime;
  this.endReservationTime = reservation.endReservationTime;
  this.reservationCreationDate = reservation.reservationCreationDate;
  this.userId = reservation.userId;
  this.roomId = reservation.roomI;
};



// Get busiest hours (top 5)
// Require testing and prolly fix on the query
Reservation.getRushHour = async (result) => {
  try {
    const query = sql.format("SELECT date_format(startReservationTime, '%H') as `hour` FROM reservation group by date_format(startReservationTime), '%H' ORDER BY COUNT(*) desc limit 1;")
  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Requires Testing
Reservation.create = async (newReservation, result) => {
  try {
    const query = sql.format("INSERT INTO reservation SET ?", newReservation);
    const res = await sql.execute(query);
    result(null, { id: res[0].insertId, ...newReservation });
    console.log("Succesfully created a new reservation: ", { id: res[0].insertId, email: newUser.email, firstName: newUser.firstName });
  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Requires Testing
Reservation.getUserReservation = async (userId, result) => {
  try {
    const query = sql.format("SELECT id, reservationName, reservationCreationDate from reservation natural inner join user on id = userId");
    const res = await sql.execute(query);
  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

Reservation.getUsersInvitedToReservation = async (reservationId, result) => {
  try {

  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

Reservation.updateSingle = async (reservationId, result) => {
  try {

  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

Reservation.removeSingle = async (reservationId, result) => {
  try {

  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

Reservation.removeMany = async (startTime, endTime, userId, result) => {
  try {

  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

Reservation.updateMany = async (startTime, endTime, userId, result) => {
  try {

  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}
