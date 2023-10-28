const sql = require("./db");
const boom = require("@hapi/boom")


/**
 * 
 * @param {Object} user
 * @param {string} user.firstName
 * @param {string} user.lastName
 * @param {string} user.email
 * @param {string} user.phoneNumber
 */
const User = function (user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.phoneNumber = user.phoneNumber;
};

// Testing Done
/**
 * # Creates a new User
 * @param {Object} newUser 
 * @param {*} result 
 * 
 * 
 */
User.create = async (newUser, result) => {
  try {
    const query = sql.format("INSERT INTO user SET ?", newUser);
    const res = await sql.execute(query);
    result(null, { id: res[0].insertId, ...newUser });
    console.log("New User got registered: ", { id: res[0].insertId, email: newUser.email, firstName: newUser.firstName });
  } catch (err) {
    // handle error
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Testing Done
/**
 * 
 * @param {*} id 
 * @param {*} result 
 */
User.getById = async (id, result) => {
  try {
    const query = sql.format("SELECT firstName, lastName, email, phoneNumber FROM user WHERE id = ?", id);
    const res = await sql.query(query);
    if (res[0].length) {
      res[0][0].id = id
      result(null, res[0][0])
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Testing Done
/**
 * 
 * @param {*} name
 * @param {*} result 
 */
User.getByName = async (name, result) => {
  try {
    const query = sql.format("SELECT id, lastName, email, phoneNumber FROM user WHERE firstName = ?", name);
    const res = await sql.query(query);
    if (res[0].length) {
      result(null, res[0])
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}


// Testing Done
/**
 * @author Detective Pikachu
 * @param {number} id
 * @param {Object} userInfo
 * @param {*} result
 * 
 */
User.updateById = async (id, userInfo, result) => {
  try {
    if(Object.keys(userInfo).length === 0) {
      result({ kind: "missing_data" }, null);
    } else {
      const query = sql.format("UPDATE user SET firstName = ?, lastName = ?, email = ?, phoneNumber = ? WHERE id = ?", [userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.phoneNumber, id]);
      const res = await sql.query(query);
      if (res[0].affectedRows === 0) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, res[0], ...id)
      }
    }
  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}


User.removeUser = async (id, result) => {
  try {
    const query = sql.format("DELETE FROM user WHERE id = ?", id)
    const res = await sql.query(query)
    if (res[0].affectedRows === 0) {
      result({ kind: "not_found" }, null);
    } else {
      console.log("Deleted id ", id)
      result(null, res[0], ...id)
    }    
  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}


User.checkUserAvailability = (id, startDate, endDate, result) => {
  sql.query("", [], (err, res) => {

  });
}

// Require Testing
User.validateEmail = async (email, result) => {
  try {
    const query = sql.format("SELECT EXISTS(SELECT 1 FROM user WHERE email = ? LIMIT 1)", email);
    const res = await sql.query(query);

    // hello there :D
    result(null, res[0]);

  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Require Testing
User.markUserTimeUnavailable = async (id, startDate, endDate, result) => {
  try {
    const query = sql.format("INSERT INTO unavailableUserPeriod(userId, startTime, endTime) values(?, ?, ?)", id, startDate, endDate);
    const res = await sql.query(query);
    if (res.length) {
      result(null, res[0], ...{ 'userId': id, 'startDate': startDate, 'endDate': endDate });
    }
  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}


// Require Testing
User.markUserTimeAvailable = (unId, result) => {
  try {
    const query = sql.format("DELETE from unavailableUserPeriod WHERE id = ?", unId)



  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Finish this mess
User.getAllDaySchedule = async (id, result) => {
  try {

    const query = sql.format("SELECT userId, reservationName, startReservationTime, endReservationTime, reservationCreationDate FROM reservation inner join user on (user.id = reservation.userId) where reservation.userId = ?", id);

  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// Find top 10 users who book around more
User.getUserWithMostReservation = async (id, result) => {
  sql.query("", [], (err, res) => {

  });
}


User.topTenMostActiveUsers = async (result) => {
  sql.query("", [], (err, res) => {

  });
}

User.getMostUsedRoomByUser = async (id, result) => {
  try {

  } catch (err) {

  }
}

User.getUserCountByRole = async (role, result) => {
  try {

  } catch (err) {

  }
}

User.checkIfUserExists = async (firstName, lastName, result) => {
  try {

  } catch (err) {

  }
}

User.getUserIUssuallyInviteMost = async (id, result) => {
  sql.query("", [], (err, res) => {

  });
}

User.nukeUsersDB = async (result) => {
  sql.query("", [], (err, res) => {

  });
}


module.exports = User;