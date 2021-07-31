import User from '../models/User.js';
import { userService } from '../services/userService.js';

export const userController = {
  /* ⬇️ get user by ID (used to get profile)- OK */
  async get(req, res, next) {
    try {
      User.findById(req.params.id).then(foundUser =>
        res.status(200).json(foundUser)
      );
    } catch (err) {
      next(err);
    }
  },
  /* ⬆️ get user by ID - OK */

  /* ⬇️ save new user - OK */
  async post(req, res, next) {
    try {
      const data = await userService.saveUser(req.body);
      res.status(data.status).json(data);
    } catch (err) {
      next(err);
    }
  },
  /* ⬆️ save new user - OK */

  /* ⬇️ find user in database by Id - OK */
  // async getId(req, res) {
  //   try {
  //     const user = await User.findById(req.params.id);
  //     res.status(200).json(user);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  /* ⬆️ find user in database by Id - OK */

  /* ⬇️ update user in database - OK */

  async put(req, res, next) {
    try {
      const { id } = req.params;
      const reqData = req.body;

      const data = await userService.updateUser(id, reqData);
      res.status(data.status).json(data);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  /* ⬆️ update user in database - OK */

  /* ⬇️ update user password in database - OK */

  async putPassword(req, res, next) {
    try {
      const data = await userService.updateUserPassword(req.body);
      console.log('controller - req.body', req.body);
      res.status(data.status).json(data);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  /* ⬆️ update user password in database - OK */
};
