// import logger from '../logger.js';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { userValidation } from '../validations/userValidation.js';
import sendEmail from '../utils/sendEmail.js';

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
      next(err);
      return {
        status: 500,
        message: 'Something went wrong',
      };
    }
  },
  /* ⬆️ save new user - OK */

  /* ⬇️ update existing user - OK */
  async updateUser(id, reqData) {
    const { _id, __v, updatedAt, createdAt, ...others } = reqData;
    const { error } = userValidation(others);

    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqData.password, salt);

    reqData.password = hashedPassword;
    try {
      await User.findByIdAndUpdate(id, reqData, {
        useFindAndModify: false,
      });
      return {
        status: 200,
        message: 'User data has been updated',
      };
    } catch (err) {
      next(err);
      return {
        status: 500,
        message: 'Something went wrong',
      };
    }
  },
  /* ⬆️ update existing user - OK */

  /* ⬇️ reset user password- OK */
  async sendPasswordResetMail(reqData) {
    try {
      const user = await User.findOne({ email: reqData.email });
      if (!user)
        return {
          status: 400,
          message: `User with given email doesn't exist`,
        };

      const link = `${process.env.FRONTEND_URL}/password-reset/${user._id}`;

      await sendEmail(
        user.email,
        'Fitness Fanatics - jelszócsere',
        `Az alábbi linkre kattintva lecserélheted a jelszavad: ${link}`
      );
      return {
        status: 200,
        message: `Password reset link sent to your email account`,
      };
    } catch (err) {
      // next(err);
      return {
        status: 500,
        message: 'Something went wrong',
      };
    }
  },

  async resetPassword(id, reqData) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqData.password, salt);

    reqData.password = hashedPassword;

    try {
      await User.findByIdAndUpdate(id, reqData, {
        useFindAndModify: false,
      });
      return {
        status: 200,
        message: 'User password has been updated',
      };
    } catch (err) {
      next(err);
      return {
        status: 500,
        message: 'Something went wrong',
      };
    }
  },
  /* ⬆️ reset user password - OK */
};
