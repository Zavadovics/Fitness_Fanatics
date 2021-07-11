import { loginService } from '../services/loginService.js';

export const loginController = {
  async post(req, res) {
    const data = await loginService.loginUser(req.body);
    console.log(data);
    return res.status(data.status).json(data);
  },
};
