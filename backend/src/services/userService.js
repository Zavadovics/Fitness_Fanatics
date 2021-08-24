import logger from '../logger.js';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { userValidation } from '../validations/userValidation.js';
import sendEmail from '../utils/sendEmail.js';

export const userService = {
  async saveUser(userData) {
    const { error } = userValidation(userData);
    if (error) {
      logger.error(error);
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    const emailExist = await User.findOne({ email: userData.email });
    if (emailExist)
      return {
        status: 409,
        message: 'Az általad megadott email cím már regisztrálva van',
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
        status: 201,
        message: `Sikeres regisztráció. Máris átirányítunk a bejelentkezés oldalra`,
        user: user,
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: 'Adatbázis probléma',
      };
    }
  },

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
      const updatedUser = await User.findByIdAndUpdate(id, reqData, {
        useFindAndModify: false,
      });
      return {
        status: 200,
        message: `Sikeres mentés. Az adatokat hozzádtuk az adatbázishoz`,
        updatedUser: updatedUser,
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: 'Adatbázis probléma',
      };
    }
  },

  async sendPasswordResetMail(reqData) {
    try {
      const user = await User.findOne({ email: reqData.email });

      if (!user)
        return {
          status: 400,
          message: 'A megadott e-mail címmel még nem regisztráltak',
        };

      const authToken = jwt.sign(
        {
          email: user.email,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '15m',
        }
      );

      const link = `${process.env.FRONTEND_URL}/password-reset/${user._id}/${authToken}`;
      await sendEmail(link, user);
      return {
        status: 200,
        message:
          'A jelszó cseréjéhez kérlek nyitsd meg az e-mailt amit küldtünk',
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: 'Adatbázis probléma',
      };
    }
  },

  async resetPassword(id, token, reqData) {
    try {
      try {
        jwt.verify(token, process.env.TOKEN_SECRET);
      } catch (err) {
        logger.error(err);
        return {
          status: 401,
          message:
            'Sajnos a jelszó megváltoztatására adott idő (15 perc) lejárt',
        };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(reqData.password, salt);

      reqData.password = hashedPassword;

      await User.findByIdAndUpdate(id, reqData, {
        useFindAndModify: false,
      });
      return {
        status: 200,
        message:
          'A jelszó cseréje sikeresen megtörtént. Most már bejelentkezhetsz',
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: 'A jelszó cseréje nem sikerült',
      };
    }
  },
};
