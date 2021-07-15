import logger from 'logger';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { registerValidation } from '../validations/registerValidation.js';

export const registrationService = {
  async saveUser(userData) {
    const { error } = registerValidation(userData);
    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }
    const emailExist = await User.findOne({ email: userData.email });
    if (emailExist)
      return {
        status: 400,
        message: 'Email already exists!',
      };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
    });

    try {
      await user.save();
      return {
        status: 200,
        message: 'User saved',
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: 'Something went wrong',
      };
    }
  },
};
