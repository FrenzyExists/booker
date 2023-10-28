const sql = require("./db");
const boom = require("@hapi/boom")

/**
 * @param {Object} room
 * @param {string} room.roomName
 * @param {string} room.roomNumber
 * @param {number} room.capacity
 * @param {*} room.category
 */
const Room = function (room) {
  this.roomName = room.roomName;
  this.roomNumber = room.roomNumber;
  this.capacity = room.capacity;
  this.category = room.category;
};


// Requires Testing
/**
 * 
 * @param {*} newRoom 
 * @param {*} result 
 */
Room.create = async (newRoom, result) => {
  try {
    const query = sql.format("INSERT INTO room SET ?", newRoom);
    const res = await sql.execute(query);
    result(null, { id: res[0].insertId, ...newRoom });
    console.log("New User got registered: ", { 
      id: res[0].insertId,
      roomName: newRoom.name,
      roomNumber: newRoom.number,
      capacity: newRoom.capacity,
      category: newRoom.category
    });
  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Requires Testing
Room.getById = async (room, result) => {
  try {
    const query = sql.format("SELECT roomName, roomNumber, roomCapacity from room where id in ?", room);
    const res = await sql.query(query);
    if (res.length) {
      result(null, res[0], ...room)
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Requires Testing
Room.getByName = async (room, result) => {
  try {
    const query = sql.format("SELECT id, roomNumber, roomCapacity from room where roomName = ?", room);
    const res = await sql.query(query);
    if (res.length) {
      result(null, res[0], ...room)
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}


// Requires Testing
Room.getAllUnavailableTimeSlots = async (roomId, result) => {
  try {
    const query = sql.format("SELECT id, creationDate, startTime, endTime FROM unavailableRoomPeriod where roomId in ?", roomId)
    const res = await sql.query(query)
    if (res.length) {
      result(null, res[0], ...roomId)
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Requires testing
Room.markRoomAvailable = async (unavailableSlotid, result) => {
  try {
    const query = sql.format("DELETE FROM unavailableRoomPeriod where id = ?", unavailableSlotid)
    const res = await sql.query(query)
    if (res.length) {
      console.log("Deleted ")
      result(null, res[0])
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}


Room.markRoomUnavailable = async (roomId, result) => {
  try {
    
  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}


Room.removeRoom = async (roomId, result) => {
  try {
    
  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Find who appointed a room at a certain time
Room.findWhoGotAppointedToThisRoom = async (roomId, date, time, result) => {
  try {
    
  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Give an all-day schedule for a room
Room.getAllDaySchedule = async (roomId, date, result) => {
  try {
    
  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Requires Testing
Room.getMostUsedRoom = async (result, limit = undefined) => {
  try {
    // requires some testing
    const query = sql.format("SELECT id from room natural inner join reservation where room.id = reservation.roomId")
    const res = await sql.query(query)
    if (res.length) {
      result(null, res[0])
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}





module.exports = Room;
