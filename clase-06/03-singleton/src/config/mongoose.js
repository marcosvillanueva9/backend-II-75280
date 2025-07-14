import mongoose from 'mongoose';

class MongoSingleton {
  static instance;

  constructor() {
    this.connection = null;
  }

  async connect(uri) {
    if (!MongoSingleton.instance) {
      try {
        this.connection = await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('MongoDB conectado');
        MongoSingleton.instance = this;
      } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        throw error;
      }
    }
    return MongoSingleton.instance;
  }
}

export default new MongoSingleton();
