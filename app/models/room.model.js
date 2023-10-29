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

// Testing Done
/**
 * 
 * @param {number} room 
 * @param {*} result 
 */
Room.getById = async (room, result) => {
  try {
    const query = sql.format("SELECT roomName, roomNumber, capacity FROM room WHERE id = ?", room);
    const res = await sql.query(query);
    console.log(res);
    if (res.length) {
      result(null, res[0]);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

/**
 * Testing is done POYO
 * @param {*} limit 
 * @param {*} offset 
 * @param {*} result 
 */
Room.getAll = async (limit, offset, result) => {
  try {
    const query = sql.format("SELECT id, roomName, roomNumber, capacity FROM room LIMIT ? OFFSET ?", [limit, offset]);
    const res = await sql.query(query);
    if (res.length) {
      result(null, res[0])
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.log("error: ", boom.internal(err.message));
    result(boom.internal(err.message), null);
  }
}


// Requires Testing
/**
 * 
 * @param {string} room 
 * @param {*} result 
 */
Room.getByName = async (room, result) => {
  const r = room.toLowerCase();
  try {
    const query = sql.format("SELECT id, roomNumber, capacity from room where roomName = ?", r);
    const res = await sql.query(query);
    if (res.length) {
      result(null, res[0], ...r);
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.log("error: ", boom.internal(err.message));
    result({kind: "bad_input"}, null);
  }
}

/**
 * 
 * @param {number} limit 
 * @param {number} offset 
 * @param {string} category 
 * @param {*} result 
 */
Room.getByCategory = async (limit, offset, category, result) => {
  const c = category.toLowerCase();
  try {
    const query = sql.format("SELECT id, roomName, roomNumber, capacity from room where category = ?  LIMIT ? OFFSET ?", [c, limit, offset]);
    const res = await sql.query(query);
    if (res.length) {
      result(null, res[0], ...c);
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
