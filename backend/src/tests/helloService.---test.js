import { helloService } from '../services/helloService.js';
import {jest} from '@jest/globals';


test('getHelloWorld', async () => {
  let result = await helloService.getHelloWorld();

  expect(result.message).toEqual('Szia, Uram!');
});