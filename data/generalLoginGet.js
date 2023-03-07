import {
  managers,
  contractors,
  customers,
  sales,
} from "../config/mongoCollections.js";
import validation from "../utils/validation";

const managersCollection = await managers();
const contractorsCollection = await contractors();
const customersCollection = await customers();
const salesCollection = await sales();

const loginUser = async (userOrEmail, password, usertype) => {
  let collectionToUse;
  userOrEmail = validation.checkString(userOrEmail, "Username or email");
  password = validation.checkString(password, "Password");
  usertype = validation.checkString(usertype, "User type");

  if (usertype == "manager") {
    collectionToUse = managersCollection;
  } else if (usertype == "contractor") {
    collectionToUse = contractorsCollection;
  } else if (usertype == "customer") {
    collectionToUse = customersCollection;
  } else if (usertype == "sales") {
    collectionToUse = salesCollection;
  } else {
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

export { loginUser };
