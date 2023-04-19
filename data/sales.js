const {sales} = require("../config/mongoCollections");
const validation = require("../utils/validation");
const {loginUser} = require("./user");
const {projectData, customerData} = require("./index");

// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)
const salesCollection = await sales();
//sign up
const exportedMethods = {
  async createSalesUser(
    username,
    password,
    email,
    firstName,
    lastName,
    business
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
      projects: [],
      usertype: "sales",
    };

    const newInsertInformation = await salesCollection.insertOne(user);
    if (!newInsertInformation.insertedId) throw "Insert failed!";
    user._id = newInsertInformation.insertedId;
    return await getSalesUserById(newInsertInformation.insertedId.toString());
  },
  //log in user
  //Just checks if user exists and password is correct
  //returns user info in JSON if successful
  async loginSalesUser(userOrEmail, password) {
    return loginUser(userOrEmail, password, "sales");
  },

  async getSalesUserById(id) {
    id = validation.checkId(id);
    const user = await salesCollection.findOne({ _id: id });
    if (!user) throw "User not found";
    return user;
  },

  //add project to sales user
  //creates customer with no data (customer adds data later)
  //project contains various data and the customer id
  //returns updated user info in JSON
  async addProjectToSalesUser(
    id,
    projectName,
    projectDescription,
    projectType,
    projectStatus,
    projectBudget,
    projectStartDate,
    projectEndDate,
    requiredDocuments,
    optionalCustomerData
  ) {
    id = validation.checkId(id);
    const user = await salesCollection.findOne({ _id: id });
    if (!user) throw "User not found";

    //create customer if customer isn't passed in
    let customer = optionalCustomerData;
    if (!customer) {
      customer = await customerData.createCustomerNoData();
      if (!customer)
        throw "Customer not created successfully when initiating project";
    }

    const newProject = await projectData.createProject(
      projectName,
      projectDescription,
      projectType,
      projectStatus,
      projectBudget,
      projectStartDate,
      projectEndDate,
      requiredDocuments,
      customer
    );
    user.projects.push(newProject);

    const updatedInfo = await salesCollection.updateOne(
      { _id: id },
      { $set: user }
    );
    if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount)
      throw "Update failed";
    return await getSalesUserById(id);
  },
};
//delete user

// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)

//sign up

//delete user

//change profile information

module.exports = exportedMethods;