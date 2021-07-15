import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { loginValidation } from '../validations/loginValidation.js';
import User from '../models/User.js';

export const loginService = {
  async loginUser(loginData) {
    const { error } = loginValidation(loginData);
    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    const user = await User.findOne({ email: loginData.email });
    console.log(user);
    if (!user) {
      return {
        status: 400,
        message: 'Email is not registered',
      };
    }

    const validPass = await bcrypt.compare(loginData.password, user.password);
    if (!validPass) {
      return {
        status: 400,
        message: 'Username or password is incorrect',
      };
    }

    const authToken = jwt.sign(
      {
        firstName: user.firstName,
        email: user.email,
        lastName: user.lastName,
        id: user._id,
      },
      process.env.TOKEN_SECRET
    );
    return {
      status: 200,
      message: 'Logged in!',
      token: authToken,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
    };
  },
};
