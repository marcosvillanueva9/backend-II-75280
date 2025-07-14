export default class UsersController {
  constructor() {
    this.users = [];
  }

  async getAllUsers(req, res) {
    try {
      res.status(200).json(this.users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  }

  async addUser(req, res) {
    try {
      const newUser = req.body;
      this.users.push(newUser);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add user' });
    }
  }
}