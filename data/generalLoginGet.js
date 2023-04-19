const {managers} = require("../config/mongoCollections");
const {contractors} = require("../config/mongoCollections");
const {customers} = require("../config/mongoCollections");
const {sales} = require("../config/mongoCollections");
const validation = require("../utils/validation");

const managersCollection = await managers();
const contractorsCollection = await contractors();
const customersCollection = await customers();
const salesCollection = await sales();

const loginUser = async (userOrEmail, password, usertype) => {
  let collectionToUse;
  userOrEmail = validation.checkString(userOrEmail, "Username or email");
  password = validation.checkString(password, "Password");
  usertype = validation.checkString(usertype, "User type");

  switch (usertype) {
    case "manager":
      collectionToUse = managersCollection;
      break;
    case "contractor":
      collectionToUse = contractorsCollection;
      break;
    case "customer":
      collectionToUse = customersCollection;
      break;
    case "sales":
      collectionToUse = salesCollection;
      break;
    default:
      throw "Error: User type invalid. Try again.";
  }

  const user = await collectionToUse.findOne({
    $or: [
      { $and: [{ username: userOrEmail }, { email: userOrEmail }] },
      { $and: [{ email: userOrEmail }, { password: password }] },
    ],
  });
  if (!user) throw "Error: Credentials invalid. Try again.";
  return user;
};

module.exports = loginUser;
