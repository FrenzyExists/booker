const sql = require("./db");
const boom = require("@hapi/boom");
const helper = require('./helper');

/**
 * # User
 * 
 * @author Detective Pikachu
 * 
 * ### Params
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

// Testing Done POYO
/**
 * # User.create(newUser, result)
 * 
 * @author Detective Pikachu
 * @description Creates a new User
 * 
 * ### Params
 * @param {Object} newUser 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
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

// Testing Done POYO
/**
 * # User.getById(id, result)
 * 
 * @author Detective Pikachu
 * @description Retrieves base User information that matches id
 * 
 * ### Params
 * @param {number} id 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
User.getById = async (id, result) => {
  await helper.helperModelGetterSimple('SELECT firstName, lastName, email, phoneNumber FROM user WHERE id = ?', result, ['id'], id);
}

// Testing Done POYO
/**
 * # User.getByName(name, result)
 * 
 * @author Detective Pikachu
 * @description Retrieves base User information that matches the users' first name
 * 
 * ### Params
 * @param {string} name
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
User.getByName = async (name, result) => {
  await helper.helperModelGetterSimple('SELECT id, lastName, email, phoneNumber FROM user WHERE firstName = ?', result, ['firstName'], name);
}


// Testing Done POYO
/**
 * # User.updateById(id, userInfo, result)
 * 
 * @author Detective Pikachu
 * @description Modifies base User information that matches id
 * 
 * ### Params
 * @param {number} id
 * @param {Object} userInfo
 * @param {string} userInfo.firstName
 * @param {string} userInfo.lastName
 * @param {string} userInfo.email
 * @param {string} userInfo.phoneNumber
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 * 
 */
User.updateById = async (id, userInfo, result) => {
  try {
    if (Object.keys(userInfo).length === 0) {
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

/**
 * # User.removeUser
 * 
 * @author Detective Pikachu
 * @description []
 * 
 * ### Params
 * @param {number} id 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
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

/**
 * # User.checkUserAvailability(id, startDate, endDate, result)
 * 
 * @author Detective Pikachu
 * @description []
 * 
 * ### Params
 * @param {number} id 
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
User.checkUserAvailability = (id, startDate, endDate, result) => {
  sql.query("", [], (err, res) => {

  });
}

// Require Testing
/**
 * # User.validateEmail(email, result)
 * 
 * @author Detective Pikachu
 * @description []
 * 
 * ### Params
 * @param {*} email 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
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
/**
 * # User.markUserTimeUnavailable(id, startDate, endDate, result)
 * 
 * ### Params
 * @param {number} id 
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
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
/**
 * @author Detective Pikachu
 * 
 * ### Params
 * @param {number} id 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
User.markUserTimeAvailable = (id, result) => {
  try {
    const query = sql.format("DELETE from unavailableUserPeriod WHERE id = ?", id)


  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}


/**
 * # User.getAllDaySchedule(id, result)
 * 
 * @author Detective Pikachu
 * 
 * ### Params
 * @param {number} id 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
User.getAllDaySchedule = async (id, result) => {
  try {

    const query = sql.format("SELECT userId, reservationName, startReservationTime, endReservationTime, reservationCreationDate FROM reservation inner join user on (user.id = reservation.userId) where reservation.userId = ?", id);

  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

/**
 * # User.getUserWithMostReservation(id, result)
 * 
 * @author Detective Pikachu
 * @description Find top 10 users who book around more
 * 
 * ### Params
 * @param {number} id 
 * @param {function} result A promise callback function to which the confirmation of success or failure is sent to
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
User.getUserWithMostReservation = async (id, result) => {
  sql.query("", [], (err, res) => {

  });
}

/**
 * # User.topTenMostActiveUsers(offset, result)
 * 
 * @author Detective Pikachu
 * 
 * ### Params
 * @param {number} offset
 * @param {function} result 
  * 
  * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
  * function with the results of the query.
 */
User.topTenMostActiveUsers = async (offset, result) => {
}

/**
 * # User.getMostUsedRoomByUser(id, result)
 * 
 * @author Detective Pikachu
 * 
 * ### Params
 * @param {number} id 
 * @param {number} offset
 * @param {*} result 
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
User.getMostUsedRoomByUser = async (id, result) => {
}

/**
 * # User.getUserCountByRole(role, result)
 * 
 * @author Detective Pikachu
 * 
 * ### Params
 * @param {number} role 
 * @param {function} result 
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
User.getUserCountByRole = async (role, result) => {
}

/**
 * # User.checkIfUserExists(firstName, lastName, email, result)
 * 
 * @author Detective Pikachu
 * 
 * ### Params
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email
 * @param {function} result 
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
User.checkIfUserExists = async (firstName, lastName, email, result) => {
  await helper.helperModelGetterSimple('SELECT EXISTS(SELECT 1 FROM user WHERE firstName = ?, lastName = ?, email = ?)', result, ['firstName', 'lastName', 'email'], firstName, lastName, email);
}

/**
 * # User.getUserIUssuallyInviteMost(id, result)
 * 
 * @author Detective Pikachu
 * 
 * ### Params
 * @param {number} id 
 * @param {function} result 
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
User.getUserIUssuallyInviteMost = async (id, result) => {
}

/**
 * 
 * @author Detective Pikachu
 * 
 * ### Params
 * @param {function} result 
 * 
 * @returns {Promise<void>} Does not return anything. Instead, it calls a promise, being the result 
 * function with the results of the query.
 */
User.nukeUsersDB = async (result) => {
}


module.exports = User;