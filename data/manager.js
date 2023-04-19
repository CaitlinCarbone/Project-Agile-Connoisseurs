const { managers } = require("../config/mongoCollections");
const validation = require("../utils/validation");
const { loginUser } = require("./generalLoginGet");
// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)
const managersCollection = await managers();
//sign up

const exportedMethods = {
  async createManagerUser(username, password, email, firstName, lastName) {
    username = validation.checkString(username, "Username");
    password = validation.checkString(password, "Password");
    email = validation.checkEmail(email);
    firstName = validation.checkString(firstName, "First name");
    lastName = validation.checkString(lastName, "Last name");
    authKey = validation.checkString(authKey, "Authentication Key");
    //auth key is a string that is given to the manager by our business to verify that they are a manager
    //eventually find a way to make sure that the auth key is valid

    let user = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      usertype: "manager",
    };

    const newInsertInformation = await managersCollection.insertOne(user);
    if (!newInsertInformation.insertedId) throw "Insert failed!";
    user._id = newInsertInformation.insertedId;
    return await getmanagersUserById(
      newInsertInformation.insertedId.toString()
    );
  },
  //login user
  //Just checks if user exists and password is correct
  //returns user info in JSON if successful
  async loginManagerUser(userOrEmail, password) {
    return loginUser(userOrEmail, password, "manager");
  },

  async getManagerUserById(id) {
    id = validation.checkId(id);
    const user = await managersCollection.findOne({ _id: id });
    if (!user) throw "User not found";
    return user;
  },
};

//delete user

// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)

//sign up

//delete user

//change profile information
module.exports = exportedMethods;