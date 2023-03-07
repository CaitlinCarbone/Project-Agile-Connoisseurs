import { customers } from "../config/mongoCollections";
import validation from "./validationvalidation";
// add sign up and log out stuff for this type of user. add infromation to mongodb database (the config files are the database)
const customersCollection = await customers();
//sign up 
const exportedMethods = {
    async createCustomerUser(username, password, email, firstName, lastName, address, city, state){
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
        const newInsertInformation = await customersCollection.insertOne(user);
        if (!newInsertInformation.insertedId) throw 'Insert failed!';
        user._id = newInsertInformation.insertedId;
        return await getCustomerUserById(newInsertInformation.insertedId.toString());
    },
    //log in user

    async loginCustomerUser(userOrEmail, password){
        return loginUser(userOrEmail, password, "customer");
    },

    async getCustomerUserById(id){
        id = validation.checkId(id);
        const user = await customersCollection.findOne({ _id: id });
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