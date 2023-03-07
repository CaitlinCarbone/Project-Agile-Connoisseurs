import { customers } from "../config/mongoCollections";
import validation from "../utils/validation";
// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)

//sign up 
const createSalesUser = async (username, password, email, firstName, lastName, address, city, state) => {
    username = validation.checkString(username, 'Username');
    password = validation.checkString(password, 'Password');
    email = validation.checkEmail(email);
    firstName = validation.checkString(firstName, 'First name');
    lastName = validation.checkString(lastName, 'Last name');

    address = validation.checkString(address, 'Address');
    city = validation.checkString(city, 'City');
    state = validation.checkString(state, 'State');
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
        usertype: "customer"
    };

    const customersCollection = await customers();
    const newInsertInformation = await customersCollection.insertOne(user);
    if (!newInsertInformation.insertedId) throw 'Insert failed!';
    user._id = newInsertInformation.insertedId;
    return await getSalesUserById(newInsertInformation.insertedId.toString());
}
//log in user

const loginCustomerUser = async (userOrEmail, password) => {
    return loginUser(userOrEmail, password, "customer");
}


//delete user

//change profile information