import logger from 'logger';
import City from '../models/City.js';
import { cityValidation } from '../cityValidation.js';

export const cityService = {
  async saveCity(cityData) {
    const { error } = cityValidation(cityData);
    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }
    const cityName = await City.findOne({
      name: cityData.name,
    });
    if (cityName)
      return {
        status: 400,
        message: 'City already exists!',
      };

    const city = new City({
      name: cityData.name,
      value: cityData.value,
    });

    try {
      await city.save();
      return {
        status: 200,
        message: 'City saved',
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
