const { users } = require("../config/mongoCollections");
const validation = require("./validation");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async (email, password, confirmPassword, userType) => {
    validation.checkEmail(email);
    validation.checkPassword(password);
    validation.checkPassword(confirmPassword);
    const usersCollection = await users();
    const emailTaken = await usersCollection.findOne({
      email: email,
    });
    if (emailTaken) throw "Email address is taken";
    const hash = await bcrypt.hash(password, 10);
    const insertInfo = await usersCollection.insertOne({
      email: email,
      password: hash,
      type: userType,
    });
    if (insertInfo.insertedCount <= 0)
      throw "Database Error: Could not insert new user";
    return { success: true };
  },
  checkUser: async (email, password) => {
    validation.checkEmail(email);
    validation.checkPassword(password);
    const usersCollection = await users();
    const foundUser = await usersCollection.findOne({
      email: email,
    });
    if (!foundUser) throw "User with that email does not exist";
    const loginAttempt = await bcrypt.compare(password, foundUser.password);
    if (loginAttempt) return { authenticated: true, role: foundUser.type };
    else throw "Either the email or password is invalid";
  },
};
