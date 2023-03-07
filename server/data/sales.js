import {sales} from '../config/mongoCollections.js';
import validation from "../utils/validation";
import exportedMethods from './customer.js';
// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)
const salesCollection = await sales();
//sign up 
const exportedMethods = {
    async createSalesUser(username, password, email, firstName, lastName, business){
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
    },
    //log in user

    async loginSalesUser(userOrEmail, password){
        return loginUser(userOrEmail, password, "sales");
    },

    async getSalesUserById(id){
        id = validation.checkId(id);
        const user = await salesCollection.findOne({ _id: id });
        if (!user) throw 'User not found';
        return user;
    }
}
//delete user

// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)

//sign up 

//delete user

//change profile information

export default exportedMethods;