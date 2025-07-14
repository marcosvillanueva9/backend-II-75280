export default class ToysController {
  constructor() {
    this.toys = [];
  }

  async getAllToys(req, res) {
    try {
      res.status(200).json(this.toys);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve toys' });
    }
  }

  async addToy(req, res) {
    try {
      const newToy = req.body;
      this.toys.push(newToy);
      res.status(201).json(newToy);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add toy' });
    }
  }
}