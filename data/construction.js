import {contractors} from "../config/mongoCollections";
import validation from "../utils/validation";
// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)
const constructionCollection = await construction();
//sign up 
const createContractorUser = async (username, password, email, firstName, lastName, address, city, state) => {
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
        usertype: "contractor"
    };

    
    const newInsertInformation = await constructionCollection.insertOne(user);
    if (!newInsertInformation.insertedId) throw 'Insert failed!';
    user._id = newInsertInformation.insertedId;
    return await getContractorUserById(newInsertInformation.insertedId.toString());
}
//log in user(?)

const loginContractorUser = async (userOrEmail, password) => {
    return loginUser(userOrEmail, password, "contractor");
}



//delete user

//change profile information