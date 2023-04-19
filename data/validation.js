const {ObjectId} = require('mongodb');

const exportedMethods = {
  checkId(id) {
    if (!id) throw "Error: You must provide an id to search for";
    if (typeof id !== "string") throw "Error: id must be a string";
    id = id.trim();
    if (id.length === 0)
      throw "Error: id cannot be an empty string or just spaces";
    if (!ObjectId.isValid(id)) throw "Error: invalid object ID";
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal === "number")
      throw `Error: ${varName} cannot only be numbers!`;
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkNumber(numVal, varName) {
    if (!numVal) throw `Error: You must supply a ${varName}!`;
    if (typeof numVal !== "number") throw `Error: ${varName} must be a number!`;
    if (numVal < 0) throw `Error: ${varName} must be a positive number!`;
    return numVal;
  },

  checkEmail(email) {
    if (!email) throw "Error: You must provide an email to search for";
    if (typeof email !== "string") throw "Error: email must be a string";
    email = email.trim().toLowerCase();
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailformat)) {
      return email;
    } else {
      throw "Error: invalid email";
    }
  },
};

module.exports = exportedMethods;