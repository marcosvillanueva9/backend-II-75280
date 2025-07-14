import UsersService from "../services/users.service.js";

export default class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.usersService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  }

  async addUser(req, res) {
    try {
      const newUser = req.body;
      if (!newUser || !newUser.name || !newUser.email) {
        return res.status(400).json({ error: 'Invalid user data' });
      }
      const addedUser = await this.usersService.addUser(newUser);
      res.status(201).json(addedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add user' });
    }
  }
}