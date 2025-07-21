import userModel from "../models/users.model.js";

export default class User {
    
    getUsers = async () => {
        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getUserById = async (id) => {
        try {
            const user = await userModel.findOne({ _id: id });
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    createUser = async (userData) => {
        try {
            const newUser = await userModel.create(userData);
            return newUser;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    updateUser = async (id, userData) => {
        try {
            const updatedUser = await userModel.updateOne({ _id: id }, userData);
            return updatedUser;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}