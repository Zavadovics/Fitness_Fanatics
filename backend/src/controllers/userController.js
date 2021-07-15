import User from '../models/User.js';
import { userService } from '../services/userService.js';

export const userController = {
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

  /* mukodokepes */
  // async get(req, res, next) {
  //   try {
  //     await User.find({ email: 'zava@gmail.com' }).then(foundUsers =>
  //       res.status(200).json(foundUsers)
  //     );
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  /* mukodokepes */

  /* ⬇️ get user by ID - OK */
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

  // async put(req, res, next) {
  //   try {
  //     const user = await User.findById(req.params.id);
  //     if (user.email === req.body.email)
  //       try {
  //         const updatedUser = await User.findByIdAndUpdate(
  //           req.params.id,
  //           {
  //             $set: req.body,
  //           },
  //           { desc: req.body.desc }
  //         );
  //         res.status(200).json(updatedUser);
  //       } catch (err) {
  //         res.status(500).json(err);
  //       }
  //     else {
  //       res.status(401).json('Problem in the system :) !');
  //     }
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  /* my solution */
  // async put(req, res, next) {
  //   try {
  //     const data = await userService.updateUser(req.body);
  //     res.status(data.status).json(data);
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  /* KIG AVT-32 - edit event */
  async put(req, res, next) {
    try {
      const { id } = req.params;
      const reqData = req.body;

      const data = await userService.updateUser(id, reqData);
      res.status(data.status).json(data);
    } catch (err) {
      next(err);
    }
  },

  // async delete(req, res, next) {
  //   try {
  //     const data = await userService.deleteUser(req.body);
  //     res.status(data.status).json(data);
  //   } catch (err) {
  //     next(err);
  //   }
  // },
};
