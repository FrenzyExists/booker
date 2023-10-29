const sql = require("./db");
const boom = require("@hapi/boom");

/**
 * 
 * @param {string} sqlQuery 
 * @param {function} result 
 * @param  {...any} args 
 */
exports.helperModelGetterSimple = async (sqlQuery, result, argsNames, ...args) => {
  try {
    const query = sql.format(sqlQuery, args);
    const res = await sql.query(query);
    if (res.length) {
      res[0] = Object.assign({}, res[0], args.reduce((obj, arg, i) => {
        obj[argsNames[i]] = arg;
        return obj;
      }, {}));
      result(null, res[0])
    } else {
      result({ kind: "not_found" }, null);
    }
  } catch (err) {
    console.log("error: ", err);
    result(boom.internal(err.message), null);
  }
}

// exports.helperControllerGetterSimple = async (modelFun, )