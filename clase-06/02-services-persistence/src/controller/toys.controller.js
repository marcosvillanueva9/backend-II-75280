import ToysService from "../services/toys.service.js";

export default class ToysController {
  constructor() {
    this.toysService = new ToysService();
  }

  async getAllToys(req, res) {
    try {
      const toys = await this.toysService.getAllToys();
      res.status(200).json(toys);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve toys' });
    }
  }

  async addToy(req, res) {
    try {
      const newToy = req.body;
      if (!newToy || !newToy.name || !newToy.price) {
        return res.status(400).json({ error: 'Invalid toy data' });
      }
      const addedToy = await this.toysService.addToy(newToy);
      res.status(201).json(addedToy);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add toy' });
    }
  }
}