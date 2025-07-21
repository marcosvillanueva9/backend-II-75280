import User from "../dao/classes/users.dao.js";

const userService = new User();

class UsersController {
  
    static async getUsers(req, res) {
        
        const users = await userService.getUsers();

        if (!users) res.status(500).send({status: 'error', message: 'Failed to retrieve users'});
        else if (users.length === 0) res.status(404).send({status: 'error', message: 'No users found'});
        else res.send({status: 'success', result: users});
    }

    static async getUserById(req, res) {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (!user) res.status(404).send({status: 'error', message: 'User not found'});
        else res.send({status: 'success', result: user});
    }

    static async createUser(req, res) {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        if (!newUser) res.status(500).send({status: 'error', message: 'Failed to create user'});
        else res.send({status: 'success', result: newUser});
    }
}

export default UsersController;