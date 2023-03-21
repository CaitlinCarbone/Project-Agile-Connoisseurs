import { contractors } from "../config/mongoCollections";
import validation from "../utils/validation";
import { loginUser } from "./user";
// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)
const contractorsCollection = await contractors();
//sign up
const exportedMethods = {
  async createContractorUser(
    username,
    password,
    email,
    firstName,
    lastName,
    address,
    city,
    state
  ) {
    username = validation.checkString(username, "Username");
    password = validation.checkString(password, "Password");
    email = validation.checkEmail(email);
    firstName = validation.checkString(firstName, "First name");
    lastName = validation.checkString(lastName, "Last name");
    business = validation.checkString(business, "Business name");

    let user = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      business: business,
      usertype: "contractor",
    };

    const newInsertInformation = await contractorsCollection.insertOne(user);
    if (!newInsertInformation.insertedId) throw "Insert failed!";
    user._id = newInsertInformation.insertedId;
    return await getContractorUserById(
      newInsertInformation.insertedId.toString()
    );
  },
  //log in user(?)
  //Just checks if user exists and password is correct
  //returns user info in JSON if successful
  async loginContractorUser(userOrEmail, password) {
    return loginUser(userOrEmail, password, "contractor");
  },

  async getContractorsUserById(id) {
    id = validation.checkId(id);
    const user = await contractorsCollection.findOne({ _id: id });
    if (!user) throw "User not found";
    return user;
  },
};

//delete user

// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)

//sign up

//delete user

//change profile information
export default exportedMethods;
