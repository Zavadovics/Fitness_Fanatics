import mongoose from 'mongoose';
import logger from './logger.js';

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('connected to MongoDB');
  } catch (err) {
    logger.error(err);
  }
};

export default db;
