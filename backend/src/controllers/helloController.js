import { helloService } from '../services/helloService.js';

export const helloController = {
  async get(req, res) {
    const data = await helloService.getHelloWorld();
    res.status(200).json(data);
  },
};