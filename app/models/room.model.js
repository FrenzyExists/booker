const sql = require("./db");
const boom = require("@hapi/boom");
const helper = require("./helper")

/**
 * # Room
 * 
 * @param {Object} room
 * @param {string} room.roomName
 * @param {string} room.roomNumber
 * @param {number} room.capacity
 * @param {number|string} room.category
 */
const Room = function (room) {
  this.roomName = room.roomName;
  this.roomNumber = room.roomNumber;
  this.capacity = room.capacity;
  this.category = room.category;
};


// Testing is done POYO
/**
 * # Room.create(newRoom, result)
 * 
 * @description Inserts a new Room entry in the database
 * 
 * ### Params
 * @param {Object} newRoom An object containing the base room information to be sent. 
 * @param {string} newRoom.name The name of the new Room entry
 * @param {string} newRoom.number The physical number assigned of the room entry
 * @param {string|number} newRoom.category The type of Room this entry belongs to. Available categories are: 'lecture-hall', 'lab', 'computer-lab', 'study-hall', 'office-space', 'library'
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
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

// Testing is done POYO
/**
 * # getById(room, result)
 * 
 * @description Retrieves base Room information that matches the input ID
 * 
 * ### Params
 * @param {number} room ID of the Room
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
Room.getById = async (room, result) => {
  await helper.helperModelGetterSimple("SELECT roomName, roomNumber, capacity FROM room WHERE id = ?", result, room);
}

// Testing is done POYO
/**
 * # Room.getAll(limit, offset, result)
 * 
 * @description Retrieves a list of Rooms from the database.
 * 
 * ### Parameters
 * @param {number} limit The maximum number of rooms to retrieve.
 * @param {number} offset The number of rooms to skip before starting to retrieve.
 * @param {function} result A callback function that is called with the results of the query.
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
Room.getAll = async (limit, offset, result) => {
  await helper.helperModelGetterSimple("SELECT id, roomName, roomNumber, capacity FROM room LIMIT ? OFFSET ?", result, limit, offset);
}


// Testing done
/**
 * # Room.getByName(room, result)
 * 
 * @description Retrieves base Room information that matches the input name
 * 
 * # Params
 * @param {string} room Name of the Room
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
Room.getByName = async (room, result) => {
  const r = room.toLowerCase();
  await helper.helperModelGetterSimple("SELECT id, roomNumber, capacity from room where roomName = ?", result, r);
}

// Testing Done POYO
/**
 * # Room.getByCategory(limit, offset, category, result)
 * 
 * @description Retrieves base Room information that matches the input category
 * Available matching categories are: 
 * `lecture-hall` `lab` `computer-lab` `study-hall` `office-space` and `library`
 * 
 * ### Params
 * @param {number} limit 
 * @param {number} offset 
 * @param {string} category 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
Room.getByCategory = async (limit, offset, category, result) => {
  const c = category.toLowerCase();
  await helper.helperModelGetterSimple("SELECT id, roomName, roomNumber, capacity from room where category = ?  LIMIT ? OFFSET ?", result, c, limit, offset);
}


// Requires Testing
/**
 * # getAllUnavailableTimeSlots(roomId, limit, offset, result)
 * 
 * 
 * ### Params
 * @param {number} room 
 * @param {number} limit 
 * @param {number} offset 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
Room.getAllUnavailableTimeSlots = async (room, limit, offset, result) => {
  try {
    const query = sql.format("SELECT id, creationDate, startTime, endTime FROM unavailableRoomPeriod WHERE roomId = ? LIMIT ? OFFSET ?", [room, limit, offset])
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

// Requires testing
/**
 * ### Params
 * @param {*} unavailableSlotid 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
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

/**
 * 
 * @param {number} roomId 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
Room.markRoomUnavailable = async (roomId, result) => {
  try {

  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

/**
 * 
 * ### Params
 * @param {number} room 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
Room.removeRoom = async (room, result) => {
  try {

  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// 
/**
 * 
 * Find who appointed a room at a certain time
 * 
 * ### Params
 * @param {number} roomId 
 * @param {*} date 
 * @param {*} time 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
Room.findWhoGotAppointedToThisRoom = async (roomId, date, time, result) => {
  try {

  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}


/**
 * @description Give an all-day schedule for a room
 * 
 * @param {number} roomId 
 * @param {*} date 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
Room.getAllDaySchedule = async (roomId, date, result) => {
  try {

  } catch (error) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Requires Testing
/**
 * # Room.getMostUsedRoom(limit, offset, result)
 * 
 * ### Params 
 * @param {number} limit 
 * @param {number} offset 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
Room.getMostUsedRoom = async (limit, offset, result) => {
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
