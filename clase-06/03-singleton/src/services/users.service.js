import users from '../models/users.model.js';

export default class UsersService {
  constructor() {
    this.users = users;
  }

  async getAllUsers() {
    return this.users;
  }

  async addUser(user) {
    this.users.push(user);
    return user;
  }
}