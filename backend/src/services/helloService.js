import { helloWorld } from '../models/helloWorld.js';

export const helloService = {
  async getHelloWorld() {
    return helloWorld;
  },
};