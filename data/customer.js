import { customers } from "../config/mongoCollections";
import validation from "./validationvalidation";
import { loginUser } from "./user";
// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)
const customersCollection = await customers();
//sign up
const exportedMethods = {
  async createCustomerNoData() {
    let user = {
      username: null,
      password: null,
      email: null,
      firstName: null,
      lastName: null,
      address: null,
      city: null,
      state: null,
      usertype: "customer"
    };
    const newInsertInformation = await customersCollection.insertOne(user);
    if (!newInsertInformation.insertedId) throw "Insert failed!";
    user._id = newInsertInformation.insertedId;
    return await getCustomerUserById(
      newInsertInformation.insertedId.toString()
    );
  },

  async createCustomerUser(
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

    address = validation.checkString(address, "Address");
    city = validation.checkString(city, "City");
    state = validation.checkString(state, "State");
    //maybe in future check if city, state, and address are real

    let user = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      state: state,
      usertype: "customer",
    };
    const newInsertInformation = await customersCollection.insertOne(user);
    if (!newInsertInformation.insertedId) throw "Insert failed!";
    user._id = newInsertInformation.insertedId;
    return await getCustomerUserById(
      newInsertInformation.insertedId.toString()
    );
  },
  //log in user
  //Just checks if user exists and password is correct
  //returns user info in JSON if successful
  async loginCustomerUser(userOrEmail, password) {
    return loginUser(userOrEmail, password, "customer");
  },

  async getCustomerUserById(id) {
    id = validation.checkId(id);
    const user = await customersCollection.findOne({ _id: id });
    if (!user) throw "User not found";
    return user;
  },
  
  //change profile information
  async changeCustomerName(id, firstName, lastName) {
    id = validation.checkId(id);
    firstName = validation.checkString(firstName, "First name");
    lastName = validation.checkString(lastName, "Last name");

    const currUser = await this.getCustomerUserById(id);
    if (!currUser) throw "User not found";

    const updatedUser = currUser;
    updatedUser.firstName = firstName;
    updatedUser.lastName = lastName;

    const updateInfo = await customersCollection.updateOne({ _id: id }, { $set: updatedUser });
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw "Update failed";
    return await this.getCustomerUserById(id);
  },

  async changeCustomerAddress(id, address, city, state) {
    id = validation.checkId(id);
    address = validation.checkString(address, "Address");
    city = validation.checkString(city, "City");
    state = validation.checkString(state, "State");

    const currUser = await this.getCustomerUserById(id);
    if (!currUser) throw "User not found";

    const updatedUser = currUser;
    updatedUser.address = address;
    updatedUser.city = city;
    updatedUser.state = state;

    const updateInfo = await customersCollection.updateOne({ _id: id }, { $set: updatedUser });
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw "Update failed";
    return await this.getCustomerUserById(id);
  },

  async changeCustomerPassword(id, password) {
    id = validation.checkId(id);
    password = validation.checkString(password, "Password");

    const currUser = await this.getCustomerUserById(id);
    if (!currUser) throw "User not found";

    const updatedUser = currUser;
    updatedUser.password = password;

    const updateInfo = await customersCollection.updateOne({ _id: id }, { $set: updatedUser });
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw "Update failed";
    return await this.getCustomerUserById(id);
  },

}
//delete user

// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)

//sign up

//delete user




export default exportedMethods;
