import logger from 'logger';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { userValidation } from '../validations/userValidation.js';

export const userService = {
  /* ⬇️ save new user - OK */
  async saveUser(userData) {
    const { error } = userValidation(userData);
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
        message: 'User has already been registered!',
      };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = new User({
      userName: userData.userName,
      lastName: userData.lastName,
      firstName: userData.firstName,
      email: userData.email,
      password: hashedPassword,
      gender: userData.gender,
      cityOfResidence: userData.cityOfResidence,
      weight: userData.weight,
      birthDate: userData.birthDate,
      motivation: userData.motivation,
    });

    try {
      await user.save();
      return {
        status: 200,
        message: 'User has successfully registered.',
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: 'Something went wrong',
      };
    }
  },
  /* ⬆️ save new user - OK */

  async updateUser(userData, id) {
    const { error } = userValidation(userData);
    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    // const idExists = await User.findOne({ _id: id });
    const userExists = await User.findOne({ email: userData.email });

    if (!userExists)
      return {
        status: 400,
        message: 'No user found in database!',
      };

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(userData.password, salt);

    try {
      await User.findByIdAndUpdate(userData, id, {
        useFindAndModify: false,
      });
      return {
        status: 200,
        message: 'User data has been updated',
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
