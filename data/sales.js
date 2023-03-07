import {sales} from '../config/mongoCollections.js';
import validation from "../utils/validation";
// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)
const salesCollection = await sales();
//sign up 
const createSalesUser = async (username, password, email, firstName, lastName, business) => {
    username = validation.checkString(username, 'Username');
    password = validation.checkString(password, 'Password');
    email = validation.checkEmail(email);
    firstName = validation.checkString(firstName, 'First name');
    lastName = validation.checkString(lastName, 'Last name');
    business = validation.checkString(business, 'Business name');

    let user = {
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        business: business,
        usertype: "sales"
    };

    const newInsertInformation = await salesCollection.insertOne(user);
    if (!newInsertInformation.insertedId) throw 'Insert failed!';
    user._id = newInsertInformation.insertedId;
    return await getSalesUserById(newInsertInformation.insertedId.toString());
}
//log in user

const loginSalesUser = async (userOrEmail, password) => {
    return loginUser(userOrEmail, password, "sales");
}

//delete user

//change profile information