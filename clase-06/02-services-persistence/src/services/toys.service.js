import toys from '../models/toys.model.js';

export default class ToysService {
  constructor() {
    this.toys = toys;
  }

  async getAllToys() {
    return this.toys;
  }

  async addToy(toy) {
    this.toys.push(toy);
    return toy;
  }
}