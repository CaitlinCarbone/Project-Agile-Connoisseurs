const { users, projects } = require("../config/mongoCollections");
const validation = require("./validation");
const bcrypt = require("bcrypt");

const exportedMethods = {
  async createCustomer(
    email,
    password,
    firstName,
    lastName,
    address,
    city,
    state
  ) {
    validation.checkPassword(password);
    validation.checkEmail(email);
    validation.checkString(firstName, "First name");
    validation.checkString(lastName, "Last name");
    validation.checkString(address, "Address");
    validation.checkString(city, "City");
    validation.checkString(state, "State");

    const usersCollection = await users();
    const existingUser = await usersCollection.findOne({
      email: email,
    });
    if (existingUser) throw "Email address in use";

    const hash = await bcrypt.hash(password, 10);

    const newInsertInformation = await usersCollection.insertOne({
      email: email,
      password: hash,
      type: "customer",
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      state: state,
    });
    if (!newInsertInformation.insertedId) throw "Insert failed!";

    return { success: true };
  },

  async getCustomer(id) {
    validation.checkId(id);

    const usersCollection = await users();
    const user = await usersCollection.findOne({ type: "customer", _id: id });
    if (!user) throw "User not found";

    return user;
  },

  //change profile information
  async updateCustomer(id, email, firstName, lastName, address, city, state) {
    validation.checkId(id);
    validation.checkEmail(email);
    validation.checkString(firstName, "First name");
    validation.checkString(lastName, "Last name");
    validation.checkString(address, "Address");
    validation.checkString(city, "City");
    validation.checkString(state, "State");

    const currUser = await this.getCustomer(id);
    if (!currUser) throw `User with id ${id} not found`;

    const usersCollection = await users();
    const updateInfo = await usersCollection.updateOne(
      { _id: id, type: "customer" },
      {
        $set: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          state: state,
        },
      }
    );
    if (!updateInfo.modifiedCount) throw "Update failed";

    return { success: true };
  },

  async changeCustomerPassword(id, password) {
    validation.checkId(id);
    validation.checkPassword(password);

    const currUser = await this.getCustomer(id);
    if (!currUser) throw `User with id ${id} not found`;

    const hash = await bcrypt.hash(password, 10);

    const usersCollection = await users();
    const updateInfo = await usersCollection.updateOne(
      { _id: id, type: "customer" },
      {
        $set: {
          password: hash,
        },
      }
    );
    if (!updateInfo.modifiedCount) throw "Changing password failed";
    return { success: true };
  },

  async getCustomerProjects(id) {
    validation.checkId(id);

    const user = await this.getCustomer(id);
    const projectsCollection = await projects();
    if (!user) throw "User not found";
    const customerProjects = projectsCollection.find({
      customerId: id,
    });
    if (!customerProjects) throw "No projects found for customer";
    return customerProjects;
  },

  async getAllCustomers() {
    const usersCollection = await users();
    const allCustomers = await usersCollection.find({
      type: "customer",
    });
    if (!allCustomers) return [];
    return allCustomers.toArray();
  },
};
//delete user

// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)

//sign up

//delete user

module.exports = exportedMethods;
