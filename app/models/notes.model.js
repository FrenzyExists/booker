const sql = require("./db");
const boom = require("@hapi/boom")


/**
 * # Notes
 * 
 * @author Detective Pikachu
 * 
 * ### Params
 * @param {Object} note
 * @param {string} note.title
 * @param {string} note.contents
 * @param {number} note.userId
 * @param {boolean} note.taskDone
 */
const Note = function (note) {
  this.title = note.title;
  this.contents = note.contents;
  this.userId = note.userId;
  this.taskDone = note.taskDone;
};


/**
 * 
 * @param {*} title 
 * @param {*} contents 
 * @param {number} userId 
 * @param {*} result 
 * @returns 
 */
Note.createNote = async (title, contents, userId, result) => {
  const [result] = await pool.query(`
  INSERT INTO notes (title, contents)
  VALUES (?, ?)
  `, [title, contents])
  return result
}

/**
 * 
 * ### Params
 * @param {number} userId 
 * @param {*} limit 
 * @param {*} offset 
 * @param {*} result 
 */
Note.getAllNotes = async (userId, limit, offset, result) => {

}

/**
 * 
 * @param {number} id 
 * @param {*} result 
 */
Note.setNoteDone = async(id, result) => {

}

/**
 * 
 * @param {number} id 
 * @param {*} result 
 */
Note.delete = async(id, result) => {

}

module.exports = Note;