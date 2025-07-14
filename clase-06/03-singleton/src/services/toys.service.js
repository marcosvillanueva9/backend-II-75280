import ToyModel from '../models/toys.model.js';

export default class ToysService {

  async getAllToys() {
    return ToyModel.find();
  }

  async addToy(toy) {
    const newToy = new ToyModel(toy);
    await newToy.save();
    return newToy;
  }
}