// import { loginService } from '../services/loginService.js';

// export const loginController = {
//   async post(req, res) {
//     const data = await loginService.loginUser(req.body);
//     console.log(data);
//     return res.status(data.status).json(data);
//   },
// };

import { loginService } from '../services/loginService.js';

export const loginController = {
  async post(req, res, next) {
    try {
      const data = await loginService.loginUser(req.body);
      // res.header('auth-token', data.token).send(data.token);
      return res.status(data.status).json(data);
    } catch (err) {
      next(err);
    }
  },
};
